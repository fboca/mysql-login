const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
var app = express();

//Configuring express server
app.use(bodyparser.json());
app.options('*', cors())
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Establishing MySql Connection
//Please enter here your mysql login credentials
var mysqlConnection = mysql.createConnection({
    host: 'yourhost',
    user: 'youruser',
    password: 'yourpassword',
    database: 'yourdatabase',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

app.options('/api/connect/:username/:password');
app.get('/api/connect/:username/:password', (req, res) => {

    mysqlConnection.query('SELECT * FROM users WHERE username = ?', [req.params.username], (err, rows, fields) => {
        if (!err) {
            if (rows[0] != undefined) {
                if (rows[0].password == req.params.password) {
                    res.send("1")
                } else {
                    res.send("0")
                }
            } else {
                res.send("2")
            }
        }
        else
            console.log(err);
    })
});

//Register new user handler
app.options('/api/register/:username/:password/:fullname/:profilepicture');
app.get('/api/register/:username/:password/:fullname/:profilepicture', (req, res) => {

    //Checking if the username exists
    mysqlConnection.query('SELECT * FROM users WHERE username = ?', [req.params.username], (err, rows, fields) => {
        if (!err) {
            if (rows[0] != undefined) {
                /*If the username exists the server will send "0" signal witch means that
                the username already exists and the proceess of signing up will stop here*/
                res.send("0");
            } else {
                //Creating account
                mysqlConnection.query("INSERT INTO `nodebackend`.`users` (`username`, `password`, `displayName`, `profilePicture`) VALUES" + `('${req.params.username}', '${req.params.password}', '${req.params.fullname}', '${req.params.profilepicture}');`, (err, rows, fields) => {
                    if (!err) {
                        //Sending success status to frontend :D
                        res.send("2");
                    } else {
                        //Sending error status to frontend
                        res.send("1");
                    }
                })
            }
        }
        else
            console.log(err);
        res.send("1");
    })
});