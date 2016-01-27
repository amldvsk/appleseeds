<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class UserTypes extends Model
{
    protected $table="user_types";

    public function user() {
        return $this->belongsTo('App\Models\Users', 'User_id');
    }

}
