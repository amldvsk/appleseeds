function Firefly(x, y, pos) {
		var initialX = x;
		var initialY = y;
		var x = x;
		var y = y;
		var pos = pos;
		this.move = function() {
			x = initialX + (Math.cos(pos + Firefly.movement * (Math.PI / 180))) * (Math.sin(pos + Firefly.movement * (Math.PI / 45)) * 50);
			y = initialY + (Math.sin(pos + Firefly.movement * (Math.PI / 180))) * (Math.sin(pos + Firefly.movement * (Math.PI / 45)) * 50);
		};
		this.getX=function()
		{
			return x;
		};
		this.getY=function()
		{
			return y;
		};
		this.getPos=function()
		{
			return pos;
		};
	}
	Firefly.movement=0;
	Firefly.frames=[];
