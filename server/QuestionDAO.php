<?php
require_once(__DIR__."/Question.php");
require_once(__DIR__."/QuestionSQL.php");

class Accesseur
{
	public static $baseDeDonnees = null;

	public static function initialize()
	{
		$base = "brain-challenge";
		$hote = "rds-url";	// TODO
		$usager = "user";	// TODO
		$motDePasse = "password";	// TODO
		$nomDeSourceDeDonnees = 'mysql:dbname=' . $base . ';host=' . $hote . ';charset=UTF8';
		QuestionDAO::$baseDeDonnees = new PDO($nomDeSourceDeDonnees, $usager, $motDePasse);
		QuestionDAO::$baseDeDonnees->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
}

class QuestionDAO extends Accesseur implements QuestionSQL
{
	public static function getQuestionTags($questionId)
	{
		$tagsStatement = QuestionDAO::$baseDeDonnees->prepare(QuestionDAO::SQL_QUESTION_TAGS_LIST);
		$tagsStatement->bindParam(':question_id', $questionId, PDO::PARAM_INT);
		$tagsStatement->execute();
		
		$tags = [];
		while ($row = $tagsStatement->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT)) 
			array_push($tags, $row[0]);

			return $tags;
	}

	public static function list()
	{
		QuestionDAO::initialize();

		$questionsStatement = QuestionDAO::$baseDeDonnees->prepare(QuestionDAO::SQL_QUESTION_LIST);
		$questionsStatement->execute();
		$questionsResult = $questionsStatement->fetchAll(PDO::FETCH_ASSOC);

		$questionList = null;
		foreach($questionsResult as $question) 
		{
			$question["tags"] = self::getQuestionTags($question["question_id"]);
			$questionList[] = new Question($question);
		}

		return $questionList;
	}

	public static function get($id)
	{
		QuestionDAO::initialize();

		$demandeQuestion = QuestionDAO::$baseDeDonnees->prepare(QuestionDAO::SQL_QUESTION_GET);
		$demandeQuestion->bindParam(':question_id', $id, PDO::PARAM_INT);
		$demandeQuestion->execute();
		$questionArray = $demandeQuestion->fetchAll(PDO::FETCH_ASSOC)[0];

		$questionArray["tags"] = self::getQuestionTags($questionArray["question_id"]);

		// var_dump($questionArray);

		return new Question($questionArray);
	}

	public static function add($question)
	{
		QuestionDAO::initialize();

		// Add question
		$demandeAjoutQuestion = QuestionDAO::$baseDeDonnees->prepare(QuestionDAO::SQL_QUESTION_ADD);
		$demandeAjoutQuestion->bindValue(':statement', $question->statement, PDO::PARAM_STR);
		$demandeAjoutQuestion->bindValue(':answer', $question->answer, PDO::PARAM_STR);
		$demandeAjoutQuestion->bindValue(':title', $question->title, PDO::PARAM_STR);
		$demandeAjoutQuestion->bindValue(':difficulty', $question->difficulty, PDO::PARAM_INT);
		$demandeAjoutQuestion->bindValue(':hint', $question->hint, PDO::PARAM_STR);
		$demandeAjoutQuestion->bindValue(':time', $question->time, PDO::PARAM_INT);
		$demandeAjoutQuestion->execute();

		$questionId = QuestionDAO::$baseDeDonnees->lastInsertId();

		// Add tags
		foreach ($question->tags as $tag)
		{
			echo "tag  ($tag)  ";
			$tagsStatement = QuestionDAO::$baseDeDonnees->prepare(QuestionDAO::SQL_TAG_ADD);
			$tagsStatement->bindValue(":question_id", $questionId);
			$tagsStatement->bindValue(":title", $tag);
			$tagsStatement->execute();
		}

		return $questionId;
	}

	public static function edit($question)
	{
		QuestionDAO::initialize();

		// Update question
		$demandeModificationQuestion = QuestionDAO::$baseDeDonnees->prepare(QuestionDAO::SQL_QUESTION_EDIT);
		$demandeModificationQuestion->bindValue(':question_id', $question->id, PDO::PARAM_INT);
		$demandeModificationQuestion->bindValue(':statement', $question->statement, PDO::PARAM_STR);
		$demandeModificationQuestion->bindValue(':answer', $question->answer, PDO::PARAM_STR);
		$demandeModificationQuestion->bindValue(':title', $question->title, PDO::PARAM_STR);
		$demandeModificationQuestion->bindValue(':difficulty', $question->difficulty, PDO::PARAM_INT);
		$demandeModificationQuestion->bindValue(':hint', $question->hint, PDO::PARAM_STR);
		$demandeModificationQuestion->bindValue(':time', $question->time, PDO::PARAM_INT);
		$demandeModificationQuestion->execute();

		// Delete tags
		$deleteTagsStatement = QuestionDAO::$baseDeDonnees->prepare(QuestionDAO::SQL_QUESTION_TAGS_DELETE);
		$deleteTagsStatement->bindValue(':question_id', $question->id, PDO::PARAM_INT);
		$deleteTagsStatement->execute();

		// Add tags
		foreach ($question->tags as $tag)
		{
			echo "tag  ($tag)  ";
			$tagsStatement = QuestionDAO::$baseDeDonnees->prepare(QuestionDAO::SQL_TAG_ADD);
			$tagsStatement->bindValue(":question_id", $question->id, PDO::PARAM_INT);
			$tagsStatement->bindValue(":title", $tag, PDO::PARAM_STR);
			$tagsStatement->execute();
		}
	}
}
