<?php namespace App\Http\Controllers;

use App\Http\Models\Games;
use App\Http\Models\Questions;
use App\Http\Models\Answers;
use App\Http\Controllers\Controller;

use Validator;
use Input;
use Redirect;
use DB;
use Auth;

class GamesController extends Controller {



    function index() {
        return view('editor.partials.index')->with('active', 0);
    }


    function games() {
        return view('editor.partials.games')->with('active', 1)->with('games', Games::all());
    }

    function createGame() {

        $audience = DB::table('audience')->get();
        $difficulty_level = DB::table('difficulty_level')->get();
        $content_area = DB::table('content_area')->get();



        return view('editor.partials.create')->with('active', 2)->with('options', array(
            'audience' => $audience,
            'difficulty_level' => $difficulty_level,
            'content_area' => $content_area,
        ));
    }


    function createGameQuestions($gameUniqueId) {

        return view('editor.partials.questions')->with('active', 2)->with('game_id', $gameUniqueId);
    }


    function createGameQuestionsData() {

        $rules = array(
        );

        foreach(Input::get('question') as $key => $val) {
            $rules['question.'.$key.'.question.question_text'] = 'required';
            foreach(Input::get('question')[$key]['question']['answers'] as $key2 => $val) {
                $rules['question.'.$key.'.question.answers.'.$key2] = 'required';
            }

        }


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
            return redirect()->back()->withErrors($validator)->withInput(Input::all());

        } else {

            foreach(Input::get('question') as $qus) {
                $questions = new Questions;
                $questions->game_id = Input::get('game_id');
                $questions->question = $qus['question']['question_text'];
                $questions->save();
                $index = 0;
                foreach($qus['question']['answers'] as $ans) {
                    $answers = new Answers;
                    $answers->right_answer = ($index++ == (int)$qus['question']["right_answer"] ? 1 : 0);
                    $answers->answer = $ans;
                    $answers->question_id = $questions->id;
                    $answers->save();
                }

            }

        }

        return redirect('/game/'.Games::find(Input::get('game_id'))->unique_id);

    }


    function createGameData() {
        // create the validation rules ------------------------
        $rules = array(
            'game_name'                  => 'required|min:5',     // required
            'game_opening_statement'     => 'min:5',     // required
            //'game_desc'                  => 'required|min:5',     // required
            'game_ending_statement'      => 'min:5',     // required
            'audience'                   => 'required',     // required
            'difficulty_level'           => 'required',     // required
            'content_area'               => 'required',     // required
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
            return Redirect::to('/editor/create')->withErrors($validator)->withInput(Input::all());

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

            do {
                $unique_id = str_random(10);
            } while( Games::where('unique_id', $unique_id)->get()->count() );

            $game = new Games;
            $game->game_name = Input::get('game_name');
            $game->unique_id = $unique_id;
            $game->game_opening_statement = Input::get('game_opening_statement');
            //$game->game_desc = Input::get('game_desc');
            $game->game_ending_statement = Input::get('game_ending_statement');
            $game->audience = Input::get('audience');
            $game->difficulty_level = Input::get('difficulty_level');
            $game->content_area = Input::get('content_area');
//            $game->game_time = Input::get('game_time');


            $game->user_id = Auth::user()->id;

            $game->save();

            return redirect('/editor/create/questions/'.$game->id);
        }

    }



    function editGame($gameKey) {
        $game = Games::where('unique_id', $gameKey)->first();
        $audience = DB::table('audience')->get();
        $difficulty_level = DB::table('difficulty_level')->get();
        $content_area = DB::table('content_area')->get();
        return view('editor.partials.edit')->with('active',0)->with('game', $game)->with('options', array(
            'audience' => $audience,
            'difficulty_level' => $difficulty_level,
            'content_area' => $content_area,
        ));
    }


    function editGameData($gameUniqueId) {
        // create the validation rules ------------------------
        $rules = array(
            'game_name'                  => 'required|min:5',     // required
            'game_opening_statement'     => 'min:5',     // required
            //'game_desc'                  => 'required|min:5',     // required
            'game_ending_statement'      => 'min:5',     // required
            'audience'                   => 'required',     // required
            'difficulty_level'           => 'required',     // required
            'content_area'               => 'required',     // required
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
            return Redirect::to('/editor/create')->withErrors($validator)->withInput(Input::all());

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



            $game = Games::where('unique_id', $gameUniqueId)->first();
            $game->game_name = Input::get('game_name');
            $game->game_opening_statement = Input::get('game_opening_statement');
            $game->game_ending_statement = Input::get('game_ending_statement');
            $game->audience = Input::get('audience');
            $game->difficulty_level = Input::get('difficulty_level');
            $game->content_area = Input::get('content_area');
            $game->save();

            return redirect('/editor/edit/questions/'.$game->id);
        }

    }


    function editGameQuestions($gameUniqueId) {
        $game = Games::where('id', $gameUniqueId)->first();
        return view('editor.partials.edit_questions')->with('active', 0)->with('game', $game)->with('game_id', $gameUniqueId);
    }


    function editGameQuestionsData() {
        $rules = array(
        );

        foreach(Input::get('question') as $key => $val) {
            $rules['question.'.$key.'.question.question_text'] = 'required';
            foreach(Input::get('question')[$key]['question']['answers'] as $key2 => $val) {
                $rules['question.'.$key.'.question.answers.'.$key2] = 'required';
            }

        }


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
            return redirect()->back()->withErrors($validator)->withInput(Input::all());

        } else {
            $qs = Questions::where('game_id',Input::get('game_id'))->get();
            foreach($qs as $q) {
                Answers::where('question_id', $q->id)->delete();
                $q->delete();
            }

            foreach(Input::get('question') as $qus) {
                $questions = new Questions;
                $questions->game_id = Input::get('game_id');
                $questions->question = $qus['question']['question_text'];
                $questions->save();
                $index = 0;
                foreach($qus['question']['answers'] as $ans) {
                    $answers = new Answers;
                    $answers->right_answer = ($index++ == (int)$qus['question']["right_answer"] ? 1 : 0);
                    $answers->answer = $ans;
                    $answers->question_id = $questions->id;
                    $answers->save();
                }

            }

        }

        return redirect('/game/'.Games::find(Input::get('game_id'))->unique_id);

    }


    public function deleteGame($key) {
        $game = Games::where('unique_id', $key)->first();
        $qs = Questions::where('game_id',$game->id)->get();
        foreach($qs as $q) {
            Answers::where('question_id', $q->id)->delete();
            $q->delete();
        }
        $game->delete();
        return redirect()->back();
    }


    public function copyGame($key) {
        $copyGame = Games::where('unique_id', $key)->first();

        do {
            $unique_id = str_random(10);
        } while( Games::where('unique_id', $unique_id)->get()->count() );

        $game = new Games;
        $game->game_name = $copyGame->game_name;
        $game->unique_id = $unique_id;
        $game->game_opening_statement = $copyGame->game_opening_statement;
        $game->game_ending_statement = $copyGame->game_ending_statement;
        $game->audience = $copyGame->audience;
        $game->difficulty_level = $copyGame->difficulty_level;
        $game->content_area = $copyGame->content_area;
        $game->user_id = Auth::user()->id;

        $game->save();

        $qs = Questions::where('game_id',$copyGame->id)->get();
        foreach($qs as $qus) {
            $questions = new Questions;
            $questions->game_id = $game->id;
            $questions->question = $qus->question;
            $questions->save();
            foreach($qus->answers as $ans) {
                $answers = new Answers;
                $answers->right_answer = $ans->right_answer;
                $answers->answer = $ans->answer;
                $answers->question_id = $questions->id;
                $answers->save();
            }

        }


        return redirect('/editor/edit/'.$game->unique_id);
    }


}