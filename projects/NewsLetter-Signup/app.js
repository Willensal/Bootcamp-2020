require('dotenv').config();// Because the APIkey is contain in a .env file
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { env } = require('process');



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));   // this allows you to input static folders or images and run them on a server.


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});
app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;a
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,


                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = env.URL; //url from mailchimp
    console.log(url);
    const options = {
        method: "POST",
        auth: env.APIKEY//APIkey from mailchimp
    }
    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");

        }
        response.on("data", function (data) {

        })
    })
    request.write(jsonData);
    request.end();


});
app.post("/failure", function (req, res) {
    res.redirect("/");
})


app.listen(3000, function () {
    console.log("server is up and running on port 3000");
});
