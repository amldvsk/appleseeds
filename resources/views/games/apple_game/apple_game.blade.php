<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>a game about apples</title>
    <link href="{{ asset('assets/games/apple_game/css/stylesheet.css') }}" rel="stylesheet">
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="utf-8" http-equiv="encoding">
</head>
<body onLoad ="fromServer()">
    {{ $game  }}
    <canvas id="mycanvas" lang="ar" dir="rtl"></canvas>
    <canvas id="buffercanvas" lang="ar" dir="rtl"></canvas>
    <script src="{{ asset('assets/games/apple_game/scripts/script.js') }}" ></script>
</body>
</html>