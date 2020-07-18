
function Snake(x, y, color, width, height, scale){
    this.x = x; 
    this.y = y; 
    this.scale = scale; 
    this.dx = 1;
    this.dy = 0; 

    this.body = []; 
    this.body_length = 2; 
   
    this.eats = function (food){
        if (this.x == food.x && this.y == food.y) {
            return true;
        }
        return false;
    }
    this.grow = function (){
        this.body_length++;
    }
    this.hitsItself = function () {
        let values = [];
        let x = this.x; 
        let y = this.y;
        
        let length = this.body.length; 
        for (var i = 0; i < length; i++){
            let pos = this.body[i];
            if (x == pos.x && y == pos.y) {
                return true;
            }
        }
        return false;
    }; 

    this.update = function () {
        this.body.push ({x: this.x, y: this.y});
        if (this.body.length > this.body_length) {
            this.body.shift();
        }
        this.x += this.dx * this.scale; 
        this.y += this.dy * this.scale; 

        if (this.x < 0) {
            this.x = width; 
        } else if (this.x >= width) {
            this.x = 0;
        } else if (this.y < 0) {
            this.y = height; 
        } else if (this.y >= height) {
            this.y = 0;
        }

    }; 

    this.draw = function (ctx){
        ctx.beginPath();
        ctx.fillStyle = color;
        let scale = this.scale; 
        this.body.forEach(function (pos) {
            ctx.rect(pos.x, pos.y, scale, scale); 
            ctx.fill();
        })
        ctx.rect(this.x, this.y, scale, scale); 
        ctx.closePath(); 
    };

    this.up = function () {
        if (this.dy != 1) {
            this.dx = 0; 
            this.dy = -1; 
        }
    }

    this.down = function () {
        if (this.dy != -1) {
            this.dx = 0; 
            this.dy = 1; 
        }
    }

    this.left = function () {
        if (this.dx != 1) {
            this.dx = -1; 
            this.dy = 0; 
        }
    }

    this.right = function (){
        if (this.dx != -1) {
            this.dx = 1; 
            this.dy = 0;
        }
    }
}
