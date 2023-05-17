const buttonColors = ["red", "blue", "green", "yellow"]; //Usage of const ensures that the value never changes in the future
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false; //Variable to track key press value

//Detecting clicks and extracting the id from the clicked element using the this function
$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  //Extracting the index value of the last clicked item that has been inserted inside the userClickedPattern array
  let lastAnswer = userClickedPattern.length - 1;
  checkAnswer(lastAnswer);
});

const nextSequence = () => {
  level++;
  $("#level-title").text("Level " + level);

  userClickedPattern = [];
  
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
};

//Playing sounds dyanmically based on the input received from the click or next sequence function.
const playSound = (name) => {
  let audioPlay = new Audio("./sounds/" + name + ".mp3");
  audioPlay.play();
};

//Adding animations
const animatePress = (currentColor) => {
  $("#" + currentColor).addClass("pressed");
  //Removing the class added to make it an animation and giving visual feedback to the user that a click was registered
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

//Detecting keyboard keypress and starting the game while setting up the level
$(document).keydown(() => {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Checking the user's answers
const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence(), 1000);
    }
  }

  else {
    $("body").addClass("game-over");
    let gameOver = new Audio ("./sounds/wrong.mp3");
    gameOver.play();

    $("#level-title").text("Game Over, Press any key to start again");
    
    startOver();

    setTimeout(
      () => {
        $("body").removeClass("game-over");
      }, 200);
  }
};

//Starting the game again when the user gets the pattern wrong
const startOver = () => {
  started = false;
  level = 0;
  gamePattern= [];
};