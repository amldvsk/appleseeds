<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('game_name');
            $table->string('unique_id');
            $table->string('game_opening_statement');
            $table->text('game_desc');
            $table->string('game_ending_statement');
            $table->integer('audience');
            $table->integer('difficulty_level');
            $table->integer('content_area');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('games');
    }
}
