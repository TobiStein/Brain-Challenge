<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: application/json; charset=utf-8');

require_once(__DIR__."/Question.php");
require_once(__DIR__."/QuestionDAO.php");

if (!isset($_GET["id"]))
    echo "{}";

$id = $_GET["id"];
$question = QuestionDAO::get($id);
echo json_encode($question);
