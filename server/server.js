const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

let mysql = require("mysql");

// create a connection variable with the required details
let con = mysql.createConnection({
    host: "database-3.cf2u0cxbe2r4.ap-northeast-2.rds.amazonaws.com", // ip address of server running mysql
    user: "admin", // user name to your mysql database
    password: "sik06256!", // corresponding password
    database: "testdb", // use the specified database
});

// make to connection to the database.
con.connect(function (err) {
    if (err) throw err;
    // if connection is successful
    console.log("connection successful");
});

app.get("/", (req, res) => {
    res.json("OK");
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
    res.json("Form recieved");
});

app.listen(5000, () => {
    console.log("Port 5000");
});