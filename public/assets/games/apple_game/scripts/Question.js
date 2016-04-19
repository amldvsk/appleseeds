function Question(options, q, time, points)//a single question
{
	//the time required for the apples to each the ground. in seconds. ugh.
	var time = time;
	//the question itself
	var content = q;
	//amount of points that will be scored if the question is answered correctly
	var points = Math.floor(points);
	if (points < 1) {
		points = 1;
	}
	var answers = setStandardPosition(options);
	//the time it will take for the answers to start falling after the question is first presented. in millis.
	var delay = 0;
	switch(points) {
	case 10:
		delay = content.length * 50;
		break;
	case 9:
		delay = content.length * 30;
		break;
	case 8:
		delay = content.length * 20;
		break;
	default:
		delay = content.length * 10;
	}

	function setStandardPosition(options) {
		var tempAns = options;
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
			tempAns[rnd[i]].notPopped();
			// no answers where popped, cause this is only the initiation stage.
			tempAns[rnd[i]].setY(-200 - Math.floor(Math.random() * 100));
			tempAns[rnd[i]].setX((600 / amount) + i * (1000 / amount));
			tempAns[rnd[i]].setXVel(0);
			//set velocity such that the apples will reach the bottom when after [time]
			tempAns[rnd[i]].setYVel(screenHeight / (time * 1000) + (Math.random() * 0.02 * 10 / time));
		}
		return tempAns;
	};
	
	this.getContent = function ()
	{
		return content;
	};
		this.getTime = function ()
	{
		return time;
	};
		this.getDelay = function ()
	{
		return delay;
	};
		this.getScore = function ()
	{
		return points;
	};
		this.getAnswers = function ()
	{
		return answers;
	};
}