<?php

namespace App\Services;
use App\Repositories\Contracts\UserRepository;
use App\User;

class UserService
{
    public function register($input) {
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input); 
        
        return $input;
    }
}
