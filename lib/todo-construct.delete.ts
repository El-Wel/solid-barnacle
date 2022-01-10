var table = "ToDoWebsiteStack-Todos4F51CAC2-OWIEEF2CENN8";

var delParams = {
    TableName:table,
    Key:{
        "key": 1,
        "task": "do washing"
    },

};

function deleteItem(){
  console.log("Attempting a conditional delete...");
  docClient.delete(delParams, function(err: any, data: any) {
      if (err) {
          console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
      }
  });
}
exports.handler = async (event: any, context: any) => {
  try {
    deleteItem()
    return {
        statusCode: 200,
        headers: {"Content-Type": "text/plain"},
        body: "Deleted"
    }
  } catch (err) {
    return { error: err }
  }
}