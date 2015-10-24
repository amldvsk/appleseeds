@extends('editor.main')



@section('content')

    <div class="text-center">
        <img src="{{asset('assets/img/logo.png')}}" alt="" height="250"/>
        <h2>ברוכים הבאים כמה מילים במסך פתיחה....</h2>
        <a href="{{URL::to('/editor/games')}}" class="btn btn-success">טבלת משחקים</a>
    </div>
@endsection