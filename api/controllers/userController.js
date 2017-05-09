var User = require('../models/user');
const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../../config/config');

/* GET all users. */
var GetAllUsers = function (req, res) {

    User.getAllUsers(function(err, result){
        if (err) res.status(500).send(error);
        
        res.status(200).json(result);
    });

};

/* Get user by Id */
var GetUserById = function (req, res) {
    User.GetUserById(req.params.id,function(err, user){
        if (err) res.status(500).send(error);
        
        res.status(200).json(user);
    });
};

/* Create a user. */
var AddNewUser = function (req, res) {
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    User.addNewUser(user,function(err, result){
        if (err) res.status(500).send(error);
        
        res.status(201).json({
            message: 'User created successfully'
        });
    });

}

var AuthenticateUser = function(req, res){
    let data = {
        email: req.body.email,
        password: req.body.password
    };
    
    User.authenticateUser(data,function(err, user){
        if(user.success == false){
            return res.json({success:false, token: null});
        }
        let token = jwt.sign(user, config.jwt_secret, {
            expiresIn: 1440 // expires in 1 hour
        });
        res.json({success:true, token: token});
    });

}

module.exports = {
    GetAllUsers: GetAllUsers,
    GetUserById: GetUserById,
    AddNewUser: AddNewUser,
    AuthenticateUser:AuthenticateUser
}
