<?php
namespace App\Http\Controllers;
use App\User; 
use Validator;
use App\Services\UserService;
use Illuminate\Http\Request; 
use App\Utilities\StatusCodes;
use App\Http\Controllers\Controller; 
use App\Http\Requests\User\UserLogin;
use Illuminate\Support\Facades\Auth; 
use App\Http\Requests\User\UserRegister;


class UserController extends Controller {
    
    private $service;

    function __construct(UserService $service) {
        $this->service = $service;
    }

     /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function get(){ 
        return response()->json(['error'=>'Unauthorised'], 401); 
    }
    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(UserLogin $request){ 
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')->accessToken; 
            return response()->json(['success' => $success], StatusCodes::SUCCESS); 
        } 
        else{ 
            return response()->json(['message'=>'Incorrect Credentials...!'], StatusCodes::NOT_FOUND); 
        } 
    }
/** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(UserRegister $request) 
    { 
        $payload = $request->all();
        $result = $this->service->register($payload);
        $success['token'] =  $result->createToken('MyApp')->accessToken; 
        $success['name'] =  $result->name;
        $code = StatusCodes::UNAUTHORIZED;

        return response()->json(['success'=> $success], $code); 
    }
/** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function details() 
    { 
        $user = Auth::user();
        return response()->json(['success' => $user], StatusCodes::SUCCESS); 
    }
}