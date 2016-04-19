function ScoreEffect(myScore) {
		var score = myScore;
		var frame = 0;
		this.nextFrame = function() {
			frame++;
		};
		this.getOpacity = function() {
			return (255.0 - frame * 8) / 255;
		};
		this.getY = function() {
			return 625 - (frame * 2);
		};
		this.getScore = function (){
			return score;
		};
	}