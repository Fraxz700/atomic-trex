var piso,suelo;
var trex,dinosaurio;
var pisoinvisible;
var nube,cielo;
var puntaje_trex=0;
var ob1;
var ob2;
var ob3;
var ob4;
var ob5;
var ob6;
var obstacul0;
var tipo_obstaculo, obstaculo;
var checkpoint
var die
var jump
var grp_obs
var grp_nube
var etapa=1
var trex_c,trexCollide
var game0ver, GameOver
var restart, respawn

function preload(){
  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png");
  piso=loadImage("ground2.png");
  respawn=loadImage("restart.png")
  dinosaurio=loadAnimation("trex3.png","trex4.png");
  cielo=loadImage("cloud.png")
  trexCollide=loadImage("trex_collided.png")
  GameOver=loadImage("gameOver.png")
  checkpoint=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
}


function setup(){
createCanvas(600,300);  
  suelo=createSprite(300,260);
  suelo.addImage("caminando",piso);
  suelo.scale=1;
  suelo.velocityX=-5;
  trex=createSprite(50,265);
  trex.addAnimation("saltando",dinosaurio);
  trex.scale=1;
  trex.setCollider("circle",0,0,40)
  trex.debug=false
  trex_c=createSprite(50,220);
  trex_c.addImage("choque",trexCollide);
  trex_c.scale=1;
  trex_c.visible=false
  pisoinvisible=createSprite(50,280,50,5)
  pisoinvisible.visible=false;
  game0ver=createSprite(300,100)
  game0ver.addImage("game",GameOver)
  game0ver.visible=false
  restart=createSprite(300,150)
  restart.addImage("reset",respawn)
  restart.visible=false
  restart.scale=0.6
  grp_obs=new Group()
  grp_nube=new Group()
}


function draw(){
 background("white")
  if (etapa==1){
  nubes();
  puntaje();
  obstaculos();
  if (trex.collide(pisoinvisible)){
  if (keyDown("space")){
    trex.velocityY=-16;
    jump.play()
  }
  }
  trex.velocityY=trex.velocityY+0.8;
  if (suelo.x<0){
    suelo.x=300
  }
    if (grp_obs.isTouching(trex)){
      etapa=2
      die.play()
    }
  }  //aqui termina etapa 1
  
  if (etapa==2){
    suelo.velocityX=0
    grp_obs.setVelocityXEach(0)
    grp_nube.setVelocityXEach(0)
    grp_nube.setLifetimeEach(-1)
    grp_obs.setLifetimeEach(-1)
    trex.velocityY=0
    trex_c.y=trex.y
    trex_c.visible=true
    trex.visible=false
    restart.visible=true
    game0ver.visible=true
    textSize(30);
  fill("black")
  text("score: "+puntaje_trex,400,30)
    if (mousePressedOver(restart)){
      etapa=1;
      game0ver.visible=false
      restart.visible=false
      trex_c.visible=false
      trex.visible=true
      suelo.velocityX=-5
      grp_obs.destroyEach();
      grp_nube.destroyEach();
      puntaje_trex=0
    }
  }  //aqui termina la etapa 2
  
  trex.collide(pisoinvisible)
  drawSprites();
}
function nubes(){
  if (frameCount %60 ==0){
  nube=createSprite(600,Math.round( random(30,75)));
  nube.addImage("volando",cielo)
  nube.velocityX=-5;
    nube.lifetime=130;
    grp_nube.add(nube);
  }
}
function puntaje(){
  puntaje_trex = puntaje_trex + Math.round(getFrameRate()
/ 60);
  if (puntaje_trex%100==0 &&puntaje_trex>0 ){
    checkpoint.play()
  }
  textSize(30);
  fill("black")
  text("score: "+puntaje_trex,400,30)
}
function obstaculos(){
  tipo_obstaculo = Math.round(random(1,6));
  if (frameCount %65 ==0){
  obstacul0=createSprite(600,Math.round( random(230,240)));
  obstacul0.velocityX=-(5+puntaje_trex/100);
   suelo.velocityX=obstacul0.velocityX 
    switch (tipo_obstaculo) {
      case 1:
        obstacul0.addImage("obstaculo",ob1)
        obstacul0.setCollider("rectangle",0,0,50,75)
        break;
      case 2:
        obstacul0.addImage("obstaculo",ob2)
        obstacul0.scale=0.8
        break;
      case 3:
        obstacul0.addImage("obstaculo",ob3)
        obstacul0.setCollider("rectangle",0,0,100,70)
        obstacul0.scale=0.8
        
        break;
      case 4:
        obstacul0.addImage("obstaculo",ob4)
        obstacul0.setCollider("rectangle",0,0,30,105)
        break;
      case 5:
        obstacul0.addImage("obstaculo",ob5)
        obstacul0.setCollider("rectangle",0,0,100,87)
        obstacul0.scale=0.8
        break;
      case 6:
        obstacul0.addImage("obstaculo",ob6)
        obstacul0.setCollider("rectangle",0,0,160,85)
        obstacul0.scale=0.6
        break;
    }
    obstacul0.debug=false
    obstacul0.lifetime=130;
    grp_obs.add(obstacul0);
  }
}