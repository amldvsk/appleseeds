<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Games extends Model
{
    protected $table = 'games';
    //protected $fillable = ['name', 'email', 'password', 'provider', 'provider_id', 'first_name', 'last_name', 'active', 'invited'];

    public function questions() {
        return $this->hasMany('App\Http\Models\Questions', 'game_id');
    }
}
