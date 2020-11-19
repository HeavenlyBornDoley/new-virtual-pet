class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("images/milk.png");
    }
    getFoodStock(){
        return this.foodStock;
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock
    }
    getFedTime(lastFed){
        this.lastFed = lastFed;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock - 1;
        }
    }
    bedRoom(){
        background(bedroom,550,500);
    }
    garden(){
        background(garden,550,500);
    }
    washRoom(){
        background(washroom,550,500);
    }
    display(){
        var x=80,y=100;
        imageMode(CENTER);

        fill(255,255,254);
        textSize(15);
        if(lastFed>=12){
            text("lastFed"+lastFed%12+"PM", 50,30);
        }
        else if(lastFed = 0){
            text("lastFed:12AM",50,30);
        }
        else{
            text("lastFed"+lastFed+"AM",50,30);
        }
        var x = 70, y = 100
        if(this.foodStock!=0){
            for(var i = 0; i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50
                }

                image(this.image,x,y,50,50);
                x=x+30

            }
        }
    
    }
}
