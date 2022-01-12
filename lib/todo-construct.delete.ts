var table = "ToDoWebsiteStack-Todos4F51CAC2-MLXIRHV3ZN4U";

// currently hard coded value for manually added item
// later taskID will be from handler -> perhaps make this a class?
var delParams = {
    TableName:"TodoTable",
    Key:{
        "taskID": "do washing"
    },
    ReturnValues: "ALL_OLD"
};

exports.handler = async (event: any, context: any) => {
    // delParams.Key.taskID = event.deleteKey;
    const response = await docClient.delete(delParams).promise();
  //   request.
  //   on('success', function(response) {
  //   return("Success!"+response);
  // }).send()
    return {
        statusCode: 200,
        headers: {"Content-Type": "text/plain"},
        body: JSON.stringify(response)
    }

}