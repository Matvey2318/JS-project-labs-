'use strict';


class Figure{
    constructor(width, height){
        this.x = Math.random()*(width - 20)+10;
        this.y = Math.random()*(height - 20)+10;
        this.color = `rgb(${Math.random()*250},${Math.random()*250},${Math.random()*250})`;
    }
}

class Box extends Figure{
    constructor(width, height){
        super(width, height);
        this.width = Math.random()*50;
        this.height=Math.random()*25;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillRect(this.x, this.y,this.width ,this.height );
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

    }
    onclick(e){
        if (((e.x >= this.x) && (e.x <= this.x+this.width)) &&((e.y >= this.y) && (e.y <= this.y+this.height)) ){
            //console.log('clicked');
            //game.count=game.count+3;
            game.count++;
            //this.x=this.x +10;
            //this.y=this.y+5;
            this.color = `rgb(${255},${255},${255})`;
        }
    }
}


class Picture extends  Box{
    constructor(width,height){
        super(width,height);
        this.pic = new Image();
        this.pic.src=`img/${Math.round(Math.random()*5)+1}.png`;
    }
    draw(ctx){
        ctx.drawImage(this.pic, this.x,this.y, this.width,this.height)
    }
    onclick(e){
        if (((e.x >= this.x) && (e.x <= this.x+this.width)) &&((e.y >= this.y) && (e.y <= this.y+this.height)) ){
            //console.log('clicked');
            //game.count=game.count+3;
            game.count++;
            //this.width=this.width +10;
            //this.height=this.height+5;
            this.color = `rgb(${255},${255},${255})`;
        }
    }

}
class Ball extends Figure{
    constructor(width, height){
        super(width, height);
        this.radius = 10;
    }


    draw (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    onclick(e){
        if ((e.x - this.x)*(e.x - this.x)+(e.y - this.y)*(e.y - this.y)<=this.radius*this.radius){
            game.count++;
           // this.color = `rgb(${Math.random()*250},${Math.random()*250},${Math.random()*250})`;
            this.color = `rgb(${255},${255},${255})`;
        }
    }
};



let i = 0;
const game = {
    canvas: document.getElementById("arkanoid"),
    ctx: null,
    objects: [],
    numBalls: 10,
    numBoxes: 10,
    numPicture : 6,
    count: 0,
    time: 0,
    onclick: function (e) {
        for (let item of this.objects){
            item.onclick(e);
        }

    },

    init: function () {

        this.ctx = this.canvas.getContext("2d");
        this.setPixelRatio();
        for (let i = 0; i < this.numBalls; i++) {
            this.objects.push(new Ball(this.canvas.width, this.canvas.height))
        }
        for (let i = 0; i < this.numBoxes; i++) {
            this.objects.push(new Box(this.canvas.width, this.canvas.height))
        }
        for (let i = 0; i < this.numPicture; i++) {
            this.objects.push(new Picture(this.canvas.width, this.canvas.height))
        }
        this.time= Date.now();

    },
    run: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let item of this.objects) {
            item.draw(this.ctx);
        }
        this.score(this.ctx);
        if(Date.now()-this.time>12000){
           let res = confirm('Game Over!!!')
            if (res) {this.time = Date.now();
            this.count=0;}

        }
    },

    score: function (ctx) {
        /*this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 1000;
        this.canvas.height = 500;*/
        ctx.font = "18px Arial";
        ctx.fillStyle = "rgba(0, 111, 255, 0.99)";
        ctx.fillText("Score: " + this.count, 0, 20);
    },
    setPixelRatio(){
        let dpr = window.devicePixelRatio || 1;
        let rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(dpr, dpr);
    }
};

//game.score();
game.init();
setInterval(()=>game.run(), 10);
//game.reDraw();
document.addEventListener("click", (e)=>game.onclick(e), false);

