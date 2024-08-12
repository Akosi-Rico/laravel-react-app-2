<?php

namespace App\Http\Middleware\Access;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class GuestProcess
{
    public function handle(Request $request, Closure $next, $guard = null): Response
    {
        if (auth()->guard($guard)->check()) {
            return redirect('/user');
        }
   
        return $next($request);
    }
}
