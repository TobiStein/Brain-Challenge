<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once(__DIR__."/Question.php");
require_once(__DIR__."/QuestionDAO.php");

$questionJSON = file_get_contents('php://input');
$questionArray = (array)json_decode($questionJSON);

$questionArray["question_id"] = $questionArray["id"];
unset($questionArray["id"]);

$question = new Question($questionArray);

QuestionDAO::edit($question);
