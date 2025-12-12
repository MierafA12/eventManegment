<?php

require_once "../Controller/EventController.php";

// Public Event Routes
$routes["GET /events"] = function($db, $request) {
    $controller = new EventController($db);
    return $controller->getAll();
};

$routes["GET /event"] = function($db, $request) {
    $controller = new EventController($db);
    // ID is in $_GET, which controller accesses directly, or we can pass it if we update controller
    // Current controller implementation: $id = $_GET['id'] ?? 0;
    return $controller->getOne($_GET['id'] ?? 0);
};

$routes["GET /events/search"] = function($db, $request) {
    $controller = new EventController($db);
    return $controller->search($_GET['query'] ?? '');
};

$routes["GET /events/filter"] = function($db, $request) {
    $controller = new EventController($db);
    $filters = [
        'category' => $_GET['category'] ?? '',
        'eventType' => $_GET['eventType'] ?? '',
        'status' => $_GET['status'] ?? '',
        'startDate' => $_GET['startDate'] ?? '',
        'endDate' => $_GET['endDate'] ?? ''
    ];
    return $controller->filter($filters);
};

$routes["GET /events/search-filter"] = function($db, $request) {
    $controller = new EventController($db);
    $search = $_GET['search'] ?? '';
    $filters = [
        'category' => $_GET['category'] ?? '',
        'eventType' => $_GET['eventType'] ?? '',
        'status' => $_GET['status'] ?? '',
        'startDate' => $_GET['startDate'] ?? '',
        'endDate' => $_GET['endDate'] ?? ''
    ];
    return $controller->searchAndFilter($search, $filters);
};

$routes["GET /events/categories"] = function($db, $request) {
    $controller = new EventController($db);
    return $controller->getCategories();
};

// Admin/Protected Event Routes
$routes["POST /event/create"] = function($db, $request) {
    $controller = new EventController($db);
    return $controller->create();
};

$routes["POST /event/update"] = function($db, $request) {
    $controller = new EventController($db);
    return $controller->update();
};

$routes["POST /event/delete"] = function($db, $request) {
    $controller = new EventController($db);
    // Controller reads $_POST['id'] directly
    return $controller->delete($_POST['id'] ?? 0);
};
?>
