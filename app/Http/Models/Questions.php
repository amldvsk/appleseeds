<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    protected $table = 'questions';


    public function game()
    {
        return $this->belongsTo('App\Http\Models\Games');
    }


    public function answers() {
        return $this->hasMany('App\Http\Models\Answers', 'question_id');
    }

}
