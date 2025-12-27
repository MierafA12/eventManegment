<?php
$routes = [
"GET /admin-status" => function($db) {
    $controller = new statusController($db);
    return $controller->getStats();

},
];
// 