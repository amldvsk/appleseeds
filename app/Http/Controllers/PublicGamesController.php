<?php namespace App\Http\Controllers;

use App\Http\Models\Games;
use App\Http\Controllers\Controller;

use Validator;
use Input;
use Redirect;
use DB;

class PublicGamesController extends Controller {



    function getGame() {
        return view('games.apple_game.apple_game');
    }

}