<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use App\User; 
use Illuminate\Support\Facades\Auth; 
use Validator;
use App\Http\Requests\User\UserRegister;
use App\Utilities\StatusCodes;
use App\Services\UserService;


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
    public function login(){ 
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')->accessToken; 
            return response()->json(['success' => $success], StatusCodes::SUCCESS); 
        } 
        else{ 
            return response()->json(['error'=>'Unauthorised'], StatusCodes::UNAUTHORIZED); 
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
        //$success['token'] =  $result->createToken('MyApp')->accessToken; 
        //$success['name'] =  $result->name;
        $code = StatusCodes::UNAUTHORIZED;

        return response()->json(['success'=> $result], $code); 
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

    public function checkPolicy() {
        $User = new User();

        $record = $User->find(1);

        $checkPolicy = $User->checkPolicy();

        return response()->json(['sample' => $checkPolicy], StatusCodes::SUCCESS); 
    }
}