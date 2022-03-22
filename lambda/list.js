console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });


exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const params = {
        Bucket: "brain-challenge-questions",
        Key: "data.json",
    };
    
    try {
        const data = await s3.getObject(params).promise();
        console.log("Raw text:\n" + data.Body.toString('utf-8'));
        const questionListJson = data.Body.toString('utf-8');

        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin" : "*"
            },        
            body: questionListJson,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            headers: {
              "Access-Control-Allow-Origin" : "*"
            },        
            body: "Internal error",
        };
    }
};
