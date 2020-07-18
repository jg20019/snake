function Food(width, height, scale){
   this.placeFood = function () {
       let randint = function (max) {
            return Math.floor(Math.random() * Math.floor(max)); 
       };

       let x = Math.floor(width / scale); 
       let y = Math.floor(height / scale); 
        
       this.x = randint(x) * scale; 
       this.y = randint(y) * scale; 
   }

   this.draw = function(ctx) {
       ctx.beginPath();
       ctx.fillStyle = 'white';
       ctx.rect(this.x, this.y, scale, scale); 
       ctx.fill();
       ctx.closePath();
   }

   this.placeFood();
}
