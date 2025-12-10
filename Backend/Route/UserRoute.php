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
    "GET /admins" => function($db) {
        $controller = new AdminController($db);
        return $controller->getAdmins();
    },

    "POST /admin/status" => function($db, $request) {
        $controller = new AdminController($db);
        return $controller->toggleStatus($request);
    },

    "POST /admin/delete" => function($db, $request) {
        $controller = new AdminController($db);
        return $controller->deleteAdmin($request);
    },

   "POST /admin/create" => function($db, $request) {
        $controller = new AdminController($db);
        return $controller->addAdmin($request);
    },

    "POST /admin/update" => function($db, $request) {
        $controller = new AdminController($db);
        return $controller->editAdmin($request);
    },



];
