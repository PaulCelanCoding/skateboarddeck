/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineWidth = .9;
ctx.globalCompositeOperation = "color-light";
class Root{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.speedX = Math.random()*4 - 2;
		this.speedY = Math.random()*5 - 2;
		this.maxSize = Math.random()*28 + 5;
		this.size = Math.random() * 1 + 5;
		this.vs = Math.random() * .5 + .05;
		this.va = Math.random() * .5 - .3;
		this.angleX = 0;
		this.vax = Math.random() * .75 - .3;
		this.angleY = 0;
		this.vay = Math.random() * .75 - .3;
		this.angle = 0;
		this.lightness = 50;
		this.hue = 120;
	}
	update(){
		this.x += this.speedX + Math.sin(this.angleX);
		this.y += this.speedY+ Math.cos(this.angleY);
		this.size += this.vs;
		this.angleX += this.vax;
		this.angleY += this.vay;

		if (this.lightness<90){this.lightness += Math.random()}
		if (this.hue < 125){this.hue += Math.random()*5}


		if (this.size < this.maxSize){
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
			ctx.fillStyle = 'hsl('+this.hue+', 35%,' + this.lightness + '%)'
			ctx.fill();
			ctx.stroke();
			requestAnimationFrame(this.update.bind(this))
		}
		else{
			if (Math.random() < .8){
				for (let i=0; i < Math.random()*5; i++){
					let flower = new Flower(this.x, this.y)
					flower.grow()
		
				}
	
			}
			else{
				for (let i=0; i < Math.random()*2; i++){

					let root = new Root(this.x, this.y)
					root.update()
				}
			}
		}

	}
}

class Flower{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.speedX = Math.random()*2 - 1;
		this.speedY = Math.random()*3 - 2;
		this.maxSize = Math.random()*5+2;
		this.size = Math.random() * 10;
		this.vs = Math.random() * .02 + .025;
		this.angleX = 0;
		this.vax = Math.random() * .15 - .3;
		this.angleY = 0;
		this.vay = Math.random() * .5 - .3;

		this.lightness = 25;
		this.hue = 60 * Math.random();

	}
	grow(){
		this.x += this.speedX+ Math.sin(this.angleX);;
		this.y += this.speedY+ Math.sin(this.angleY);;
		this.size += this.vs;
		this.angleX += this.vax;
		this.angleY += this.vay;
		this.lightness += Math.random() * .12

		if (this.size < this.maxSize){
			ctx.beginPath();
			ctx.arc(this.x, this.y, Math.random()*5*this.size, 0, Math.PI * 2)
			ctx.fillStyle = 'hsl('+this.hue+', 35%,' + this.lightness + '%)'
			ctx.fill();
			if (Math.random()<.5){
				ctx.stroke()
			}
			requestAnimationFrame(this.grow.bind(this))

		}
		else{
			for (let i=0; i < Math.random()*15; i++){
				let flower = new SecondFlower(this.x, this.y)
				flower.grow()
	
			}

		}

	}
}
class SecondFlower{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.speedX = Math.random()*2 - 1;
		this.speedY = Math.random()*3 - 2;
		this.maxSize = Math.random()*2.5;
		this.size = 0;
		this.vs = Math.random() * .02 + .025;
		this.angleX = 0;
		this.vax = Math.random() * .15 - .3;
		this.angleY = 0;
		this.vay = Math.random() * .5 - .3;

		this.lightness = 75 * Math.random();
		this.hue = 60 * Math.random();

	}
	grow(){
		this.x += this.speedX+ Math.sin(this.angleX);;
		this.y += this.speedY+ Math.sin(this.angleY);;
		this.size += this.vs;
		this.angleX += this.vax;
		this.angleY += this.vay;

		if (this.size < this.maxSize){
			ctx.beginPath();
			ctx.arc(this.x, this.y, 2*this.size, 0, Math.PI * 2)
			ctx.fill();
			ctx.stroke();
			requestAnimationFrame(this.grow.bind(this))
		}
		else{
			if (Math.random() <.2){
				for (let i = 0; i < Math.random()*5; i++){
					let flower = new SecondFlower(this.x, this.y)
					flower.grow()
			
				}
	
			}
	
		}

	}
}

drawing = false;

window.addEventListener('mousedown', function(){
	drawing = true;
});
window.addEventListener('mouseup', function(){
	drawing = false;
});


window.addEventListener('mousemove', function(e){
	if (drawing){
		for (let i = 0; i < 2; i++){
			const root = new Root(e.x, e.y);
			root.update();
	
		}
	
	}
});window.addEventListener('mousedown', function(e){
	if (drawing){
		for (let i = 0; i < Math.random(5)+3; i++){
			const root = new Root(e.x, e.y);
			root.update();
	
		}
	
	}
});