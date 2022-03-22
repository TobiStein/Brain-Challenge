<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: application/json; charset=utf-8');

require_once(__DIR__."/QuestionDAO.php");

$questionList = QuestionDAO::list();

echo json_encode($questionList);
