<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answers extends Model
{
    protected $table = 'answers';


    public function question()
    {
        return $this->belongsTo('App\Http\Models\Questions');
    }


}
