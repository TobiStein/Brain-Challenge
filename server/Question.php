<?php

class Question implements JsonSerializable
{
	public static $filters =
		array(
			'question_id' => FILTER_VALIDATE_INT,		// Validates value as integer.
			'statement' => FILTER_SANITIZE_STRING,   	// URL-encode string.
			'answer' => FILTER_SANITIZE_STRING,
			'title' => FILTER_SANITIZE_STRING,
			'difficulty' => FILTER_VALIDATE_INT,
			'hint' => FILTER_SANITIZE_STRING,
			'time' => FILTER_VALIDATE_INT,
			'tags' => array(
				'filter' => FILTER_SANITIZE_STRING,
				'flags'  => FILTER_FORCE_ARRAY
			)
		);

	protected $id;
	protected $statement;
	protected $answer;
	protected $title;
	protected $difficulty;
	protected $hint;
	protected $time;
	protected $tags;

	public function __construct($question)
	{
		$array = filter_var_array((array) $question, Question::$filters);
		$this->id = $array['question_id'];
		$this->statement = $array['statement'];
		$this->answer = $array['answer'];
		$this->title = $array['title'];
		$this->difficulty = $array['difficulty'];
		$this->hint = $array['hint'];
		$this->time = $array['time'];
		$this->tags = $array['tags'];
	}

	public function __set($property, $value)
	{
		switch($property)
		{
			case 'id':
				$this->id = $value;
				break;
			case 'statement':
				$this->statement = $value;
				break;
			case 'answer':
				$this->answer = $value;
				break;
			case 'title':
				$this->title = $value;
				break;
			case 'difficulty':
				$this->difficulty = $value;
				break;
			case 'hint':
				$this->hint = $value;
				break;
			case 'time':
				$this->time = $value;
				break;
			case 'tags':
				$this->tags = $value;
				break;
		}
	}

	public function __get($property)
	{
		$self = get_object_vars($this);
		return $self[$property];
	}

	public function jsonSerialize()
	{
		//Define the fields we need
		return array(
			"id" 			=> $this->id,
			"statement" 	=> $this->statement,
			"answer" 		=> $this->answer,
			"title"			=> $this->title,
			"difficulty"	=> $this->difficulty,
			"hint"			=> $this->hint,
			"time"			=> $this->time,
			"tags"			=> $this->tags
		);
	}
}
