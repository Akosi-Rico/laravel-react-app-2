<!-- resources/views/errors/403.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 Forbidden</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
    @routes
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.ts'])
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="text-center">
        <h1 class="text-6xl font-bold text-red-600">403</h1>
        <p class="text-xl font-medium text-gray-700 mt-4">Forbidden</p>
        <p class="text-lg text-gray-500 mt-2">You do not have permission to access this page.</p>
        <a href="{{ route("user.index") }}" class="
            mt-4 inline-block px-6 py-2  
            bg-blue-500 hover:bg-blue-600
            underline 
            rounded-md">Go to Home</a>
    </div>
</body>
</html>
