"use strict";

const AWS = require('aws-sdk');
const config = require('config');

//get config values for the environment
let awsConfig = config.get('WOS.AWS');

AWS.config.update({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
    region: awsConfig.region
});

let  iot=new AWS.Iot();


/* Create AWS Thing Type(Device Type) */
var CreateAWSThingType = function (req, res) {
  iot.createThingType(req.thingTypeParams, function(err, data) {  
    if (err) {
      res.status(500).send(err)
    } 
    else{
      res.status(200).json(data);
    }
  });

};


/* Create AWS Thing(Device) */
var CreateAWSThing = function (req, res) {
  iot.createThing(req.body.thingParams, function(err, data) { 
    if (err) {
      res.status(500).send(err)
    }
    else{
      res.status(200).json(data);
    }
  });
};

/* List all AWS things */
var GetAllAWSThings = function (req, res) {
  let params = {};
  iot.listThings(params, function(err, data) {
    if (err) {
      res.status(500).send(err)
    }
    else{
      res.status(200).json(data);
    }
  });
}

module.exports = {
    CreateAWSThing: CreateAWSThing,
    CreateAWSThingType: CreateAWSThingType,
    GetAllAWSThings:GetAllAWSThings
}
