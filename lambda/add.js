console.log('Loading function');

var AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const querystring = require('querystring');

exports.handler = async (event) => {
  const postdata = querystring.parse(event.body);
  
  let question = null;
  let questionjson = postdata["questionjson"];
  if(questionjson){
    question = JSON.parse(questionjson);
  }
  
  let response = {
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    body : "Pas de cadeau reçu",
  };
  
  if (question == null) {
    return response;
  }

  question.id = Date.now();

  const params = {
      Bucket: "brain-challenge-question",
      Key: "data.json",
  };

  let data = await s3.getObject(params).promise();
  let listeQuestionJson = data.Body.toString('utf-8');
  const listeQuestion = JSON.parse(listeQuestionJson);
  listeQuestion.push(question);
  listeQuestionJson = JSON.stringify(listeQuestion);
  params.Body  = listeQuestionJson;
  data = await s3.putObject(params).promise();

  response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: question.id
  };

  return response;
};