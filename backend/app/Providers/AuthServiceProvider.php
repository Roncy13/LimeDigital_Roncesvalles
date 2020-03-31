<?php
namespace App\Providers;
use App\Policies\PostPolicy;
use App\Policies\MediaPolicy;
use Laravel\Passport\Passport; 

use App\Policies\CategoryPolicy;
use App\Policies\PostMediaPolicy;
use Illuminate\Support\Facades\Gate; 
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider 
{ 
    /** 
     * The policy mappings for the application. 
     * 
     * @var array 
     */ 
    protected $policies = [
        \App\Models\Category::class => CategoryPolicy::class,
        \App\Models\Media::class => MediaPolicy::class,
        \App\Models\PostMedia::class => PostMediaPolicy::class,
        \App\Models\Post::class => PostPolicy::class
    ];
/** 
     * Register any authentication / authorization services. 
     * 
     * @return void 
     */ 
    public function boot() 
    { 
        $this->registerPolicies(); 
        
        Passport::routes(); 

        Passport::tokensExpireIn(now()->addDays(15));

        Passport::refreshTokensExpireIn(now()->addDays(30));
    } 
}