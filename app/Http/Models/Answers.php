<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Answers extends Model
{
    protected $table = 'answers';


    public function question()
    {
        return $this->belongsTo('App\Http\Models\Questions');
    }


}
