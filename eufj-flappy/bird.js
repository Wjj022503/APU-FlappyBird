function Bird() {
    this.x = windowWidth * 2 / 10;
    this.y = windowHeight/2;
    this.width = 64;
    this.height = 64;

    this.gravity = 1;
    this.velocity = 0;
    this.flyForce = -25;

    this.draw = function(){
        image(birdImg,this.x,this.y,this.width,this.height);
    }

    this.update = function(){
        this.velocity += this.gravity;
        this.velocity *= 0.85;
        this.y += this.velocity;

        if(this.y > windowHeight){
            this.y = windowHeight;
            this.velocity = 0;
            gameState = "lose";
        }

        if(this.y + this.height < 0){
            this.y = 0;
            this.velocity = 0;
            gameState = "lose";
        }
    }

    this.fly = function(){
        this.velocity += this.flyForce;
    }

    this.setY = function(y){
        this.y = y;
    }
}
