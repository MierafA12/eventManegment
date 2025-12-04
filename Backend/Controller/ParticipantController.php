<?php
class ParticipantController {

    private $userModel;

    public function __construct($db) {
        $this->userModel = new User($db);
    }

    public function signup($request) {
        $data = json_decode($request, true);

        if (!$data || empty($data["username"]) || empty($data["email"]) || empty($data["password"])) {
            http_response_code(400);
            return ["success" => false, "message" => "All fields are required"];
        }

        $result = $this->userModel->createUser($data["username"], $data["email"], $data["password"]);

        if ($result) {
            return ["success" => true, "message" => "User registered successfully"];
        } else {
            http_response_code(500);
            return ["success" => false, "message" => "Failed to create user"];
        }
    }
}
