<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class GamesController extends Controller {



    function index() {
        return view('editor.partials.index')->with('active', 0);
    }


    function games() {
        return view('editor.partials.games')->with('active', 1);
    }


}