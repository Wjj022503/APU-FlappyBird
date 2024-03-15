function TNT(){
    this.top = random(windowHeight * 70 / 500,windowHeight * 175 / 500);
    this.bottom = random(windowHeight * 70 / 500,windowHeight * 175 / 500);
    this.x = windowWidth;
    this.width = 100;
    this.speed = 5;

    this.draw = function(){
        var topY = this.top;
        var btmY = windowHeight - this.bottom;
        for (topY; topY > -100; topY -= 100) {
            image(tntImg,this.x, topY, this.width, 100);
        }
        for (btmY; btmY < windowHeight + 100; btmY += 100) {
            image(tntImg,this.x, btmY, this.width, 100);
        }
    }

    this.update = function(){
        this.x -= this.speed;
    }

    this.offScreen = function(){
        if(this.x <= -this.width){
            return true;
        }
        return false;
    }

    this.hit = function(bird){
        if(bird.x + bird.width >= this.x && bird.x <= this.x + this.width){
            if(bird.y+bird.height >= windowHeight - this.bottom || bird.y - bird.height <= this.top){
                return true;
            }
        }
        return false;
    }
}