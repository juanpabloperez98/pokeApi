<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::post('me', 'App\Http\Controllers\AuthController@me');
    Route::post('register', 'App\Http\Controllers\AuthController@register');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function($router){
    Route::get('get_user_info', 'App\Http\Controllers\UserController@get_user_info');
    Route::post('user_info', 'App\Http\Controllers\UserController@add_info_profile');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'pokeapi'
], function($router){
    Route::get('get_characters', 'App\Http\Controllers\pokeApiController@get_characters');
    Route::get('get_character_specific/{name}', 'App\Http\Controllers\pokeApiController@get_character_specific');
    Route::post('add_favorito', 'App\Http\Controllers\pokeApiController@add_to_favoritos');
    Route::get('get_favoritos', 'App\Http\Controllers\pokeApiController@get_favoritos');
});
