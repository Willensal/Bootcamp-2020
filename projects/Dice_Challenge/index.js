const express = require('express');
const React = require('react');
const app = express();
let randomNumber1 = Math.floor(Math.random() * 6) + 1; //1-6

let randomDiceImage = "dice" + randomNumber1 + ".png"; //dice1.png - dice6.png

let randomImageSource = "images/" + randomDiceImage; //images/dice1.png - images/dice6.png

let image1 = document.querySelectorAll("img1")[0];

image1.setAttribute("src", randomImageSource);

let randomNumber2 = Math.floor(Math.random() * 6) + 1;

let randomImageSource2 = "images/dice" + randomNumber2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);


//if player 1 wins 
if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "🚩 Play 1 Wins!";
}
//if player 2 wins
else if (randomNumber2 > randomNumber1) {
  document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
}
//in case we have a draw
else {
  document.querySelector("h1").innerHTML = "Draw!";
}

app.listen(3000, function () {
  console.log("server running on port 3000");
});