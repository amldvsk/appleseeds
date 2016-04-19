<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>a game about apples</title>
		<link href="{{ asset('assets/games/apple_game/css/stylesheet.css') }}" rel="stylesheet">
		<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
		<meta content="utf-8" http-equiv="encoding">
	</head>
	<body onLoad ="fromServer({{ $game  }})">

		<canvas id="mycanvas" lang="ar" dir="rtl"></canvas>
		<canvas id="buffercanvas" lang="ar" dir="rtl"></canvas>
		<script src="{{ asset('assets/games/apple_game/scripts/Fullscreen.js') }}" ></script>
		<script src="{{ asset('assets/games/apple_game/scripts/Answer.js') }}" ></script>
		<script src="{{ asset('assets/games/apple_game/scripts/Question.js') }}" ></script>
		<script src="{{ asset('assets/games/apple_game/scripts/Result.js') }}" ></script>
		<script src="{{ asset('assets/games/apple_game/scripts/ScoreEffect.js') }}" ></script>
		<script src="{{ asset('assets/games/apple_game/scripts/Firefly.js') }}" ></script>
		<script src="{{ asset('assets/games/apple_game/scripts/Main.js') }}" ></script>
	</body>
</html>