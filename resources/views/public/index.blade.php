@extends('welcome')



@section('content')

    <div class="text-center">
        <img src="{{asset('assets/img/logo.png')}}" alt="" height="250"/>
        <h2>ברוכים הבאים כמה מילים במסך פתיחה....</h2>
        <form id="choose_game">
            <div class="form-group">
                <input class="form-control" type="text" name="game_code" placeholder="אנא הכנס קוד משחק"/>
            </div>
        </form>
        <a href="{{URL::to('/game')}}" id="goToGame" class="btn btn-success">התחל משחק</a>
    </div>
@endsection