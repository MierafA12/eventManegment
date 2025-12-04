<?php
require_once "../helpers/jwt.php";

class AuthController {

    private $userModel;

    public function __construct($db) {
        $this->userModel = new User($db);
    }

    public function login($request) {
        $data = json_decode($request, true);

        if (!$data || empty($data["username"]) || empty($data["password"])) {
            http_response_code(400);
            return ["success" => false, "message" => "Username and password required"];
        }

        $username = $data["username"];
        $password = $data["password"];

        $user = $this->userModel->getByUsername($username);

        if (!$user) {
            http_response_code(401);
            return ["success" => false, "message" => "Invalid username or password"];
        }

        if (!password_verify($password, $user["password"])) {
            http_response_code(401);
            return ["success" => false, "message" => "Invalid username or password"];
        }

        $token = generateJwtToken($user["id"], $user["role"]);

        return [
            "success" => true,
            "message" => "Login successful",
            "jwt" => $token,
            "user" => [
                "id" => $user["id"],
                "username" => $user["username"],
                "role" => $user["role"]
            ]
        ];
    }
}
