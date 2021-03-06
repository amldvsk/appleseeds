<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/






Route::get('/', function () {
    return view('public.index');
});


Route::get('/auth/login', function () {
    return view('login.login');
});


Route::get('/logout', function () {
    Auth::logout();
    return redirect('/');
});

Route::post('/auth/login', 'Auth\AuthUsers@login');







// ==============================================================
// EDITOR ROUTES ================================================
// ==============================================================

Route::get('/game/{key}', 'PublicGamesController@getGame');

// ==============================================================



// ==============================================================
// ONLY AFTER LOGIN ROUTES ======================================
// ==============================================================

Route::group(array('middleware' => 'auth'), function()
{


    // ==============================================================
    // EDITOR ROUTES ================================================
    // ==============================================================

    Route::get('/editor', 'GamesController@index');
    Route::get('/editor/games', 'GamesController@games');
    Route::get('/editor/create', 'GamesController@createGame');
    Route::get('/editor/create/questions/{key}', 'GamesController@createGameQuestions');
    Route::post('/editor/create', 'GamesController@createGameData');
    Route::post('/editor/create/questions', 'GamesController@createGameQuestionsData');

    Route::get('/editor/delete/{key}', 'GamesController@deleteGame');

    Route::get('/editor/copy/{key}', 'GamesController@copyGame');

    Route::get('/editor/edit/{key}', 'GamesController@editGame');
    Route::get('/editor/edit/questions/{key}', 'GamesController@editGameQuestions');

    Route::post('/editor/edit/questions', 'GamesController@editGameQuestionsData');
    Route::post('/editor/edit/{key}', 'GamesController@editGameData');

    // ==============================================================

});




