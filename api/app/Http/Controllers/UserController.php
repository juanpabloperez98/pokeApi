<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;


class UserController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function add_info_profile(Request $request){
        $validator = Validator::make($request->all(),[
            'address' => 'required|string',
            'birthdate' => 'required|date_format:Y/m/d',
            'city' => 'required|string'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        $user = User::find(auth()->user()->id);
        // dd($request->all());
        $user->update($request->all());
        return response()->json(['message' => 'Info updated successfully']);
    }

    function get_user_info(){
        $user = auth()->user();
        return response()->json($user);
    }
}
