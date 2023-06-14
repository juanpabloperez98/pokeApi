<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class pokeApiController extends Controller
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

    public function get_characters(Request $request){

    }
}
