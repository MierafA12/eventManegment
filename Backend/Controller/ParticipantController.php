<?php
require_once __DIR__ . '/../Model/user.php';
require_once __DIR__ . '/../Model/participant.php';

class ParticipantController {

    private $userModel;
    private $participantModel;

    public function __construct(mysqli $conn) {
        $this->userModel = new UserModel($conn);
        $this->participantModel = new ParticipantModel($conn);
    }

    public function signup($request) {
        $data = $request;

        if (!$data) {
            http_response_code(400);
            return ["success" => false, "message" => "Invalid input"];
        }

        $full_name = $data["name"] ?? "";
        $username = $data["username"] ?? "";
        $dob = $data["dob"] ?? "";
        $phone_number = $data["phone_number"] ?? "";
        $email = $data["email"] ?? "";
        $password = $data["password"] ?? "";

        if (!$full_name || !$username || !$dob || !$phone_number || !$email || !$password) {
            http_response_code(400);
            return ["success" => false, "message" => "All fields are required"];
        }

        // Validate password strength
        $passValidation = validatePasswordStrength($password);
        if (!$passValidation['success']) {
            http_response_code(400);
            return $passValidation;
        }

        // Create user (default role = participant)
        $createUser = $this->userModel->createUser($username, $email, $password);
        if (!$createUser) {
            http_response_code(500);
            return [
                "success" => false,
                "message" => "Failed to create user. Email or username may already exist."
            ];
        }

        // Get user ID
        $user = $this->userModel->getByEmail($email);
        $userId = $user["id"];

        // Create participant record
        $saveParticipant = $this->participantModel->createParticipant(
            $userId,
            $full_name,
            $dob,
            $phone_number
        );

        if (!$saveParticipant) {
            http_response_code(500);
            return ["success" => false, "message" => "Failed to save participant info"];
        }

        return [
            "success" => true,
            "message" => "Account created successfully",
            "user_id" => $userId
        ];
    }
}
