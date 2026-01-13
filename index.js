var userClickedPattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
  if(!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(event){
  let color = this.id;
  startFlash(color);
  makeSound(color);
  userClickedPattern.push(color);
  checkAnswer(userClickedPattern.length-1);
})

function makeSound(colorChosen){
  var soundMake = new Audio("sounds/" + colorChosen +".mp3")
  soundMake.play();
}

function startFlash(color1){
 $("#" + color1).addClass("pressed");
 setTimeout(() => {
$("#" + color1).removeClass("pressed");
}, 100);}

function nextSequence(){

     level++;
     $("#level-title").text("level "+ level);

     var randomNumber = Math.floor(Math.random()*4);
     var randomChooseColor = buttonColor[randomNumber];
     gamePattern.push(randomChooseColor);

     userClickedPattern = [];

     $("#" + randomChooseColor).fadeOut(500).fadeIn(500);

     makeSound(randomChooseColor);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      if(gamePattern.length === userClickedPattern.length){
        setTimeout(() =>{
          nextSequence();
        }, 1000)
      }
    } else {
      $("#level-title").text("Game over. Press any key to Restart.");
      $("body").addClass("game-over");
      setTimeout(()=>{
        $("body").removeClass("game-over");
      },200);
      makeSound("wrong");
      startOver();
    }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
