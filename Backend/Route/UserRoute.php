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
];
