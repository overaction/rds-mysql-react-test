const config = require('./config.json')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

let mysql = require("mysql");

// create a connection variable with the required details
let con = mysql.createConnection({
    host: config.host, // ip address of server running mysql
    user: config.user, // user name to your mysql database
    password: config.password, // corresponding password
    database: config.database, // use the specified database
});

// make to connection to the database.
con.connect(function (err) {
    if (err) throw err;
    // if connection is successful
    console.log("connection successful");
});

app.get("/", (req, res) => {
    con.query(`select * from student`, (err, results) => {
        if (err) return res.send(err);
        else {
            return res.json({
                data: results,
            });
        }
    });
});

app.post("/posts", (req, res) => {
    con.query("SELECT * FROM student", (err, results) => {
        if (err) throw err;
        console.log(results)
        console.log(JSON.stringify(results))
        res.send(JSON.stringify(results));
    });
});

app.post("/", (req, res) => {
    let { name, number } = req.body;
    let records = [[req.body.name, req.body.number]];
    if (records[0][0] != null) {
        con.query(
            "INSERT into student (name,number) VALUES ?",
            [records],
            function (err, res, fields) {
                if (err) throw err;
                console.log(res);
            }
        );
    }
    con.query("SELECT * FROM student", (err, results) => {
        if (err) throw err;
        console.log(results)
        console.log(JSON.stringify(results))
        res.json(JSON.stringify(results));
    });
});

app.listen(5000, () => {
    console.log("Port 5000");
});
