<?php

require_once "../controller/EventController.php";

$routes["GET /admin/dashboard/stats"] = function($db, $request) {
    $controller = new EventController($db);
    return $controller->getDashboardStats();
};

$routes["GET /admin/dashboard/event-trend"] = function($db, $request) {
    $controller = new EventController($db);
    return $controller->getEventTrend();
};
