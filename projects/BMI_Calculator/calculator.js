
// request is what the user input response is what the user sees after pressing submit. 
const express = require("express");// requiring express 
const bodyParer = require("body-parser"); // requiring body-parser 
const app = express();// setting an app that is going to use the express module 
app.use(bodyParer.urlencoded({ extended: true }));//getting our app to use body-parser.  urlencoded is used when you are trying to parse something that comes from an html form 

app.get("/", function (req, res) {    // home route that has a call back function 
    res.sendFile(__dirname + "/index.html");    // to use the whole HTML file and send it to the server
});
app.post("/", function (req, res) {
    const weight = req.body.weight;
    const height = req.body.height;
    const result = (weight / (height ** 2)) * 703;
    console.log(result);
    res.send("Thanks for participating your BMI is: " + result);

});

app.listen(3000, function () { // making the app listen on port 3000, 3000 is the most common port when people are developing locally
    console.log("server started on port 3000");

});