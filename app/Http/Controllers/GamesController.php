<?php namespace App\Http\Controllers;

use App\Http\Models\Games;
use App\Http\Controllers\Controller;

use Validator;
use Input;
use Redirect;

class GamesController extends Controller {



    function index() {
        return view('editor.partials.index')->with('active', 0);
    }


    function games() {
        return view('editor.partials.games')->with('active', 1);
    }

    function createGame() {
        return view('editor.partials.create')->with('active', 2);
    }


    function createGameData() {
        // create the validation rules ------------------------
        $rules = array(
            'game_name'                  => 'required',     // required
            'game_opening_statement'     => 'required',     // required
            'game_desc'                  => 'required',     // required
            'game_ending_statement'       => 'required'     // required
        );


        $messages = array(
            'required' => 'שדה :attribute הינו שדה חובה',
        );

        // do the validation ----------------------------------
        // validate against the inputs from our form
        $validator = Validator::make(Input::all(), $rules, $messages);

        // check if the validator failed -----------------------
        if ($validator->fails()) {

            // get the error messages from the validator
            $messages = $validator->messages();

            // redirect our user back to the form with the errors from the validator
            return Redirect::to('/editor/create')->withErrors($validator);

        } else {
            // validation successful ---------------------------

            // our duck has passed all tests!
            // let him enter the database

            // create the data for our duck
//            $duck = new Duck;
//            $duck->name     = Input::get('name');
//            $duck->email    = Input::get('email');
//            $duck->password = Hash::make(Input::get('password'));
//
//            // save our duck
//            $duck->save();

            // redirect ----------------------------------------
            // redirect our user back to the form so they can do it all over again
//            return Redirect::to('ducks');

        }

    }



    function editGame($gameKey) {

    }


}