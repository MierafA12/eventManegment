<?php
require_once __DIR__ . "/../Model/user.php";
require_once __DIR__ . "/../Model/participant.php";


require_once "../helpers/jwt.php"; // your JWT helper

class UserController {
    private $userModel;
    private $participantModel;

    public function __construct(UserModel $userModel, ParticipantModel $participantModel) {
        $this->userModel = $userModel;
        $this->participantModel = $participantModel;
    }

    // GET /profile
    public function getProfile() {
        // Get Authorization header
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? '';

        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Not authenticated"]);
            return;
        }

        $jwt = $matches[1];
        $payload = validateJwtToken($jwt); // your helper returns user id & role
        if (!$payload) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Invalid token"]);
            return;
        }

        $userId = $payload['id'];

        $user = $this->userModel->getUserById($userId);
        if (!$user) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "User not found"]);
            return;
        }

        $participant = $this->participantModel->select("*", ["user_id" => $userId]);
        $participantData = $participant ? $participant[0] : [];

        $profile = array_merge($user[0], $participantData);

        echo json_encode(["success" => true, "profile" => $profile]);
    }
}

?>
