<?php
require_once "../controller/AuthController.php";
require_once "../controller/ParticipantController.php";
require_once "../controller/AdminController.php";
require_once "../controller/statusController.php";
require_once "../Model/user.php";
require_once "../Model/participant.php";
require_once "../Model/adminModel.php";
require_once "../Model/statusModel.php";

$routes = [
    "POST /signup" => function($db, $request) {
        $userModel = new UserModel($db);
        $participantModel = new ParticipantModel($db);
        $controller = new ParticipantController($userModel, $participantModel);
        return $controller->signup($request);
    },

    "POST /login" => function($db, $request) {
        $userModel = new UserModel($db);
        $controller = new AuthController($userModel);
        return $controller->login($request);
    },

    "GET /admin-status" => function($db) {
        $statusModel = new StatusModel($db);
        $controller = new StatusController($statusModel);
        return $controller->getStats();
    },

    "GET /admins" => function($db) {
        $adminModel = new AdminModel($db);
        $controller = new AdminController($adminModel);
        return $controller->getAdmins();
    },

    "POST /admin/status" => function($db, $request) {
        $adminModel = new AdminModel($db);
        $controller = new AdminController($adminModel);
        return $controller->toggleStatus($request);
    },

    "POST /admin/create" => function($db, $request) {
        $adminModel = new AdminModel($db);
        $controller = new AdminController($adminModel);
        return $controller->addAdmin($request);
    },

    "POST /admin/update" => function($db, $request) {
        $adminModel = new AdminModel($db);
        $controller = new AdminController($adminModel);
        return $controller->editAdmin($request);
    },

    "POST /admin/delete" => function($db, $request) {
        $adminModel = new AdminModel($db);
        $controller = new AdminController($adminModel);
        return $controller->deleteAdmin($request);
    },
];
?>
