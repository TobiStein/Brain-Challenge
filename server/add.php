<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once(__DIR__."/Question.php");
require_once(__DIR__."/QuestionDAO.php");

$questionJSON = file_get_contents('php://input');
$questionObject = json_decode($questionJSON);

echo $questionJSON;
var_dump($questionObject);

$question = new Question($questionObject);

$id = QuestionDAO::add($question);

echo $id;
