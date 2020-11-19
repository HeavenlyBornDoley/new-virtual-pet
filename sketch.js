var dog,happydog;
var database;
var foodS,foodstock;
var button1,button2;
var fedTime,lastFed;
var foodObg;
var dogHappy;

function preload()
{
  dogimg = loadImage("images/dogImg.png");
  doghappy = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/BedRoom.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/WashRoom.png");
}

function setup() {
  createCanvas(500, 500);

  foodObg = new Food();

  database = firebase.database();
  
  foodstock = database.ref('food');
  foodstock.on("value",readStock);

  dog = createSprite(300,150,250,150);
  dog.addImage(dogimg)
  dog.scale = 0.15
  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(8000,95);
  addFood.mousePressed(addFoods);

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){lastFed = data.val()});
  readState = database.ref('gameState');
  readState.on("value",function(data){gameState = data.val()});
  
}


function draw() {  
  background("46, 138, 87")

  drawSprites();
  
  fill("green")
  textSize(20)
  text("food"+ foodS,170,200);

//fedTime = database.ref('FeedTime');
//fedTime.on("value",function(data){
//lastFed = dat.val();
//});

  //if(keyWentDown(UP_ARROW)){
  // addFood(foodS);
  // dog.addImage(doghappy)
  // dog.scale = 0.15
 // }

  currentTime = hour();
  if(currentTime === (lastFed+1)){
    update("playing");
    foodObg.garden()
  }
else if(currentTime == (lastFed + 2)){
  update("sleeping");
  foodObg.bedroom()
}
else if(currentTime > (lastFed + 2)&&currentTime<=(lastFed+4)){
  update("bathing");
  foodObg.washroom();

}
else{
  update("hungry");
  foodObg.display()
}

if(gameState !== "Hungry"){
  feed.hide()
  addFood.hide()
  dog.remove()
}
else{
  feed.show()
  addFood.show()
  dog.addImage(dogimg)
}

}

function addFood(x){
  if(x <= 0){
    x = 0;
  }
  else{x = x - 1};
  database.ref('/').update({food:x})
}

function readStock(data){
  foodS = data.val();
  foodObg.updateFoodStock(foodS);
  
  

}

function feedDog(){
  dog.addImage(happydog)
  foodObg.updateFoodStock(foodObg.getFoodStock()-1)
  database.ref('/').update({food:foodObg.getFoodStock(),feedTime:hour(),gameState:"hungry"})
}

function update(state){
  database.ref('/').update({gameState:state})
}

function addFoods(){
  foods = foods+1
  database.ref('/').update({food:foodS})
}

