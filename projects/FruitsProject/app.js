const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const assert = require ("assert"); 
mongoose.connect("mongodb://localhost:27017/personDB", {
useNewUrlParser: true,
useUnifiedTopology: true
});
const app = express ();

const fruitschema = {
    name: {
        type: String,
        required: (true, "please chect your data entry, no name added")
    },
    rating: {
        type: Number,
        min:1,
        max: 10
    },
    review: String,
 }; 
const Fruit = mongoose.model ("Fruit",fruitschema);
const fruit = new Fruit ({
    name: "Apple",
    rating: 7,
    review: "it's alright"
});
const grapes = new Fruit ({
    name: "Grapes",
    rating: 10,
    review: "the best"
});

//fruit.save();
grapes.save();
const personschema = ({
    name: String,
    age: Number,
    favoriteFruit: fruitschema
 }); 

const Person = mongoose.model ("Person",personschema);

 const person = new Person ({
    name: "Jòj",
    age: 219,
    favoriteFruit: grapes

});

person.save();

app.listen(3000 || process.env.PORT, () => {
    console.log("Server is running.");
});
//mongoose.connection.close()  