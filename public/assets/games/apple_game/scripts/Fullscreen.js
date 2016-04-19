function Fullscreen()
{
Fullscreen.wasCancelled= false;
}
Fullscreen.requestIn = function ()
{
	if (canvas.requestFullscreen) {
		canvas.requestFullscreen();
	} else if (canvas.msRequestFullscreen) {
		canvas.msRequestFullscreen();
	} else if (canvas.mozRequestFullScreen) {
		canvas.mozRequestFullScreen();
	} else if (canvas.webkitRequestFullscreen) {
		canvas.webkitRequestFullscreen();
	}

};
Fullscreen.requestOut=function ()
{
	Fullscreen.wasCancelled= true;
 if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};
