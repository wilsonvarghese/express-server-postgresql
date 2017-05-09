// Import dependencies
const express = require('express');
const router = express.Router();
let User   = require('../models/user');
const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../../config/config');

var user_api = require('../controllers/userController');
var aws_api = require('../controllers/awsController');

/* GET api listing. */
router.get('/', (req, res) => {
		res.send('wos api');
});


//*********************************** authenticate BEGIN *********************************/

/* authenticate user */
router.post('/authenticate', (req, res) => {
    user_api.AuthenticateUser(req, res);
});


// route middleware to authenticate and check token
// ---------------------------------------------------------
router.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, config.jwt_secret, function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});

//*********************************** authenticate BEGIN *********************************/

//*********************************** USER BEGIN ********************************************/

/* GET all users. */
router.get('/users', (req, res) => {
    user_api.GetAllUsers(req, res);
});

/* GET one users. */
router.get('/users/:id', (req, res) => {
    user_api.GetUserById(req, res);
});

/* Create a user. */
router.post('/users', (req, res) => {
    user_api.AddNewUser(req, res);
});


//*********************************** USER END ********************************************/

//*********************************** AWS BEGIN ********************************************/

/* Create AWS Thing(Device) */
router.post('/awsthings', (req, res) => {
    aws_api.CreateAWSThing(req, res);
});

/* Get all AWS Things (Devices) */
router.get('/awsthings', (req, res) => {
    aws_api.GetAllAWSThings(req, res);
});


/* Create AWS Thing Type(Device Type) */
router.post('/awsthingtypes', (req, res) => {
    aws_api.CreateAWSThingType(req, res);
});


//*********************************** AWS END ********************************************/
module.exports = router;
