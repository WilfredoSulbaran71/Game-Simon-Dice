
// practica para realizarlo de nuevo
//-----------------------------------------------------------------------------------------------
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;
//----------------------------------------------------------------------------------------------

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); // esto permitira saber a cual boton se le dio click

    userClickedPattern.push(userChosenColour);

   //console.log(userClickedPattern); 

   playSound(userChosenColour);

   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1);    
});


function checkAnswer(currentLevel) {
        if(gamePattern[currentLevel] ===  userClickedPattern[currentLevel]){

        console.log("satisfactorio");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
            
        } 
    } else {
        console.log("fallido");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver();
    }
}



function nextSequence(){

    userClickedPattern = [];

    level++; // incremente el nivel cada vez que se llame la funsion

    $("#level-title").text("Level " + level); // cambia el titulo + el nivel    
   
    var randomNumber = Math.floor(Math.random() * 4); // esto deara un aleatorio entre 0 y 3
  //  console.log(randomNumber);
    var randomChosenColour = buttonColours [randomNumber]; // esto me trae el color de forma aleatoria 
  // console.log(randomChosenColour);

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);// al ID le concateno el color del boton

   playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); //esto permite generar el sonido en el boton seleccionado
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

