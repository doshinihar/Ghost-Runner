var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisibleBlock,invisibleBlockGrp;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  spookySound.loop();
  
  doorsGrp = new Group();
  climbersGrp = new Group();
  invisibleBlockGrp = new Group();
}

function draw(){
 if (gameState === PLAY) {
   if (tower.y > 400 ) {
     tower.y = 300;
   }
   if (keyDown ("LEFT_ARROW")) {
     ghost.x = ghost.x - 3;
   }
   if (keyDown ("RIGHT_ARROW")) {
     ghost.x = ghost.x + 3;
   }
   
   if (keyDown ("space")) {
     ghost.velocityY = -5;
   }
   ghost.velocityY = ghost.velocityY + 0.5;
   spawnDoors();
   if (climbersGrp.isTouching(ghost)) {
     ghost.velocityY = 0;
   }
   if (ghost.y > 600 || invisibleBlockGrp.isTouching(ghost)) {
     gameState = END;
   }
 }
  else if (gameState === END) {
    tower.velocityY = 0;
    doorsGrp.setVelocityYEach(0);
    climbersGrp.setVelocityYEach(0);
    doorsGrp.setLifetimeEach(-1);
    climbersGrp.setLifetimeEach(-1);
  }
  drawSprites();
  if (gameState === END) {
    textSize(30);
    fill("yellow");
    text ("gameOver",200,200);
  }

}
function spawnDoors() {
  if (frameCount % 200 === 0) {
    var door = createSprite(200,-50);
    door.addImage("door",doorImg);
    door.velocityY = 1;
    door.lifetime = 650;
    door.x = Math.round(random(100,400));
    doorsGrp.add(door);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    var climber = createSprite(200,10);
    climber.addImage("climber",climberImg);
    climber.velocityY = 1;
    climber.lifetime = 650;
    climber.x = door.x;
    climbersGrp.add(climber);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 650;
    invisibleBlock.x = door.x;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.visible = false;
    invisibleBlockGrp.add(invisibleBlock); 
  } 
}




