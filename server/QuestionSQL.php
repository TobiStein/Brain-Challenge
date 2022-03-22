<?php

interface QuestionSQL
{
	//TODO
	public const SQL_QUESTION_LIST			= "SELECT * FROM question;";     // without tags
	public const SQL_QUESTION_TAGS_LIST		= "SELECT title FROM tag WHERE question_id = :question_id;";
	public const SQL_QUESTION_TAGS_DELETE	= "DELETE FROM tag WHERE question_id = :question_id;";
	public const SQL_QUESTION_GET 			= "SELECT * FROM question WHERE question_id = :question_id;";
	public const SQL_QUESTION_ADD			= "INSERT INTO question (`statement`, answer, title, difficulty, `time`, hint) VALUES (:statement, :answer, :title, :difficulty, :time, :hint)";
	public const SQL_TAG_ADD				= "INSERT INTO tag (title, question_id) VALUES (:title, :question_id);";
	public const SQL_QUESTION_EDIT  		= "UPDATE question SET `statement` = :statement, answer = :answer, title = :title, difficulty = :difficulty, `time` = :time, hint = :hint WHERE question_id = :question_id";
}