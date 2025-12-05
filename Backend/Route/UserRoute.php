<?php
$routes = [
    "POST /signup" => function($db, $request) {
        $controller = new ParticipantController($db);
        return $controller->signup($request);
    },

    "POST /login" => function($db, $request) {
        $controller = new AuthController($db);
        return $controller->login($request);
    },
     "GET /admin-status" => function($db) {
    $controller = new statusController($db);
    return $controller->getStats();
     },
];
