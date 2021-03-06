
const AWS = require('aws-sdk')
let fs = require("fs");
let path = require("path");


exports.handler = (event, context, callback) => {
    
    console.log(`Region ${event.instanceRegion}`);
    const ec2 = new AWS.EC2({ region: event.instanceRegion });
    var array = fs.readFileSync(__dirname + "/instanceIds.txt").toString().split('\n');

    var listOfInstances = []
    array.forEach(function(instanceId){
        if(instanceId){
            listOfInstances.push(instanceId)
        }
    })
    
    ec2.rebootInstances({ InstanceIds: listOfInstances }).promise()
        .then((data) => console.log(data) )
        .catch(err => callback(err));
      
};