const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

//define the table name
const params = {
  TableName : 'TodoTable'
}

async function listItems(){
  try {
    const data: JSON = await docClient.scan(params).promise()
    return data
  } catch (err) {
    return err
  }
}

exports.handler = async (event: any, context: any) => {
  try {
    const data = await listItems()
    return {
        statusCode: 200,
        headers: {"Content-Type": "text/plain"},
        body: JSON.stringify(data)
    }
  } catch (err) {
    return { error: err }
  }
}
