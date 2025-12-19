<?php
require_once __DIR__ . "/../Model/user.php";
require_once __DIR__ . "/../Model/participant.php";
require_once "../helpers/jwt.php";

class UserController {
    private UserModel $userModel;
    private ParticipantModel $participantModel;

    public function __construct(UserModel $userModel, ParticipantModel $participantModel) {
        $this->userModel = $userModel;
        $this->participantModel = $participantModel;
    }

public function getProfile() {
    $headers = getallheaders();
    $payload = decodeJwtToken($headers);

    $userId = $payload['id'];
    $role = $payload['role'];

    $user = $this->userModel->getUserById($userId);
    if (!$user) {
        http_response_code(404);
        return ["success" => false, "message" => "User not found"];
    }

    $participantData = [];
    if ($role === "participant") {
        $participant = $this->participantModel->getByUserId($userId);
        $participantData = $participant ? $participant : [];
    }

    $profile = array_merge($user, $participantData);

    return ["success" => true, "profile" => $profile];
}

public function updateProfile($request) {
    $headers = getallheaders();
    $payload = decodeJwtToken($headers);

    $userId = $payload['id'];
    $role = $payload['role'];

    $data = json_decode(trim($request), true);

if (!is_array($data)) {
    return ["success" => false, "message" => "Invalid request body"];
}


    // Update user fields
    $userUpdate = [];
    if (isset($data['username'])) $userUpdate['username'] = $data['username'];
    if (isset($data['email'])) $userUpdate['email'] = $data['email'];

    $this->userModel->update($userId, $userUpdate);

    // Update participant fields if participant role
    if ($role === "participant") {
        $participantUpdate = [];
        if (isset($data['fullname'])) $participantUpdate['full_name'] = $data['fullname'];
        if (isset($data['dob'])) $participantUpdate['dob'] = $data['dob'];
        if (isset($data['phone'])) $participantUpdate['phone_number'] = $data['phone'];

        $participant = $this->participantModel->getByUserId($userId);
        if ($participant) {
            $this->participantModel->update($participant['id'], $participantUpdate);
        } else {
            // If participant record does not exist, create one
            $this->participantModel->createParticipant($userId, $data['fullname'] ?? "", $data['dob'] ?? "", $data['phone'] ?? "");
        }
    }

    // Return updated profile
    return $this->getProfile();
}

}
?>
