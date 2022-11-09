var bg
var op1,op2,op3,plane,m,blast,bg,mi;
var op1Image,op2Image,op3Image,plane1Image,mImage,blastImage,miImage;
var op1group,mgroup,op2group,op3group,mi1Group;
var score = 0;
var life = 3
var gameState = 1
var planeBackground
var Heart1,Heart2,Heart3
function preload() {
  op1Image = loadImage("op1.png")
  op2Image = loadImage("op2.png")
  op3Image = loadImage("op3.png")
  planeImage = loadImage("plane.png")
  mImage = loadImage("m.png")
  blastImage = loadImage("blast.png")
  bg = loadImage("hj.jpg")
  miImage = loadImage("mi.png")
  planeBackground = loadImage("bg.png")
  Heart1 = loadImage("heart_1.png")
  Heart2 = loadImage("heart_2.png")
  Heart3 = loadImage("heart_3.png")
}
 

function setup() {
  createCanvas(1400,600)
  
   score = 0
  life = 100

 

  

plane = createSprite(100,random(20,400),40,40)
plane.addImage("plane",planeImage)
plane.scale=0.4
plane.debug= true
plane.setCollider("rectangle",0,15,400,250)

obsGroup = new Group ()
mgroup = new Group ()
mi1Group = new Group()


}

function draw() {
background(planeBackground)

// score 

fill ("red")
 stroke("yellow")
 strokeWeight("3")
 textSize(40)
text("Score = " + score,1000,50)

//life bar
Heart3.scale = 0.5
image (Heart3,20,50)


if (keyWentUp("space")){
  missile()
}


 if(mi1Group.isTouching(plane)){
   life = life -1 
 }

  
plane.y=mouseY

//destroying the obstacles 
if(obsGroup.isTouching(mgroup)){
 

  for(var i=0;i<obsGroup.length;i++){     
    

   
   if(obsGroup[i].isTouching(mgroup)){
   
   
      score = score + 1
    
    
    blast = createSprite (obsGroup[i].x,obsGroup[i].y,50,50)
    blast.addImage(blastImage)
    blast.scale = 0.2
    blast.lifetime = 30
    obsGroup[i].destroy()
   
    //mgroup[j].destroyEach()
    m.remove()
   // obsGroup[i].changeImage("blastImage")
        } 
  }
 }
if(life=0){
  gameOver()
  

}
 //gameOver 
 
 
// if(frameCount % Math.round(random(101,50)) === 10){

//   for(var i=0;i<obsGroup.length;i++){
//   //opm();
//   mi1 = createSprite(obsGroup[i].x-20,obsGroup[i].y+20,40)
//   mi1.addImage(miImage)
//   mi1.scale = 0.1
//   mi1.lifetime= 200
//   mi1.velocityX = -10
//   mi1Group.add(mi)
  
//   if (mi1.isTouching(plane)){
//     life = life - 10
//   }
// }}

enemy()
handleLife()
if (plane.isTouching(mi1Group)){
  Rlife()
}

drawSprites();
}

function missile(){
  m = createSprite(150,100,40,40)
  m.addImage("m",mImage)
  m.y = plane.y+75
  m.scale=0.1
  m.velocityX= 10
  mgroup.add(m)
}

// function blastscn(){
//  blast = createSprite (m.x,m.y,40,40)
//   blast.addImage("blast",blastImage)
//   blast.scale= 0.2
//   blast.life = 20
//   mgroup.destroyEach();
  
// }




//obstacle creations 
function enemy(){
  if(frameCount%100===0){

    //giving random x and y positions for zombie to appear
    obstacle = createSprite(random(1300,1300),random(100,500),40,40)
    obstacle.scale = 0.40
    obstacle.velocityX = -3
    obstacle.debug= true
    obstacle.setCollider("rectangle",0,0,400,250)

    var randomObs=Math.round(random(1,3))

    switch(randomObs)
    {
case 1: obstacle.addImage(op1Image); break;
case 2: obstacle.addImage(op2Image); break;
case 3: obstacle.addImage(op3Image); break;
default:break;
    }
    obstacle.lifetime = 400
     obsGroup.add(obstacle)
  }
}

function showLife(){
  life = createSprite(40,40,40,40)
 text ("Life="+life )
 
}

function handleLife(){

  if(frameCount % Math.round(random(101,50)) === 10){

      for(var i=0;i<obsGroup.length;i++){
      //opm();
      mi1 = createSprite(obsGroup[i].x-20,obsGroup[i].y+20,40)
      mi1.addImage(miImage)
      mi1.scale = 0.1
      mi1.lifetime= 200
      mi1.velocityX = -10
      mi1.debug= true
    mi1.setCollider("rectangle",0,0,500,100)
      mi1Group.add(mi1)
       
      // for(var i=0;i<mi1Group.length;i++)
      // if (mi1Group[i].isTouching(plane)){
      //   life = life - 10
      // }
    }}

}

function Rlife(){
  for(var i=0;i<mi1Group.length;i++){
  if (plane.isTouching(mi1Group)){
    life = life - 1
    mi1Group[i].destroy()
  }}

}

 function gameOver(){
  textSize(50)
  fill("red")
  text ("You Lost",200,200)

  plane.changeImage("blast",blastImage)
   mi1Group.destroyEach()
   mgroup.destroyEach()
   op1group.destroyEach()
   op2group.destroyEach()
   op3group.destroyEach()
 
 }


if(life = 2){
  Heart3.visible = false
Heart3.addImage(Heart2,20,50)
}
if(life = 1){
  Heart2.visible = false
  Heart2.addImage(Heart1,20,50)
}
if (missile.isTouching(plane))
{
  life -= 1
}


































