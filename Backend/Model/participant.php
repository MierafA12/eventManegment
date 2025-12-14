<?php
require_once "BaseModel.php";


class ParticipantModel extends BaseModel {
    public function __construct(mysqli $conn) {
        parent::__construct($conn, "participants"); // ✅ pass mysqli first
    }

    public function createParticipant($user_id, $full_name, $dob, $phone_number) {
        return $this->insert([
            "user_id" => $user_id,
            "full_name" => $full_name,
            "dob" => $dob,
            "phone_number" => $phone_number
        ]);
    }
}

?>
