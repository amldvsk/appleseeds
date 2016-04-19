function Answer(text, correct) {
	//whether or not the answer is correct
	var does = correct;
	//the content of the answer
	var content = text;
	//current frame for propeller animation
	var animFrame = Math.floor(Math.random() * 25);
	//x value of the apple
	var x = 0;
	//y value of the apple
	var y = 0;
	//the speed in which the apple moves horizontally.
	var xVel = 0;
	//the speed in which the apple moves vertically.
	var yVel = 0;
	//the image of the apple.
	var img = loadImg();
	//whether the apple was popped or not
	var popped = false;

	//load the image of the apple (choose from a pool of options)
	function loadImg() {
		var type = Math.floor(Math.random() * 1);
		//currently only one type of apples
		switch (type) {
		case 0:
			return apple;
			break;
		}
	};
	//returns the image of this apple
	this.getImg = function() {
		return img;
	};
	//deletes the current apple, returns whether the answer was correct
	this.pop = function() {
		popped = true;		
		return (does);
	};
	//returns current propeller spin frame
	this.getFrame = function() {
		return animFrame;
	};
	//sets current propeller spin frame
	this.setFrame = function(newFrame) {
		animFrame = newFrame;
	};
	//moves the propeller animation one frame forwards
	this.animate = function() {
		animFrame++;
		if (animFrame >= propeller.length)
			animFrame = 0;
	};
	//returns x value of apple
	this.getX = function() {
		return x;
	};
	//returns y value of apple
	this.getY = function() {
		return y;
	};
	//sets x value of apple to specified value
	this.setX = function(newX) {
		x = newX;
	};
	//sets y value of apple to specified value
	this.setY = function(newY) {
		y = newY;
	};
	//adds the yVel to y, and the xVel to x
	this.move = function(factor) {
		x += xVel*factor;
		y += yVel*factor;
	};
	//returns the velocity in which the apple travels horizontally.
	this.getXVel = function() {
		return xVel;
	};
	//returns the velocity in which the apple travels vertically.
	this.getYVel = function() {
		return yVel;
	};
	//sets the velocity in which the apple travels horizontally.
	this.setXVel = function(newXVel) {
		xVel = newXVel;
	};
	//sets the velocity in which the apple travels vertically.
	this.setYVel = function(newYVel) {
		yVel = newYVel;
	};
	//returns whether the apple was popped.
	this.isPopped = function() {
		return popped;
	};
	//makes popped false
	this.notPopped = function() {
		popped = false;
	};
	// returns the content (text) of the answer
	this.getContent = function() {
		return content;
	};
	//changes the content of the answer to the specified value.
	this.setContent = function(newContent) {
		content = newContent;
	};
	//returns whether the answer is correct.
	this.isCorrect = function() {
		return does;
	};
	//changes the correctness of the answer to the specified value
	this.setDoes = function(newDoes) {
		does = newDoes;
	};
}