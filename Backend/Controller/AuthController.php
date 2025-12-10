<?php
require_once __DIR__ . '/../Model/user.php';
require_once "../helpers/jwt.php";

class AuthController {
    private UserModel $userModel;

    public function __construct(UserModel $userModel) {
        $this->userModel = $userModel;
    }

    public function login($request) {
        $data = json_decode($request, true);
        if (!$data || empty($data["email"]) || empty($data["password"])) {
            http_response_code(400);
            return ["success" => false, "message" => "Email and password are required"];
        }

        $user = $this->userModel->getByEmail($data["email"]);
        if (!$user || !password_verify($data["password"], $user["password"])) {
            http_response_code(401);
            return ["success" => false, "message" => "Invalid email or password"];
        }

        $token = generateJwtToken($user["id"], $user["role"]);
        return [
            "success" => true,
            "message" => "Login successful",
            "jwt" => $token,
            "user" => $user
        ];
    }
}
?>
