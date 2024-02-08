const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));   // this allows you to input static folders or images and run them on a server.


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});
app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
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
    const url = "https://gmail.us21.list-manage.com/subscribe/post?u=4c696c9338257d8db5eb8fb7e&amp;id=b823044c24&amp;f_id=000e5ae1f0";
    const options = {
        method: "POST",
        auth: "willens1:c4e962554cc04c6c8e68bbc1983a2a35-us21"
    }
    const request = https.request(url, options, function (response) {
        console.log(response.statusCode);
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");

        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
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
