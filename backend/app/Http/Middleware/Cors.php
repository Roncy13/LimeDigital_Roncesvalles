<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $possibleOrigins = [
            'http://165.22.101.69',
            'https://165.22.101.69',
            'http://180.191.184.38'
        ];
        $origin = $_SERVER['HTTP_ORIGIN'];

        if (env('APP_ENV') != 'production') {
            $possibleOrigins[] = 'http://127.0.0.1:4200';
            $possibleOrigins[] = 'http://localhost:4200';
        }
       
        if (in_array($origin, $possibleOrigins)) {
            return $next($request)
                ->header('Access-Control-Allow-Origin', $origin)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }

        return $next($request);
    }
}
