var bird;
var tnts = [];
let bg;
var gameState = "starting";
var score = 0;
var totalScore = 0;
var currentTime;
var setRetryTime;
var timeRecorded = false;
let startSound;
let scoreSound;
let loseImg;
let loseSound;
let tntImg;
let birdImg;

function preload(){
  bg = loadImage("img/apu.jpg");
  startSound = loadSound("sound/startRetry.mp3");
  scoreSound = loadSound("sound/score.mp3");
  loseSound = loadSound("sound/boom.mp3");
  loseImg = loadImage("img/boom.jpg");
  tntImg = loadImage("img/tnt.png");
  birdImg = loadImage("img/bird.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bird = new Bird();
}

function draw() {
  background(bg);
  currentTime = millis();
  startingMessage();
  if(gameState === "playing"){
    //gameScore();
    gameScoreEffect();
    bird.update();
    bird.draw();
    generateTnts();
  }
  loseMessage();
}

function generateTnts(){
  if(frameCount % 50 == 0){
    tnts.push(new TNT());
  }
  for(var i = 0; i < tnts.length; i++){
    tnts[i].draw();
    tnts[i].update();
    //delete off screen tnt
    if(tnts[i].offScreen()){
      tnts.splice(i,1);
    }
    //check bird hit
    if(tnts[i].hit(bird)){
      gameState = "lose";
    }
    gameScore(tnts[i]);
  }
}

function startingMessage(){
  if(gameState === "starting"){
    textSize(windowWidth/10);
    textAlign(CENTER);
    textFont("fantasy");
    fill(0,204,204);
    text("Click to Start",windowWidth/2,windowHeight/2);
  }
}

function loseMessage(){
  if(gameState === "lose"){
    loseSound.setVolume(0.4);
    loseSound.play();
    gameState = "waiting";
  }
  else if(gameState === "waiting" || gameState === "retry"){
    background(loseImg);
    textSize(windowWidth/10);
    textAlign(CENTER);
    textFont("fantasy");
    fill(0);
    text("APU exploded",windowWidth/2,windowHeight * 3 / 10);
    textSize(windowWidth/20);
    textAlign(CENTER);
    textFont("fantasy");
    fill(0,0,0);
    text("\nYour Score: "+totalScore+"\n\nClick to retry",windowWidth/2,windowHeight * 4/10);
    setRetry();
  }
}

function setRetry(){
  if(!timeRecorded){
    setRetryTime = currentTime + 1000;
    timeRecorded = true;
  }
  if(currentTime > setRetryTime){
    gameState = "retry";
  }
}

function gameScore(tnt){
  if(bird.y - bird.height / 2 >= tnt.top && bird.y + bird.height <= windowHeight - tnt.bottom){
    if(bird.x > tnt.x + tnt.width && bird.x <= tnt.x + tnt.width + 3){
        return score = score + 1;
    }
  }
}

function gameScoreEffect(){
  if(score % 2 == 0 && score != 0){
    totalScore += 1;
    scoreSound.setVolume(0.4);
    scoreSound.play();
    score = 0;
  }
  textSize(windowHeight/40);
  textAlign(LEFT);
  textFont("Calibri");
  fill(0);
  text("Score: "+totalScore,10,30);
}

function gameReset(){
  bird.setY(windowHeight/2);
  score = 0;
  totalScore = 0;
  tnts.splice(0,tnts.length);
  gameState = "playing";
  timeRecorded = false;
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function keyPressed(){
  if(gameState === "starting"){
    gameState = "playing";
  }
  else if(gameState === "retry"){
    gameReset();
  }
  if(key == ' ' || key == 'ArrowUp'){
    bird.fly();
  }
}

function mouseClicked(){
  if(gameState === "playing"){
    bird.fly();
  }
  else if(gameState === "starting"){
    startSound.setVolume(0,4);
    startSound.play();
    gameState = "playing";
  }
  else if(gameState === "retry"){
    startSound.setVolume(0,4);
    startSound.play();
    gameReset();
  }
}
