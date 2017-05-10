"use strict";

const pool = require('../../db/database');

/*authenticateUser*/
exports.authenticateUser = function(data, callback) {

    pool.query('SELECT * from users where email= $1 and password=$2',[data.email, data.password], function(err, res) {
        if(err) {
            return console.error('error running query', err);
        }
        let user = null;
        if(res.rows.length > 0){
            user = res.rows[0];
        }else{
            user = {"success":false};
        }
        callback(err,user);
    });

}

/*get user by id*/
exports.GetUserById = function(userId, callback) {

    pool.query('SELECT * from users where id= $1',[userId], function(err, res) {
        if(err) {
            return console.error('error running query', err);
        }
        callback(err,res.rows);
    });

}

/*get all users*/
exports.getAllUsers = function(callback) {

    pool.query('SELECT * from users',[], function(err, res) {
        if(err) {
            return console.error('error running query', err);
        }
        callback(err,res.rows);
    });

}

/*add new user*/
exports.addNewUser = function(data, callback) {

    pool.query('insert into users(name, email, password) values ($1,$2,$3)',[data.name, data.email, data.password], function(err, res) {
        if(err) {
            return console.error('error running query', err);
        }
        callback(err,res);
    });

}