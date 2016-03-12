<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Http\Models\UserTypes;
use App\Http\Models\User;

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


        DB::table('users')->delete();
        $admin = UserTypes::where('type', 'admin')->first();
        $editor = UserTypes::where('type', 'editor')->first();
        $users = array(
            ['name' => 'admin', 'email' => 'admin@appleseed.co.il', 'password' => Hash::make('P@ssw0rd'), 'type_id' => $admin->id],
            ['name' => 'editor', 'email' => 'editor@appleseed.co.il', 'password' => Hash::make('P@ssw0rd'), 'type_id' => $editor->id],
        );

        // Loop through each user above and create the record for them in the database
        foreach ($users as $user)
        {
            User::create($user);
        }



        Model::reguard();
    }
}
