

var AWS = require("aws-sdk");
AWS.config.update({ region: "us-1" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" }); // TODO alterar aqui
/*
const params = {
    // Specify which items in the results are returned.
    FilterExpression: "name = :name AND price = :price ",
    // Define the expression attribute value, which are substitutes for the values you want to compare.
    ExpressionAttributeValues: {
    ":topic": {S: "SubTitle2"},
    ":s": {N: 1},
    ":e": {N: 2},
    },
    // Set the projection expression, which are the attributes that you want.
    ProjectionExpression: "name, price",
    TableName: "EPISODES_TABLE",
};
*/


ddb.scan(params, function (err, data) {
    if (err) {
    console.log("Error", err);
    } else {
    console.log("Success", data);
    data.Items.forEach(function (element, index, array) {
        console.log(
            "printing",
            element.Title.S + " (" + element.Subtitle.S + ")"
        );
    });
    }
});

var docClient = new AWS.DynamoDB.DocumentClient();

var parameters = {
    TableName: "clothes",
    FilterExpression: "#user_status = :user_status_val",
    ExpressionAttributeNames: {
        "#user_status": "user_status",
    },
    ExpressionAttributeValues: { ":user_status_val": 'somestatus' }

};

docClient.scan(parameters, onScan);
var count = 0;

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {        
        console.log("Scan succeeded.");
        data.Items.forEach(function(itemdata) {
            console.log("Item :", ++count,JSON.stringify(itemdata));
        });

        // continue scanning if we have more items
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            parameters.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(parameters, onScan);
        }
    }
}
