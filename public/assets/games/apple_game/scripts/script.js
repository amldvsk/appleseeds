//variables
{
	//for operations
	var mx = 0;
	//mouse x value
	var my = 0;
	//my oh my!
	//mouse y value
	var camera = {
		x : 0,
		y : 0
	};
	var prevTime;
	var time;
	var openingMessage;
	//good morning
	var closingMessage;
	//good night
	var score;
	//the score. currently goes up by 10 for each right answer. penalty for wrong answer is -1.
	var scoreUp;
	//this is the effects that will show when the score goes up.
	var presentedScore;
	//at the end of the game, the score is presented starting from zero and slowly growing up.
	var pos;
	//question number. starts at -1.
	var falling;
	//when this is true, apples shall block out the sun. This variable is here because once a question appears, the apples should only start falling after a reading delay.
	var endGame;
	//has the last level been finished? if so, present ending screen
	var startGame;
	//ready player one. is true in the beginning, becomes false when the player presses the Play button, after the game has been loaded.
	var display_tutorial;
	//when true, if the game hasn't began, a tutorial will be shown.
	var tutorial_pos;
	//the height of the tutorial page as displayed.
	var alreadyPopped;
	//have the player already popped an apple this turn? if so, don't allow them to pop more!
	var rightAns;
	//was the last popped answer correct? this is used in order to have wrongly answered question return to the queue.
	var animation = 0;
	//this variable goes up by 1 time a frame is being processed (not painted!). use % to make animations have a lower framerate.
	var idleCam = 0;
	//this controls the idle camera movement - a sine wave
	var fireflyMovement = 0;
	//this controls the movement of the fireflies.
	var browser;
	//contains a number between 0 to current chrome version if the app was launched through chrome, contains -1 in any other case.
	var fogPos;
	//the fog in the background is moving. there is no need to make a class for it, I just paint two instances of the fog image, one after another. this variable stores the fog X position.

	//these are for the teacher
	var speedFactor;
	var sPressed;
	var numOfTries;
	var tPressed;
	var parallaxFactor;
}
//constants
{
	var screenWidth = 1200;
	var screenHeight = 705;
}
//arrays
{
	var fireflies;
	var cQuestions;
	//this array contains questions. It is initialized once, when the page is loaded, and remains constant throughout the game.
	var questions;
	//this array contains questions. each question consists of an arrays of possible answers, and the question itself
	var results;
	//this is an array of results, the little things that fall from your apples. only when a result hits the ground does the score counter adjust.
}
//setup canvas
{
	var canvas;
	var bufferCanvas;
	var ctx;
	var buffer;
	//for double buffering
	//paint on me!
}

//load all images
{
	var main_menu = loadImage("../assets/games/apple_game/images/main_menu.jpg");
	//the background to the main menu
	var ending_screen = loadImage("../assets/games/apple_game/images/ending_screen.jpg");
	//the background to the ending/score display screen
	var tutorial = loadImage("../assets/games/apple_game/images/tutorial.jpg");
	//the instructions to the game
	var flares_1 = loadImage("../assets/games/apple_game/images/lensflares_1.png");
	//Ready Flare One / Earnest Decline
	var flares_2 = loadImage("../assets/games/apple_game/images/lensflares_2.png");
	//that thing JJ Abrams eats for breakfast
	var flares_3 = loadImage("../assets/games/apple_game/images/lensflares_3.png");
	//the little light thingies on the camera
	var sky = loadImage("../assets/games/apple_game/images/sky.jpg");
	//the background ft. sun! yes, *The* sun.
	var grass1 = loadImage("../assets/games/apple_game/images/grass_1.png");
	//grass2 is greener
	var grass2 = loadImage("../assets/games/apple_game/images/grass_2.png");
	//grass1 is greener
	var apple = loadImage("../assets/games/apple_game/images/apple.png");
	//won't allow any doctors to approach.
	var tree = loadImage("../assets/games/apple_game/images/tree.png");
	//infested with clones of little jonathan.
	var treetop = loadImage("../assets/games/apple_game/images/tree_top.png");
	//dreams of becoming a very famous zameret
	var treefront = loadImage("../assets/games/apple_game/images/tree_front.png");
	//no puns for this one
	var fog = loadImage("../assets/games/apple_game/images/fog.png");
	// can go around the world in just 80 days. chooses to float around aimlessly instead.
	//Vs
	var correct_plain = loadImage("../assets/games/apple_game/images/correct/correct_plain.png");
	var correct_flower = loadImage("../assets/games/apple_game/images/correct/correct_flower.png");
	var correct_mustache = loadImage("../assets/games/apple_game/images/correct/correct_mustache.png");
	var correct_happy = loadImage("../assets/games/apple_game/images/correct/correct_happy.png");
	var correct_butterfly = loadImage("../assets/games/apple_game/images/correct/correct_butterfly.png");
	var correct_hat = loadImage("../assets/games/apple_game/images/correct/correct_hat.png");
	var correct_rabbit = loadImage("../assets/games/apple_game/images/correct/correct_rabbit.png");
	var correct_snowman = loadImage("../assets/games/apple_game/images/correct/correct_snowman.png");

	//evil Xs
	var wrong_plain = loadImage("../assets/games/apple_game/images/wrong/wrong_plain.png");
	var wrong_worm = loadImage("../assets/games/apple_game/images/wrong/wrong_worm.png");
	var wrong_pipe = loadImage("../assets/games/apple_game/images/wrong/wrong_pipe.png");
	var wrong_potato = loadImage("../assets/games/apple_game/images/wrong/wrong_potato.png");
	var wrong_spider = loadImage("../assets/games/apple_game/images/wrong/wrong_spider.png");
	//medals
	var bronze = loadImage("../assets/games/apple_game/images/bronze.png");
	var silver = loadImage("../assets/games/apple_game/images/silver.png");
	var gold = loadImage("../assets/games/apple_game/images/gold.png");
	//light behind medals
	var light_1 = loadImage("../assets/games/apple_game/images/light_1.png");
	var light_2 = loadImage("../assets/games/apple_game/images/light_2.png");
	var propeller = [];
	var firefly_frames = [];
}
//this function is called on load. It should take as input an object containing all relevant json data.
function fromServer(data) {
	//make the speed 1:1 what the guide intended. Happens here and not in setup cause we son't want it to be reinitialized on restart.
	speedFactor = 1;
	numOfTries = 0;
	parallaxFactor=true;
	console.log(data);
	//initialize opening message
	openingMessage = data.game_opening_statement;
	//initialize closing message
	closingMessage = data.game_ending_statement;
	//add questions here, oh mighty questioneer!
	cQuestions = [];
	//new Question (array of answers[new Answer(Answer, is this answer correct?)],the question itself, time for question, 10) this is the correct order! but if you look at the questions added in the lines below, the order of variables can probably seem different. This is because most IDEs don't know what to do with Hebrew.
	for (var i = 0; i < data.questions.length; i++) {
		//create Question objects;
		var buildAns = [];
		for (var j = 0; j < data.questions[i].answers.length; j++) {
			var ans = new Answer(data.questions[i].answers[j].answer, (data.questions[i].answers[j].right_answer == '1' ? true : false));
			buildAns.push(ans);
		}
		cQuestions.push(new Question(buildAns, data.questions[i].question, 4, 10));
	}
	setup();
}

function setup() {//setup or restart
	//load stuff
	//check browser. if it's chrome or firefox, the var browser will be bigger than -1. other wise it won't be.
	browser = Math.max(window.navigator.userAgent.indexOf("Chrome"), window.navigator.userAgent.indexOf("Firefox"));
	canvas = document.getElementById('mycanvas');
	bufferCanvas = document.getElementById('buffercanvas');
	//setup mouse listeners
	canvas.addEventListener("mousemove", getPosition, false);
	canvas.addEventListener("mousedown", mousePressed, false);
	canvas.addEventListener("mouseup", mouseReleased, false);
	//setup key listener
	document.onkeydown = keyPressed;
	document.onkeyup = keyReleased;
	canvas.width = screenWidth;
	canvas.height = screenHeight;
	bufferCanvas.width = screenWidth;
	bufferCanvas.height = screenHeight;
	bufferCanvas.style.visibility = 'hidden';
	//set context
	ctx = canvas.getContext('2d');
	buffer = bufferCanvas.getContext('2d');
	//set some properties of the context. This is done here for the sake of better cpu preformance. don't question this.
	buffer.strokeStyle = 'black';
	buffer.lineWidth = 3;
	//initiate propeller frames!
	for (var i = 0; i < 25; i++) {
		propeller.push(loadImage("../assets/games/apple_game/images/propeller/frame_" + (i + 1) + ".png"));
	}
	//initialize stuff
	endGame = false;
	startGame = true;
	display_tutorial = false;
	tutorial_pos = 0;
	//lists
	questions = [];
	results = [];
	//add questions to questions arrays
	for (var i = 0; i < cQuestions.length; i++) {
		questions.push(new Question(cQuestions[i].answers, cQuestions[i].question, cQuestions[i].time, cQuestions[i].points));
	}
	//initiate animation variable to 0;
	animation = 0;
	//fog starts to the left of the screen
	fogPos = 0;
	//initiate level pointer to -1
	pos = -1;
	//add fireflies
	addFireflies();
	//initiate score to 0
	score = 0;
	//initiate score up effect
	scoreUp = new scoreEffect(0, 255);
	//initiate presented score to 0 so that counting to the score will start from 0
	presentedScore = 0;
	falling = false;
	//initiate alreadyPopped to false. also, this statement.
	alreadyPopped = false;
	rightAns = false;
	//the shift key isn't pressed.
	sPressed = false;
	time = new Date().getTime();
}

function addFireflies() {
	for (var i = 0; i < 4; i++) {
		firefly_frames.push(loadImage("../assets/games/apple_game/images/firefly/frame_" + (i + 1) + ".png"));
	}
	firefly_frames.push(loadImage("../assets/games/apple_game/images/firefly/frame_3.png"));
	firefly_frames.push(loadImage("../assets/games/apple_game/images/firefly/frame_2.png"));
	fireflies = [];
	for (var i = 0; i < 6; i++) {
		fireflies.push(new Firefly(700 + Math.random() * 400, 200 + Math.random() * 300, 60 * i));
	}
}

function start() {
	startGame = false;
	pos++;
	startFalling();
}

function nextLevel() {//go to the next question
	falling = false;
	//don't race to the ground just yet
	if (!alreadyPopped || !rightAns) {//if you were wrong or too slow...
		questions.push(new Question(questions[pos].answers, questions[pos].question, questions[pos].time, 10 / ((10 / questions[pos].points) + 1)));
		//add a new question with the same properties, but with one less point, and only two thirds of delay time between question and answers.
		questions.splice(pos, 1);
		//remove unawanted info.
		pos--;
		//offset position because you removed some info from the array
	}
	//if not all questions were answered yet...
	if (pos < questions.length - 1) {
		alreadyPopped = false;
		//reset alreadyPopped to false: the player has yet to pop an apple this level.
		rightAns = false;
		pos++;
		//next question please
		startFalling();
		//ready, set...
	}
	//have the question pointer grow by one.
	else {
		endGame = true;
		numOfTries++;
		//if the pointer has reached the end of the questions list, please print a friendly message.
		console.log("ok. that will be all. have a great day and stuff.");
		//very friendly.
	}
}

//animation stuff, I'm not sure what they mean, but it works. shouldn't touch this.
window.requestAnimFrame = (function() {//The magic word is requestAnimFrame(please);
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
})();
(function animloop() {//go home, watch anime, dream of a world with really big swords, wake up, feel disappointed, try jumping off the roof, fail, go home.
	requestAnimFrame(animloop);
	if (canvas != null) {
		repaint(ctx, buffer);
	}
})();
//ok. safe to touch stuff after this point.
//painting methods ahead
function repaint(ctx, buffer)//draw stuff here!
{
	prevTime = time;
	time = new Date().getTime();
	//check time inorder to speed up physics according to framerate
	ctx.clearRect(0, 0, screenWidth, screenHeight);
	buffer.clearRect(0, 0, screenWidth, screenHeight);
	//if you want to paint, you better at least have some context!
	if (!startGame && (!endGame || results.length != 0)) {
		//draw background
		drawInParallax(buffer, sky, -50, -50, 0.02);
		//draw fog1
		drawInParallax(buffer, fog, fogPos, -50, 0.01);
		//draw fog2
		drawInParallax(buffer, fog, fogPos - 1366, -50, 0.01);
		//draw tree and ground
		drawInParallax(buffer, tree, -50, -40, -0.02);
		//draw front layer of tree
		drawInParallax(buffer, treefront, 400, -40, -0.023);
		//draw treetop
		drawInParallax(buffer, treetop, -50, -40, -0.03);
		//draw question
		buffer.font = "normal 36px Alef Hebrew";
		var question = [];
		//This is an arrays that includes each line of the question
		question = addLn(questions[pos].question, buffer, screenWidth);
		//One string comes in, chopped up to little pieces, and comes out neatly packaged. Learned this trick from the meat industry.
		for (var i = 0; i < question.length; i++)//draw questions, in parts
		{
			drawStrokedText(buffer, question[i], 600, 50 + (i * 36));
		}
		//draw fireflies
		for (var i = 0; i < fireflies.length; i++) {
			drawInParallax(buffer, firefly_frames[Math.floor(((fireflies[i].pos + fireflyMovement) / 3) % 6)], fireflies[i].x, fireflies[i].y, -0.04);
		}
		//draw apples/answers
		//set font color to black
		buffer.fillStyle = "rgb(0,0,0)";
		buffer.font = "normal 18px Alef Hebrew";
		buffer.textAlign = "center";
		for (var i = 0; i < questions[pos].answers.length; i++) {
			var curr = questions[pos].answers[i];
			if (!curr.popped) {
				drawInParallax(buffer, curr.img, curr.x, curr.y, 0);
				drawInParallax(buffer, propeller[Math.floor((curr.animFrame * Math.max(1, Math.min(questions[pos].time / 10, 2))) % propeller.length)], curr.x - 70, curr.y - 35, 0);
				var ans = [];
				ans = addLn(curr.content, buffer, 100);
				if (ans.length <= 2) {
					buffer.font = "normal 28px Alef Hebrew";
					ans = addLn(curr.content, buffer, 100);
					for (var j = 0; j < ans.length; j++)//draw answers, in parts
					{
						showText(buffer, ans[j], curr.x + 75, curr.y + 128 + j * 28 + (-ans.length * 28 / 2));
					}
					buffer.font = "normal 18px Alef Hebrew";
				} else {
					//separate text to different lines for more efficient printing.
					for (var j = 0; j < ans.length; j++)//draw answers, in parts
					{
						showText(buffer, ans[j], curr.x + 75, curr.y + 128 + j * 18 + (-ans.length * 18 / 2));
					}
				}
			}
		}
		//draw results
		for (var i = 0; i < results.length; i++) {
			var curr = results[i];
			drawInParallax(buffer, curr.img, curr.x, curr.y, 0);
		}
		//draw grass
		drawInParallaxPlus(buffer, grass1, -100, 500, -0.07, -0.05);
		//... aim... fire!
		drawInParallaxPlus(buffer, grass2, -100, 500, -0.09, -0.07);
		//draw flares
		drawInParallax(buffer, flares_1, -50, -50, -0.05);
		drawInParallax(buffer, flares_2, -50, -50, -0.07);
		drawInParallax(buffer, flares_3, -50, -50, -0.09);
		//draw score
		buffer.font = "normal 48px Alef Hebrew";
		drawStrokedText(buffer, score, 1125, 650);
		//draw score up effect
		if (scoreUp.getOpacity() > 0) {

			if (scoreUp.score == 10)
				buffer.fillStyle = "rgba(50,255,0," + scoreUp.getOpacity() + ")";
			else if (scoreUp.score < 4)
				buffer.fillStyle = "rgba(255,0,0," + scoreUp.getOpacity() + ")";
			else
				buffer.fillStyle = "rgba(0,0,0," + scoreUp.getOpacity() + ")";
			showText(buffer, "+" + scoreUp.score, 1125, scoreUp.getY());
		}
		ctx.drawImage(bufferCanvas, 0, 0);
		//ctx.fillText(Math.floor(1000 / (time - (prevTime || time))), 200, 200);
	} else if (startGame) {
		if (!display_tutorial) {
			ctx.drawImage(main_menu, 0, 0);
			ctx.textAlign = "center";
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.font = "normal 60px Alef Hebrew";
			message = addLn(openingMessage, buffer, 1000);
			//separate text to different lines for more efficient printing.
			for (var j = 0; j < message.length; j++)//draw answers, in parts
			{
				showText(ctx, message[j], 600, 100 + j * 60);
			}
		} else {
			ctx.scale(1200 / 904, 1200 / 904);
			ctx.drawImage(tutorial, 0, -2 - tutorial_pos);
			ctx.scale(904 / 1200, 904 / 1200);
		}
	} else if (endGame && results.length == 0) {
		ctx.drawImage(ending_screen, 0, 0);
		ctx.textAlign = "center";
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.font = "normal 60px Alef Hebrew";
		message = addLn(closingMessage, buffer, 1000);
		//separate text to different lines for more efficient printing.
		for (var j = 0; j < message.length; j++)//draw answers, in parts
		{
			showText(ctx, message[j], 600, 150 + j * 60);
		}
		showText(ctx, Math.floor(presentedScore), 600, 75);
		if (presentedScore >= 5 * cQuestions.length && presentedScore == score) {
			//back light, dim
			ctx.translate(585, 320);
			ctx.rotate(-animation * Math.PI / 180);
			ctx.drawImage(light_2, -200, -200);
			ctx.rotate(animation * Math.PI / 180);
			ctx.translate(-585, -320);
			//front light, bright
			ctx.translate(585, 320);
			ctx.rotate(animation * Math.PI / 180);
			ctx.drawImage(light_1, -185, -175);
			ctx.rotate(-animation * Math.PI / 180);
			ctx.translate(-585, -320);
		}
		if (presentedScore >= 10 * cQuestions.length)
			ctx.drawImage(gold, 440, 180);
		else if (presentedScore >= 20 / 3 * cQuestions.length)
			ctx.drawImage(silver, 440, 180);
		else if (presentedScore >= 10 / 3 * cQuestions.length)
			ctx.drawImage(bronze, 440, 180);
	}
	//if S is pressed, show Game Speed
	if (sPressed) {
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.font = "normal 60px Alef Hebrew";
		ctx.fillText(speedFactor, 50, 50);
	}
	//if T is pressed, show number of tries
	if (tPressed) {
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.font = "normal 60px Alef Hebrew";
		ctx.fillText(numOfTries, 50, 50);
	}
	//listen to the frame (actually, andle physics and do stuff)
	frameListener();
}

//painting related methods
{
	function drawInParallax(buffer, img, x, y, parallax) {//draws an image and moves it according to the camera location for a parallax effect
		var par = parallax * 0.9;
		if (!parallaxFactor)
		par=0;
		if (img.complete) {
			if (time - prevTime > 80)
				buffer.drawImage(img, Math.round(x + camera.x * par), Math.round(y + camera.y * par));
			else
				buffer.drawImage(img, x + camera.x * par, y + camera.y * par);
		}
	}

	function drawInParallaxPlus(buffer, img, x, y, parallaxX, parallaxY) {//draws an image and moves it according to the mouse location for a parallax effect using separate parallax for different axis
		var parX = parallaxX * 0.9;
		var parY = parallaxY * 0.9;
		if (!parallaxFactor)
		{
		parX=0;
		parY=0;
	}
		if (img.complete) {
			if (time - prevTime > 70)
				buffer.drawImage(img, Math.round(x + camera.x * parX), Math.round(y + camera.y * parY));
			else
				buffer.drawImage(img, x + camera.x * parX, y + camera.y * parY);
		}
	}

	function showText(ctx, text, x, y)//I use a manual function to print since I have to offset the x value in case the user uses IE.
	{
		if (browser != -1)
			ctx.fillText(text, Math.round(x), Math.round(y));
		else
			ctx.fillText(text, Math.round(x + ctx.measureText(text).width), Math.round(y));
	}

	function strokeText(ctx, text, x, y)//I use a manual function to stroke since I have to offset the x value in case the user uses IE.
	{
		if (browser != -1)
			ctx.strokeText(text, Math.round(x), Math.round(y));
		else
			ctx.strokeText(text, Math.round(x + ctx.measureText(text).width), Math.round(y));
	}

	function drawStrokedText(context, text, x, y)//draws white text with a 1px black border
	{
		context.fillStyle = "rgb(0,0,0)";
		if (time - prevTime > 110) {
			strokeText(context, text, x, y);
		} else {
			showText(context, text, x - 1, y - 1);
			//you know, it really is the context that fills the text with meaning. this was much more funny when I was actually using the built in fillText function...
			showText(context, text, x + 1, y - 1);
			//like, for e.g., how this these lines of code were first drafted on a desert island with the blood of crows, smeared across the walls of a crystal cave.
			showText(context, text, x - 1, y);
			//really gives you perspective.
			showText(context, text, x + 1, y);
			//like, right now, I'm looking at the same text from one pixel to the left, and it's like a whole different mood. Some G.R.R. Martin vibes there.
			showText(context, text, x - 1, y + 1);
			showText(context, text, x + 1, y + 1);
		}
		context.fillStyle = "rgb(255,220,150)";
		//the color of alien eye juice.
		showText(context, text, x, y);
		//call an ambulance! this text is having a stroke!
	};
	function addLn(text, ctx, maxWidth) {
		//this methods trims a text so that it fits a box with width [maxWidth], returning an arrawy with different lines.
		var lines = [];
		var length = ctx.measureText(text).width;
		var avgWidthPerLetter = (length / text.length);
		var avgLengthPerLine = maxWidth / avgWidthPerLetter;
		//average character length per line
		var copyOfText = text.substring(0);
		while (ctx.measureText(copyOfText).width > maxWidth) {
			var lastSpaceInRow = copyOfText.lastIndexOf(" ", avgLengthPerLine);
			lines.push(copyOfText.substring(0, lastSpaceInRow + 1));
			copyOfText = copyOfText.substring(lastSpaceInRow + 1);
		}
		lines.push(copyOfText);
		return lines;
	}

}
function frameListener()//change stuff here!
{
	var dt = time - (prevTime || time);
	if (!startGame && (!endGame || results.length != 0)) {
		//are all apples out of the screen borders?
		var outOfScreen = true;
		//key frame animation
		animation += dt / (1000 / 30);
		if (animation >= 1)
			animation = 0;
		if (scoreUp.getOpacity() > 0)
			scoreUp.nextFrame();
		if (falling)//only if the apples are already falling...
		{
			for (var i = 0; i < questions[pos].answers.length; i++) {//move answers
				questions[pos].answers[i].y += questions[pos].answers[i].yVel * dt * speedFactor;
				if (alreadyPopped)
					questions[pos].answers[i].yVel += 0.03;
				//accelerate answers if an answer was popped.
				else if (animation == 0)
					questions[pos].answers[i].animate();
				//animate propeller.

				if (questions[pos].answers[i].y < (canvas.height + 30) && !questions[pos].answers[i].popped)
					//if a non-popped answer is still on screen, don't proceed to next question
					outOfScreen = false;
			}
			if (outOfScreen && !endGame) {
				nextLevel();
			}
		}
		for (var i = 0; i < results.length; i++) {
			//accelerate results
			results[i].yVel += (dt / 25.0);
			//move results
			results[i].y += results[i].yVel;
			//if a result reaches the ground, make is vanish
			if (results[i].y > canvas.height) {
				if (results[i].correct) {
					score += results[i].points;
					scoreUp = new scoreEffect(results[i].points, 0);
				}
				results.splice(i, 1);
			}
		}
		//move fog
		fogPos += dt / (1000 / 30);
		//if the fog reaches the end of the screen, teleport it back to the start.
		if (fogPos >= 1366)
			fogPos = 0;
		//move fireflies
		fireflyMovement += 0.5 * dt / (1000 / 30);
		if (fireflyMovement > 360)
			fireflyMovement = 0;
		for (var i = 0; i < fireflies.length; i++) {
			fireflies[i].move();
		}
		//idle cam movement
		idleCam += dt / (1000 / 30);
		if (idleCam > 360)
			idleCam = 0;
		//move camera around
		camera.x = mx + (Math.cos(idleCam * (Math.PI / 180)) * 250);
		camera.y = my + (Math.abs(Math.sin(idleCam * (Math.PI / 180))) * 100);
	} else if (endGame && results.length == 0) {
		animation += 2 * dt / 30;
		if (animation > 360)
			animation = 0;
		if (presentedScore < score)
			//add to presented score.
			presentedScore += Math.max((Math.min(0.7 * cQuestions.length / 5, (Math.pow((score - presentedScore), 2) * 0.015))), 0.1);
		else
			presentedScore = score;
	} else if (startGame && display_tutorial) {
		if (my - (screenHeight / 2) > 200) {
			tutorial_pos += 30 * (my - 200 - (screenHeight / 2)) / (screenHeight / 2);
			if (tutorial_pos >= 880)
				tutorial_pos = 880;

		}
		if (my - (screenHeight / 2) < -200) {
			tutorial_pos += 30 * (my + 200 - (screenHeight / 2)) / (screenHeight / 2);
			if (tutorial_pos <= 0)
				tutorial_pos = 0;
		}
	}
}

function startFalling()//call this method when switching between questions, in nextLevel(). after [delay], the apples will start falling.
{
	setTimeout(function() {
		falling = true;
	}, questions[pos].delay);
}

function loadImage(src) {
	var temp = new Image;
	temp.src = src;
	return temp;
}

//Mouse and Keys
function getPosition(evt) {
	var rect = canvas.getBoundingClientRect();
	mx = Math.round((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width);
	//self explanatory
	my = Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);
}

function mousePressed()//if the player attempts to pop an apple which is below y= 600 pixels, make it pop on mouse press, don't wait for release.
{
	if (!startGame && !endGame && !alreadyPopped && my > 600) {//if the game is on (sigh), and no answer was clicked yet for this question, and mouseY>600
		for (var i = 0; i < questions[pos].answers.length; i++) {//go through all the answers
			var curr = questions[pos].answers[i];
			if (!curr.popped)
				if ((mx > curr.x) && (mx < (curr.x + 150)) && (my > curr.y) && (my < (curr.y + 180))) {//and if the click occurred inside the hitbox of one of the apples
					curr.pop();
					//then pop the hell out of it!!!
					for (var j = 0; j < questions[pos].answers.length; j++) {
						if (!questions[pos].answers[j].popped)
							questions[pos].answers[j].yVel = 0.5;
						//also, make the other apples fall faster, since their propellers just lost the will to spin.
					}
					break;
				}
		}
	}
}

function mouseReleased() {
	//if on main menu screen=
	if (startGame) {
		if (!display_tutorial) {
			if (mx > 831 && mx < 1050 && my > 437 & my < 633)
				start();
			if (mx > 210 && mx < 350 && my > 440 & my < 645)
				display_tutorial = true;
		} else {
			if (mx > 450 && mx < 750 && my + tutorial_pos > 1525 && my + tutorial_pos < 1580) {
				display_tutorial = false;
				tutorial_pos = 0;
			}
		}
	} else if (endGame && results.length == 0) {
		if (mx > 500 && mx < 700 && my > 500 & my < 680)
			setup();
	}
	//if ingame
	else if (!alreadyPopped) {//if no answer was clicked yet
		for (var i = 0; i < questions[pos].answers.length; i++) {//go through all the answers
			var curr = questions[pos].answers[i];
			if (!curr.popped)
				if ((mx > curr.x) && (mx < (curr.x + 150)) && (my > curr.y) && (my < (curr.y + 180))) {//and if the click occurred inside the hitbox of one of the apples
					curr.pop();
					//then pop the hell out of it!!!
					for (var j = 0; j < questions[pos].answers.length; j++) {
						if (!questions[pos].answers[j].popped)
							questions[pos].answers[j].yVel = 0.5;
						//also, make the other apples fall faster, since their propellers just lost the will to spin.
					}
					break;
				}
		}
	}

}

function keyPressed(e) {

	e = e || window.event;
	if (e.keyCode == '83') {
		// S
		sPressed = true;
	}
	if (e.keyCode == '84') {
		// T
		tPressed = true;
	}
	if (e.keyCode == '53') {
		// 5
		if (sPressed) {
			speedFactor = Math.max(0.25, speedFactor - 0.25);
		}
	}
	if (e.keyCode == '54') {
		// 6
		if (sPressed) {
			speedFactor = Math.min(2, speedFactor + 0.25);
		}
	}
}

function keyReleased(e) {

	e = e || window.event;

	if (e.keyCode == '83') {
		// S
		sPressed = false;
	}
	if (e.keyCode == '84') {
		// T
		tPressed = false;
	}
	if (e.keyCode == '80') {
		// P
		parallaxFactor= !parallaxFactor;
	}
}

//classes ahoy!
{
	function Answer(content, correct) {
		this.does = correct;
		//me if I'm wrong.
		this.content = content;
		//the meat of the answer. Vegan friendly meat.
		this.animFrame = Math.floor(Math.random() * 25);
		//this is the current frame for the propeller animation.
		this.x = 0;
		this.y = 0;
		this.xVel = 0;
		//Vel stands for velocity. duh.
		this.yVel = 0;
		this.img = getImg();
		this.popped = false;
		//was this apple popped? you can pop an apple by clicking on it!
		function getImg() {//sets an image at random. only there is only one image to choose from. not very random...
			var type = Math.floor(Math.random() * 1);
			//currently only one type of apples
			switch (type) {
			case 0:
				return apple;
				break;
			}
		};
		this.pop = function() {
			this.popped = true;
			results.push(new Result(this.does, this.x, this.y, questions[pos].points));
			alreadyPopped = true;
			rightAns = this.does;
		};
		this.animate = function() {
			this.animFrame++;
			if (this.animFrame >= propeller.length)
				this.animFrame = 0;
		};
	}

	function Question(options, q, time, points)//a single question
	{
		this.time = time;
		//the time required for the apples to each the ground. in seconds. ugh.
		this.question = q;
		//the question itself
		this.points = Math.floor(points);
		if (this.points < 1) {
			this.points = 1;
		}
		var tempAns = options;
		//this is here just for initiation purposes. mostly 42.
		setStandardPosition();
		//set the position of each apple.
		function setStandardPosition() {
			var amount = tempAns.length;
			var rnd = [];
			//scramble answers position
			for (var i = 0; i < amount; i++) {
				rnd.push(-1);
			}
			for (var i = 0; i < amount; i++) {
				var does = false;
				while (!does) {
					var pos = Math.floor(Math.random() * amount);
					if (rnd[pos] == -1) {
						rnd[pos] = i;
						does = true;
					}
				}
			}
			for (var i = 0; i < amount; i++) {
				tempAns[rnd[i]].popped = false;
				// no answers where popped, cause this is only the initiation stage. note that without this line, all the answers would show up for the first time, but if the same questions comes up twice cause you where wrong, the answers that are already popped won't show up.
				tempAns[rnd[i]].y = -200 - Math.floor(Math.random() * 100);
				tempAns[rnd[i]].x = (600 / amount) + i * (1000 / amount);
				tempAns[rnd[i]].xVel = 0;
				tempAns[rnd[i]].yVel = screenHeight / (time * 1000) + (Math.random() * 0.02 * 10 / time);
				//set velocity such that the apples will reach the bottom when after [time]
			}
		};
		this.answers = tempAns;
		tempAns = [];
		switch(this.points) {
		case 10:
			this.delay = this.question.length * 50;
			break;
		case 9:
			this.delay = this.question.length * 30;
			break;
		case 8:
			this.delay = this.question.length * 20;
			break;
		default:
			this.delay = this.question.length * 10;

		}
		//the time it will take for the answers to start falling after the question is first presented. in millis.
	}

	function Result(correct, x, y, points) {
		this.points = points;
		this.correct = correct;
		this.x = x;
		// the x = x looks like a dead person's face. that's because it is. A person dies each time this game is loaded, and their face is stripped off their skull, and used for the duration of the code for multiple processes.
		this.y = y;
		// ahh, y = y, the tearful eyes of a child mourning their parent, whose face mysteriously vanished.
		this.xVel = 0;
		this.yVel = -10;
		this.img = getImg(this.correct);
		function getImg(correct) {
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
	}

	function scoreEffect(score, frame) {
		this.score = score;
		this.frame = frame;
		this.nextFrame = function() {
			this.frame++;
		};
		this.getOpacity = function() {

			return (255.0 - this.frame * 8) / 255;
		};
		this.getY = function() {
			return 625 - (this.frame * 2);
		};
	}

	function Firefly(x, y, pos) {
		this.initialX = x;
		this.initialY = y;
		this.x = x;
		this.y = y;
		this.pos = pos;
		this.move = function() {
			this.x = this.initialX + (Math.cos(this.pos + fireflyMovement * (Math.PI / 180))) * (Math.sin(this.pos + fireflyMovement * (Math.PI / 45)) * 50);
			this.y = this.initialY + (Math.sin(this.pos + fireflyMovement * (Math.PI / 180))) * (Math.sin(this.pos + fireflyMovement * (Math.PI / 45)) * 50);
		};
	}

}