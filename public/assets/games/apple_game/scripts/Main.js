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
	//cursor
	var cursor = loadImage("../assets/games/apple_game/images/cursor.png");
	var propeller = [];
}
//this function is called on load. It should take as input an object containing all relevant json data.
function fromServer(data) {
	//make the speed 1:1 what the guide intended. Happens here and not in setup cause we son't want it to be reinitialized on restart.
	speedFactor = 1;
	numOfTries = 0;
	parallaxFactor = true;
	//console.log(data);
	//initialize opening message
	openingMessage = data.game_opening_statement;
	//initialize closing message
	closingMessage = data.game_ending_statement;
	cQuestions = [];
	for (var i = 0; i < data.questions.length; i++) {
		//create Question objects;
		var buildAns = [];
		for (var j = 0; j < data.questions[i].answers.length; j++) {
			var ans = new Answer(data.questions[i].answers[j].answer, (data.questions[i].answers[j].right_answer == '1' ? true : false));
			buildAns.push(ans);
		}
		cQuestions.push(new Question(buildAns, data.questions[i].question, getDifficulty(data.difficulty_level), 10));
	}
	setup();
}

function getDifficulty(val) {
	switch (val) {
	case 1:
		return 3;
	case 2:
		return 6;
	case 3:
		return 10;
	case 4:
		return 15;
	case 5:
		return 20;
	default:
		return 10;
	}
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
	canvas.addEventListener("dblclick", dblClick, false);
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
		questions.push(new Question(cQuestions[i].getAnswers(), cQuestions[i].getContent(), cQuestions[i].getTime(), cQuestions[i].getScore()));
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
	scoreUp = undefined;
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
		Firefly.frames.push(loadImage("../assets/games/apple_game/images/firefly/frame_" + (i + 1) + ".png"));
	}
	Firefly.frames.push(loadImage("../assets/games/apple_game/images/firefly/frame_3.png"));
	Firefly.frames.push(loadImage("../assets/games/apple_game/images/firefly/frame_2.png"));
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

function nextLevel() {
	//go to the next question
	falling = false;
	//if you were wrong or too slow...
	if (!alreadyPopped || !rightAns) {
		questions.push(new Question(questions[pos].getAnswers(), questions[pos].getContent(), questions[pos].getTime(), 10 / ((10 / questions[pos].getScore()) + 1)));
		//add a new question with the same properties, but with one less point, and only two thirds of delay time between question and answers.
		questions.splice(pos, 1);
		pos--;
	}
	//if not all questions were answered yet...
	if (pos < questions.length - 1) {
		alreadyPopped = false;
		//reset alreadyPopped to false: the player has yet to pop an apple this level.
		rightAns = false;
		pos++;
		//next question please
		startFalling();
	} else {
		endGame = true;
		numOfTries++;
	}
}

//animation stuff, I'm not sure what they mean, but it works. shouldn't touch this.
window.requestAnimFrame = (function() {//The magic word is requestAnimFrame(please);
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
})();
(function animloop() {
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
	//if you want to paint, you better at least have some context!
	if (Math.random < 0.01)
		ctx.fillRect(0, 0, screenWidth, screenHeight);
	if (!startGame && (!endGame || results.length != 0)) {
		//draw background
		drawInParallax(ctx, sky, -50, -50, 0.02);
		//draw fog1
		drawInParallax(ctx, fog, fogPos, -50, 0.01);
		//draw fog2
		drawInParallax(ctx, fog, fogPos - 1366, -50, 0.01);
		//draw tree and ground
		drawInParallax(ctx, tree, -50, -40, -0.02);
		//draw front layer of tree
		drawInParallax(ctx, treefront, 400, -40, -0.023);
		//draw treetop
		drawInParallax(ctx, treetop, -50, -40, -0.03);
		//draw question
		ctx.font = "normal 36px Alef Hebrew";
		var question = [];
		//This is an arrays that includes each line of the question
		question = addLn(questions[pos].getContent(), ctx, screenWidth);
		//One string comes in, chopped up to little pieces, and comes out neatly packaged. Learned this trick from the meat industry.
		for (var i = 0; i < question.length; i++)//draw questions, in parts
		{
			drawStrokedText(ctx, question[i], 600, 50 + (i * 36));
		}
		//draw fireflies
		for (var i = 0; i < fireflies.length; i++) {
			drawInParallax(ctx, Firefly.frames[Math.floor(((fireflies[i].getPos() + Firefly.movement) / 3) % 6)], fireflies[i].getX(), fireflies[i].getY(), -0.04);
		}
		//draw apples/answers
		//set font color to black
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.font = "normal 18px Alef Hebrew";
		ctx.textAlign = "center";
		for (var i = 0; i < questions[pos].getAnswers().length; i++) {
			var curr = questions[pos].getAnswers()[i];
			if (!curr.isPopped()) {
				drawInParallax(ctx, curr.getImg(), curr.getX(), curr.getY(), 0);
				drawInParallax(ctx, propeller[Math.floor((curr.getFrame() * Math.max(1, Math.min(questions[pos].getTime() / 10, 2))) % propeller.length)], curr.getX() - 70, curr.getY() - 35, 0);
				var ans = [];
				ans = addLn(curr.getContent(), ctx, 100);
				if (ans.length <= 2) {
					ctx.font = "normal 28px Alef Hebrew";
					ans = addLn(curr.getContent(), ctx, 100);
					for (var j = 0; j < ans.length; j++)//draw answers, in parts
					{
						showText(ctx, ans[j], curr.getX() + 75, curr.getY() + 138 + j * 28 + (-ans.length * 28 / 2));
					}
					ctx.font = "normal 18px Alef Hebrew";
				} else {
					//separate text to different lines for more efficient printing.
					for (var j = 0; j < ans.length; j++)//draw answers, in parts
					{
						showText(ctx, ans[j], curr.getX() + 75, curr.getY() + 128 + j * 18 + (-ans.length * 18 / 2));
					}
				}
			}
		}
		//draw results
		for (var i = 0; i < results.length; i++) {
			var curr = results[i];
			drawInParallax(ctx, curr.getImage(), curr.getX(), curr.getY(), 0);
		}
		//draw grass
		drawInParallaxPlus(ctx, grass1, -100, 500, -0.07, -0.05);
		drawInParallaxPlus(ctx, grass2, -100, 500, -0.09, -0.07);
		//draw flares
		drawInParallax(ctx, flares_1, -50, -50, -0.05);
		drawInParallax(ctx, flares_2, -50, -50, -0.07);
		drawInParallax(ctx, flares_3, -50, -50, -0.09);
		//draw score
		ctx.font = "normal 48px Alef Hebrew";
		drawStrokedText(ctx, score, 1125, 650);
		//draw score up effect
		if (scoreUp != undefined) {
			if (scoreUp.getOpacity() > 0) {
				if (scoreUp.getScore() == 10)
					ctx.fillStyle = "rgba(50,255,0," + scoreUp.getOpacity() + ")";
				else if (scoreUp.getScore() < 4)
					ctx.fillStyle = "rgba(255,0,0," + scoreUp.getOpacity() + ")";
				else
					ctx.fillStyle = "rgba(0,0,0," + scoreUp.getOpacity() + ")";
				showText(ctx, "+" + scoreUp.getScore(), 1125, scoreUp.getY());
			}
		}
		//ctx.fillText(Math.floor(1000 / (time - (prevTime || time))), 200, 200);
	} else if (startGame) {
		if (!display_tutorial) {
			ctx.drawImage(main_menu, 0, 0);
			ctx.textAlign = "center";
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.font = "normal 60px Alef Hebrew";
			message = addLn(openingMessage, ctx, 1000);
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
		showText(ctx, Math.floor(presentedScore), screenWidth / 2, 100);
		if (presentedScore >= 5 * cQuestions.length && presentedScore == score) {
			//back light, dim
			ctx.translate(605, 320);
			ctx.rotate(-animation * Math.PI / 180);
			ctx.drawImage(light_2, -200, -200);
			ctx.rotate(animation * Math.PI / 180);
			ctx.translate(-605, -320);
			//front light, bright
			ctx.translate(605, 320);
			ctx.rotate(animation * Math.PI / 180);
			ctx.drawImage(light_1, -185, -175);
			ctx.rotate(-animation * Math.PI / 180);
			ctx.translate(-605, -320);
		}
		if (presentedScore >= 10 * cQuestions.length)
			ctx.drawImage(gold, 460, 180);
		else if (presentedScore >= 20 / 3 * cQuestions.length)
			ctx.drawImage(silver, 460, 180);
		else if (presentedScore >= 10 / 3 * cQuestions.length)
			ctx.drawImage(bronze, 460, 180);
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
	ctx.drawImage(cursor, mx, my);
	//listen to the frame (actually, handle physics and do stuff)
	frameListener();
}

//painting related methods
{
	//draws an image and moves it according to the camera location for a parallax effect
	function drawInParallax(buffer, img, x, y, parallax) {
		var par = parallax * 0.9;
		if (!parallaxFactor)
			par = 0;
		if (img.complete) {
			if (time - prevTime > 80)
				buffer.drawImage(img, 0, 0, img.width, img.height, Math.round(x + camera.x * par), Math.round(y + camera.y * par), img.width, img.height);
			else
				buffer.drawImage(img, 0, 0, img.width, img.height, x + camera.x * par, y + camera.y * par, img.width, img.height);
		}
	}

	//draws an image and moves it according to the mouse location for a parallax effect using separate parallax for different axis
	function drawInParallaxPlus(buffer, img, x, y, parallaxX, parallaxY) {
		var parX = parallaxX * 0.9;
		var parY = parallaxY * 0.9;
		if (!parallaxFactor) {
			parX = 0;
			parY = 0;
		}
		if (img.complete) {
			if (time - prevTime > 70)
				buffer.drawImage(img, Math.round(x + camera.x * parX), Math.round(y + camera.y * parY));
			else
				buffer.drawImage(img, x + camera.x * parX, y + camera.y * parY);
		}
	}

	//I use a manual function to print since I have to offset the x value in case the user uses IE.
	function showText(ctx, text, x, y) {
		if (browser != -1)
			ctx.fillText(text, Math.round(x), Math.round(y));
		else
			ctx.fillText(text, Math.round(x + ctx.measureText(text).width), Math.round(y));
	}

	//I use a manual function to stroke since I have to offset the x value in case the user uses IE.
	function strokeText(ctx, text, x, y) {
		if (browser != -1)
			ctx.strokeText(text, Math.round(x), Math.round(y));
		else
			ctx.strokeText(text, Math.round(x + ctx.measureText(text).width), Math.round(y));
	}

	//draws white text with a 1px black border
	function drawStrokedText(context, text, x, y) {
		context.fillStyle = "rgb(0,0,0)";
		if (time - prevTime > 110) {
			strokeText(context, text, x, y);
		} else {
			showText(context, text, x - 1, y - 1);
			showText(context, text, x + 1, y - 1);
			showText(context, text, x - 1, y);
			showText(context, text, x + 1, y);
			showText(context, text, x - 1, y + 1);
			showText(context, text, x + 1, y + 1);
		}
		context.fillStyle = "rgb(255,220,150)";
		showText(context, text, x, y);
	};
	function addLn(text, ctx, maxWidth) {
		//this methods trims a text so that it fits a box with width [maxWidth], returning an array with different lines.
		var lines = [];
		var length = ctx.measureText(text).width;
		var avgWidthPerLetter = (length / text.length);
		var avgLengthPerLine = maxWidth / avgWidthPerLetter;
		//average character length per line
		var copyOfText = text.substring(0);
		while (ctx.measureText(copyOfText).width > maxWidth && copyOfText.indexOf(" ") != -1) {
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
		if (scoreUp != undefined)
			if (scoreUp.getOpacity() > 0)
				scoreUp.nextFrame();
		if (falling)//only if the apples are already falling...
		{
			for (var i = 0; i < questions[pos].getAnswers().length; i++) {//move answers
				questions[pos].getAnswers()[i].move(dt * speedFactor);
				//accelerate answers if an answer was popped.
				if (alreadyPopped)
					questions[pos].getAnswers()[i].setYVel(questions[pos].getAnswers()[i].getYVel() + 0.03 * dt / (1000 / 30));
				//animate propeller.
				else if (animation == 0)
					questions[pos].getAnswers()[i].animate();

				if (questions[pos].getAnswers()[i].getY() < (canvas.height + 30) && !questions[pos].getAnswers()[i].isPopped())
					//if a non-popped answer is still on screen, don't proceed to next question
					outOfScreen = false;
			}
			if (outOfScreen && !endGame) {
				nextLevel();
			}
		}
		for (var i = 0; i < results.length; i++) {
			//accelerate results
			results[i].accelerateY(dt / 25.0);
			//move results
			results[i].move();
			//if a result reaches the ground, make is vanish
			if (results[i].getY() > canvas.height) {
				if (results[i].isCorrect()) {
					score += results[i].getScore();
					scoreUp = new ScoreEffect(results[i].getScore());
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
		Firefly.movement += 0.5 * dt / (1000 / 30);
		if (Firefly.movement > 360)
			Firefly.movement = 0;
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

function pop(ans) {
	results.push(new Result(ans.pop(), ans.getX(), ans.getY(), questions[pos].getScore()));
	alreadyPopped = true;
	rightAns = ans.isCorrect();
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
	if (!startGame && !endGame && !alreadyPopped && my > 600) {
		for (var i = 0; i < questions[pos].getAnswers().length; i++) {//go through all the answers
			var curr = questions[pos].getAnswers()[i];
			if (!curr.isPopped())
				if ((mx > curr.getX()) && (mx < (curr.getX() + 150)) && (my > curr.getY()) && (my < (curr.getY() + 180))) {
					//pop an answer if it's hitbox was clicked
					pop(curr);
					//and make the other answers faster
					for (var j = 0; j < questions[pos].getAnswers().length; j++) {
						if (!questions[pos].getAnswers()[j].isPopped())
							questions[pos].getAnswers()[j].setYVel(0.5);
					}
					break;
				}
		}
	}
}

function mouseReleased() {
	if (!Fullscreen.wasCancelled)
		Fullscreen.requestIn();

	//if on main menu screen=
	if (startGame) {
		if (!display_tutorial) {
			if (mx > 660 && mx < 870 && my > 310 & my < 475) {
				start();
			}
			if (mx > 390 && mx < 600 && my > 305 & my < 470)
				display_tutorial = true;
		} else {
			if (mx > 450 && mx < 750 && my + tutorial_pos > 1525 && my + tutorial_pos < 1580) {
				display_tutorial = false;
				tutorial_pos = 0;
			}
		}
	} else if (endGame && results.length == 0) {
		if (mx > 550 && mx < 700 && my > 500 & my < 620) {
			setup();
			start();
		}
	}
	//if ingame
	else if (!alreadyPopped) {//if no answer was clicked yet
		for (var i = 0; i < questions[pos].getAnswers().length; i++) {
			var curr = questions[pos].getAnswers()[i];
			if (!curr.popped)
				if ((mx > curr.getX()) && (mx < (curr.getX() + 150)) && (my > curr.getY()) && (my < (curr.getY() + 180))) {
					pop(curr);
					for (var j = 0; j < questions[pos].getAnswers().length; j++) {
						if (!questions[pos].getAnswers()[j].isPopped())
							questions[pos].getAnswers()[j].setYVel(0.5);
					}
					break;
				}
		}
	}
}
function dblClick ()
{
	Fullscreen.requestIn();
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
		parallaxFactor = !parallaxFactor;
	}
	if (e.keyCode == '27') {
		// esc
		Fullscreen.requestOut();
	}
}
