<?php namespace App\Http\Controllers\Auth;

use App\Http\Models\Games;
use App\Http\Models\Questions;
use App\Http\Models\Answers;
use App\Http\Controllers\Controller;

use Symfony\Component\HttpFoundation\Request;
use Validator;
use Input;
use Redirect;
use DB;
use Session;
use Auth;
use App\Http\Models\User;

class AuthUsers extends Controller {


    function login() {

        $rules = array(
            'email'                  => 'required|email',     // required
            'password'               => 'required',     // required
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {

            // get the error messages from the validator
            $messages = $validator->messages();

            // redirect our user back to the form with the errors from the validator

            return Redirect::to('/auth/login')->withErrors($validator);

        } else {


            if (Auth::attempt(['email' => Input::get('email'), 'password' => Input::get('password')])) {

                if( Auth::user()->userType->type == 'admin' ) {
                    return redirect('/admin');
                } else if( Auth::user()->userType->type == 'editor' ) {
                    return redirect('/editor');
                }

            } else {
                \Session::flash('login_error', 'משתמש לא קיים');
                return redirect('/auth/login');
            }
        }

    }

}