<?php namespace App\Http\Controllers;

use App\Http\Models\Games;
use App\Http\Models\Questions;
use App\Http\Models\Answers;
use App\Http\Controllers\Controller;

use Validator;
use Input;
use Redirect;
use DB;

class PublicGamesController extends Controller {



    function getGame($key) {

        $game = Games::where('unique_id', $key)->with('questions')->first();

        return view('games.apple_game.apple_game')->with('game', $game->toJson());
    }

}