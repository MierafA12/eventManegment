<?php
require_once __DIR__ . "/../helpers/jwt.php";

class UserController {
    private $userModel;
    private $participantModel;

    public function __construct($userModel, $participantModel) {
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
            return ["success" => false, "message" => "User not found"];
        }

        unset($user['password']);

        if ($role === "participant") {
            $participant = $this->participantModel->getByUserId($userId);
            if ($participant) {
                $user = array_merge($user, $participant);
            }
        }

        return [
            "success" => true,
            "profile" => $user
        ];
    }

    public function updateProfile($request) {
        $headers = getallheaders();
        $payload = decodeJwtToken($headers);

        $userId = $payload['id'];
        $role = $payload['role'];

        $data = is_array($request) ? $request : json_decode($request, true);
        if (!$data) {
            return ["success" => false, "message" => "Invalid request body"];
        }

        $userUpdate = [];
        if (isset($data['username'])) $userUpdate['username'] = $data['username'];
        if (isset($data['email'])) $userUpdate['email'] = $data['email'];

        if (!empty($userUpdate)) {
            $this->userModel->updateUser($userId, $userUpdate);
        }

        if ($role === "participant") {
            $participantUpdate = [];
            if (isset($data['fullname'])) $participantUpdate['full_name'] = $data['fullname'];
            if (isset($data['dob'])) $participantUpdate['dob'] = $data['dob'];
            if (isset($data['phone'])) $participantUpdate['phone_number'] = $data['phone'];

            $participant = $this->participantModel->getByUserId($userId);

            if ($participant) {
                $this->participantModel->updateParticipant($participant['id'], $participantUpdate);
            } else {
                $this->participantModel->createParticipant(
                    $userId,
                    $data['fullname'] ?? "",
                    $data['dob'] ?? "",
                    $data['phone'] ?? ""
                );
            }
        }

        $updated = $this->getProfile();

        return [
            "success" => true,
            "message" => "Profile updated successfully",
            "profile" => $updated['profile']
        ];
    }
}
