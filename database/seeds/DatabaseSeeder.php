<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;


class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('audience')->insert(array(
            array('audience_type' => 'קהל 1'),
            array('audience_type' => 'קהל 2'),
            array('audience_type' => 'קהל 3'),
            array('audience_type' => 'קהל 4'),
            array('audience_type' => 'קהל 5'),
        ));

        DB::table('content_area')->insert(array(
            array('area' => 'תחום 1'),
            array('area' => 'תחום 2'),
            array('area' => 'תחום 3'),
            array('area' => 'תחום 4'),
            array('area' => 'תחום 5'),
        ));

        DB::table('difficulty_level')->insert(array(
            array('level' => 'רמה 1'),
            array('level' => 'רמה 2'),
            array('level' => 'רמה 3'),
            array('level' => 'רמה 4'),
            array('level' => 'רמה 5'),
        ));


        DB::table('user_types')->insert(array(
            array('type' => 'admin'),
            array('type' => 'editor'),
        ));



        Model::reguard();
    }
}
