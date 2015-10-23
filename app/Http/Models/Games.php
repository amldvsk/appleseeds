<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Games extends Model
{
    protected $table = 'games';


    public function questions() {
        return $this->hasMany('App\Http\Models\Questions', 'game_id');
    }
}
