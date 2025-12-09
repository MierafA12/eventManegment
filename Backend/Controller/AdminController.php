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

    // POST toggle status
    public function toggleStatus($request)
    {
        $data = json_decode($request, true);
        if (!isset($data["id"]) || !isset($data["status"])) {
            return ["success" => false, "message" => "Invalid input"];
        }
        $this->model->updateStatus($data["id"], $data["status"]);
        return ["success" => true, "message" => "Status updated"];
    }

    // POST create admin
    public function addAdmin($request)
    {
        $data = json_decode($request, true);
        if (!isset($data["full_name"], $data["username"], $data["email"], $data["password"])) {
            return ["success" => false, "message" => "Missing fields"];
        }

        $this->model->createAdmin(
            $data["full_name"],
            $data["username"],
            $data["email"],
            $data["password"]
        );

        return ["success" => true, "message" => "Admin created successfully"];
    }

    // POST update admin
    public function editAdmin($request)
    {
        $data = json_decode($request, true);
        if (!isset($data["id"], $data["full_name"], $data["username"], $data["email"], $data["status"])) {
            return ["success" => false, "message" => "Invalid input"];
        }

        $this->model->updateAdmin(
            $data["id"],
            $data["full_name"],
            $data["username"],
            $data["email"],
            $data["status"]
        );

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
