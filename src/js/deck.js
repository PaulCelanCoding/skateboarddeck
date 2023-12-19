const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
canvas.width = 900;
canvas.height = 400;	
//ctx.globalCompositeOperation = "lighter";
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';

class Effect {
	constructor(canvas){
		this.canvas = canvas;
		this.radius = 20;
		this.vr = 0.1;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.x = -this.radius;
		this.y = this.height * 0.2;
		this.angle = 0;
		this.va = 0.04;

		this.curve = this.height * 0.2;

		this.maxCurve = this.height * 0.3;
		this.minCurve = 10;
		this.curveSpeed = 0.8;

		this.hue = Math.floor(Math.random() * 360);
		this.color1 = 'hsl(' + this.hue + ',100%, 45%)';
		this.color2 = 'hsl(' + this.hue + ',100%, 55%)';
		this.TWO_PI = Math.PI * 2;
		//this.timer = 0;
		//this.interval = 20;
		this.spacing = 1;
		this.transform = 0.2;
		this.imageData = 0;
	}
	render(context){
		if (this.x < this.width + this.radius){
				this.timer = 0;
				context.save()
				context.transform(this.transform, 0, 0, 1, this.x, this.y);
				this.transform += Math.sin(this.angle) * 0.01;

				context.beginPath();
				context.fillStyle = this.color1;
                if (Math.random() < .25){
                    context.arc(0 + Math.sin(this.angle * 2) * -50, 0 + Math.sin(this.angle * 2) * 10, this.radius * 0.5, 0, this.TWO_PI);

                }
                else{

                    context.arc(0 - Math.cos(this.angle * 2) * -50, 0 + Math.cos(this.angle * 2) * 10, this.radius * 0.5, 0, this.TWO_PI);

                }

				//context.arc(0 + Math.sin(this.angle * 2) * -50, 0 + Math.sin(this.angle * 2) * 10, this.radius * 0.5, 0, this.TWO_PI);
				//context.fill();

				context.fillStyle = this.color2;
				//context.beginPath();

                if (Math.random() < .5){
                    context.arc(0 + Math.sin(this.angle) * this.curve , 0 + Math.sin(this.angle * -2) * this.curve/2 - this.height * 0.1, this.radius * 0.2, 0, this.TWO_PI);
                }
                else{
                    context.arc(0 - Math.cos(this.angle) * this.curve , 0 - Math.cos(this.angle * -2) * this.curve/2 - this.height * 0.1, this.radius * 0.2, 0, this.TWO_PI);

                }

				context.fill();

				context.fillStyle = 'white';
				context.beginPath();

                if (Math.random() < .85){
                    context.arc(0 + Math.sin(this.angle) * this.curve/2 , 0 + Math.cos(this.angle * -2) * this.curve + this.height * 0.1, this.radius * 0.1, 0, this.TWO_PI);
                }
                else{
                    context.arc(0 - Math.tan(this.angle) * this.curve/2 , 0 + Math.cos(this.angle * -2) * this.curve + this.height * 0.1, this.radius * 0.1, 0, this.TWO_PI);

                }

				
				context.fill();

				context.strokeStyle = 'hsl(' + this.hue + ',50%, 30%)';
				context.shadowOffsetX = 5*Math.random();
				context.shadowOffsetY = 5*Math.random();
				context.shadowColor = 'black';

                
				context.lineWidth = Math.random()*.5;
				context.beginPath();
				context.arc(0, 0, this.radius, 0, this.TWO_PI);
				context.stroke();

				context.lineWidth = Math.random()*.5;
				context.beginPath();
				context.arc(0 + 10, 0, this.radius * 1.2, 0, this.TWO_PI);
				context.stroke();
				context.restore();

                this.curveSpeed += Math.random() * 0.25 
                if (Math.random() < .25){
                    this.curveSpeed -= Math.random() * 2.5 
                }

				if (this.curve < this.minCurve || this.curve > this.maxCurve) {
					this.curveSpeed *= -1;
					if (this.curveSpeed > 0.01) this.curveSpeed *= Math.random() * 0.2 + 0.9;
				}
				this.curve += this.curveSpeed;
				
				this.y = this.height * 0.5 + Math.sin(this.angle * this.curve);

				this.radius += Math.sin(this.angle);
				this.y = this.height * 0.5 + Math.sin(this.angle) * this.curve;
				this.angle += this.va;

				this.hue+=0.5* Math.random();

				
				if (this.x > this.width * 0.8) {
					this.imageData = context.getImageData(0, 0, this.width, this.height);
					//context.translate(-this.spacing * 0.5, 0);
					context.clearRect(0, 0, this.width, this.height);
					context.putImageData(this.imageData, -this.spacing, 0);
				} else {
					this.x+=this.spacing;
				}
		}
	}
}

const effect = new Effect(canvas);


//let lastTime = 0;
function animate(timeStamp){
	//const deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;
	effect.render(ctx);
	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);