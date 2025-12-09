<?php
require_once __DIR__ . '/../Model/adminModel.php';

class AdminController 
{
    private $model;

    public function __construct($db)
    {
        $this->model = new AdminModel($db);
    }

    // GET all admins
    public function getAdmins()
    {
        return [
            "success" => true,
            "admins" => $this->model->getAdmins()
        ];
    }

    // POST activate/deactivate admin
    public function toggleStatus($request)
    {
        $data = json_decode($request, true);

        if (!isset($data["id"]) || !isset($data["status"])) {
            return ["success" => false, "message" => "Invalid input"];
        }

        $this->model->updateStatus($data["id"], $data["status"]);

        return ["success" => true, "message" => "Status updated"];
    }

    // PUT edit admin
    public function editAdmin($request)
    {
        $data = json_decode($request, true);

        if (!isset($data["id"]) || !isset($data["username"])) {
            return ["success" => false, "message" => "Invalid input"];
        }

        $this->model->updateAdmin($data["id"], $data["username"]);

        return ["success" => true, "message" => "Admin updated"];
    }

    // DELETE admin
    public function deleteAdmin($request)
    {
        $data = json_decode($request, true);

        if (!isset($data["id"])) {
            return ["success" => false, "message" => "Invalid input"];
        }

        $this->model->deleteAdmin($data["id"]);

        return ["success" => true, "message" => "Admin deleted"];
    }
}
