<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>ShortLister Technical Task</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>