<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;


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
        $validator = Validator::make($request->all(),[
            'limit' => 'required|numeric',
            'offset' => 'required|numeric',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        $url_poke_api = env('URL_POKE_API');
        $url_request = $url_poke_api . "pokemon?limit=".$request->get('limit').'&offset='.$request->get('offset');
        $response = Http::get($url_request);
        $data = $response->json();
        if ($response->getStatusCode() !== 200) {
            return response()->json(['message' => 'Failed to response request'], 400);
        }
        $results = $data["results"];
        return response()->json($results);
    }

    public function get_character_specific(Request $request, $name){
        $fields = [
            "name",
            "weight",
            "id",
            "base_experience",
            "sprites"
        ];
        $url_poke_api = env('URL_POKE_API');
        $url_request = $url_poke_api . "pokemon/".$name;
        $response = Http::get($url_request);
        $data = $response->json();
        if ($response->getStatusCode() !== 200) {
            return response()->json(['message' => 'Failed to response request'], 400);
        }
        $results = array_intersect_key($data, array_flip($fields));
        return response()->json($results);
    }
}
