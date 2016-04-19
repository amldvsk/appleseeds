function Result(myCorrect, myX, myY, myPoints) {
		var points = myPoints;
		var correct = myCorrect;
		var x = myX;
		var y = myY;
		var xVel = 0;
		var yVel = -10;
		var img = setImg(correct);
		function setImg(correct) {
			if (correct) {
				switch (Math.floor(Math.random()*20)) {
				case 0:
					return correct_flower;
				case 1:
					return correct_mustache;
				case 2:
					return correct_hat;
				case 3:
					return correct_butterfly;
				case 4:
					return correct_happy;
				case 5:
					return correct_snowman;
				case 6:
					return correct_rabbit;
				default:
					return correct_plain;
				}
			} else {
				switch (Math.floor(Math.random()*10)) {

				case 0:
					return wrong_pipe;
				case 1:
					return wrong_worm;
				case 2:
					return wrong_potato;

				case 3:
					return wrong_spider;

				default:
					return wrong_plain;
				}

			}
		};
		this.setScore =function(newPoints)
		{
			points=newPoints;
		};
		this.getScore =function()
		{
			return points;
		};
		this.isCorrect =function()
		{
			return correct;
		};
		this.setCorrect = function (newCorrect)
		{
			correct=newCorrect;
		};
		this.setX=function (newX)
		{
			x=newX;
		};
		this.getX=function ()
		{
			return x;
		};
			this.setY=function (newY)
		{
			y=newY;
		};
		this.getY=function ()
		{
			return y;
		};
		this.move =function ()
		{
			x+=xVel;
			y+=yVel;
		};
		this.moveX = function ()
		{
			x+=xVel;
		};
		this.moveY = function ()
		{
			y+=yVel;
		};
		this.setXVel = function (newXVel)
		{
			xVel=newXVel;
		};
		this.getXVel = function ()
		{
			return xVel;
		};
		this.setYVel = function (newYVel)
		{
			yVel=newYVel;
		};
		this.getYVel = function ()
		{
			return yVel;
		};
		this.accelerate = function (xAcc, yAcc)
		{
			xVel+=xAcc;
			yVel+=yAcc;
		};
		this.accelerateX = function (xAcc)
		{
			xVel+=xAcc;
		};
		this.accelerateY = function (yAcc)
		{
			yVel+=yAcc;
		};
		this.getImage = function ()
		{
			return img;
		};
	}
