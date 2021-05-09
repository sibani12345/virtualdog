var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var lastFed,fedtime;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  FeedFood=createButton("Feed The Food");
  FeedFood.position(900,95);
  FeedFood.mousePressed(feedDog);



}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedtime = database.ref("feedTime");
  fedtime.on("value",function (data){
    lastFed=data.val();
  })
 fill ("black")
 textSize(20);
  //write code to display text lastFed time here
  if(lastFed>=12){
    text("lastFed:"+lastFed %12 +"PM",350,30)
  }else if(lastFed===0){
    text("lastFed:12AM",350,30)
  }else{
    text("lastFed:" + lastFed +"AM"  ,350,30)
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
 var_stoct_val=foodObj.getFoodStock();

 if(getFoodStock<=0){
   foodObj.updateFoodStock(food_stock_val*0)
 }
else{
  foodObj.updateFoodStock(food_stock_val-1)
}
 
}



//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




