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
    return view('welcome');
});



// ==============================================================
// EDITOR ROUTES ================================================
// ==============================================================

Route::get('/editor', 'GamesController@index');
Route::get('/editor/games', 'GamesController@games');
Route::get('/editor/create', 'GamesController@createGame');
Route::get('/editor/create/questions/{key}', 'GamesController@createGameQuestions');
Route::post('/editor/create', 'GamesController@createGameData');
Route::post('/editor/create/questions', 'GamesController@createGameQuestionsData');

Route::get('/editor/games/edit/{key}', 'GamesController@editGame');

// ==============================================================



// ==============================================================
// EDITOR ROUTES ================================================
// ==============================================================

Route::get('/game/{key}', 'PublicGamesController@getGame');

// ==============================================================



// ==============================================================
// ONLY AFTER LOGIN ROUTES ======================================
// ==============================================================

Route::group(array('before' => 'auth'), function()
{
    Route::resource('users','UsersController');
});

// ==============================================================
