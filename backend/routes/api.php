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

    Route::prefix('category')->group(function() {
        Route::get('', 'CategoryController@view');
        Route::post('', 'CategoryController@create');
        Route::put('/{id}', 'CategoryController@update');
        Route::delete('/{id}', 'CategoryController@destroy');
    });

    Route::prefix('media')->group(function() {
        Route::get('', 'MediaController@retrieve');
        Route::post('', 'MediaController@create');
        Route::post('/{id}', 'MediaController@update');
        Route::delete('/{id}', 'MediaController@destroy');
    });

    Route::prefix('post')->group(function() {
        //Route::get('', 'PostController@retrieve');
        Route::post('', 'PostController@create');
        Route::put('/{id}', 'PostController@update');
        //Route::delete('/{id}', 'PostController@destroy');
    });
});

Route::get('/post/sample', 'PostController@sample');

Route::fallback(function(){
    return response()->json([
        'message' => 'End Point Found. If error persists, Please send an email to JamesRoncy13@gmail.com'], 404);
});
