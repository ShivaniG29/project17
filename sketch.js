var PLAY=1;
var END=0;
var gameState=1;
var monkey , monkey_running,monkeyGameover;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime=0;
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 }

function setup() {
  createCanvas(600, 440);

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=4;
  
  bananaGroup=new Group();
 obstacleGroup=new Group();
}

function draw(){
  background("green");
  if(gameState===PLAY){
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
   ground.x = ground.width/2;
  console.log(ground.x); 
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  
  bananaFruit();
  spawnObstacles();
  
  if(monkey.isTouching(bananaGroup)){
     bananaGroup.destroyEach();
    score=score+2;
   }
    if(obstacleGroup.isTouching(monkey)){
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
      gameState = END;
}
}
  else if (gameState === END) {
    monkey.velocityY=0;
    monkey.velocityX=0;
    ground.velocityX=0;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    fill("pink"); 
    stroke("black");
    textSize(30);
    text("Gameover",300,200);
  }
  
  drawSprites();
   fill("black"); 
  stroke("black");
  textSize(20);
 survivalTime=Math.ceil(frameCount/frameRate());
  text("survivalTime: "+survivalTime ,100,50);
  
  fill("white") 
  stroke("black");
  textSize(20);
  text("Score: "+ score, 500,50);
  
 
}
function bananaFruit(){
  if (frameCount % 80 === 0) {
    banana = createSprite(400,100,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-4;
    banana.lifetime = 100;
   bananaGroup.add(banana);
  }
}
function spawnObstacles(){
 if (frameCount % 300 === 0){
   obstacle = createSprite(600,312,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
   obstacle.velocityX = -6;
   obstacle.lifetime = 300;

  obstacleGroup.add(obstacle);
 }
}