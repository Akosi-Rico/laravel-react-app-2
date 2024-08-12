<?php

namespace App\Http\Middleware\Access;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    public function handle(Request $request, Closure $next, $guard = null): Response
    {
        if (auth()->guard($guard)->check() && auth()->user()->hasAnyDirectPermission(config("tcode.ACCESS"))) {
            return $next($request);
        }
   
        abort(403);
    }
}
