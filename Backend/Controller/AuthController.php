<?php
require_once "../helpers/jwt.php";

class AuthController {

    private $userModel;

    public function __construct($db) {
        $this->userModel = new User($db);
    }

    public function login($request) {
        $data = json_decode($request, true);

        if (!$data || empty($data["email"]) || empty($data["password"])) {
            http_response_code(400);
            return ["success" => false, "message" => "Email and password are required"];
        }

        $email = $data["email"];
        $password = $data["password"];

        $user = $this->userModel->getByEmail($email);

        if (!$user) {
            http_response_code(401);
            return ["success" => false, "message" => "Invalid email or password"];
        }

        if (!password_verify($password, $user["password"])) {
            http_response_code(401);
            return ["success" => false, "message" => "Invalid email or password"];
        }

        // Generate JWT
        $token = generateJwtToken($user["id"], $user["role"]);

        return [
            "success" => true,
            "message" => "Login successful",
            "jwt" => $token,
            "user" => [
                "id" => $user["id"],
                "email" => $user["email"],
                "username" => $user["username"],
                "role" => $user["role"]
            ]
        ];
    }
}
