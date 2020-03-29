<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::group(['middleware' => 'auth:api'], function() {
    Route::post('details', 'UserController@details');
    Route::post('check-policy', 'UserController@checkPolicy');
    Route::post('post', 'PostController@create');
});

Route::get('/post/sample', 'PostController@sample');

Route::fallback(function(){
    return response()->json([
        'message' => 'End Point Found. If error persists, Please send an email to JamesRoncy13@gmail.com'], 404);
});
