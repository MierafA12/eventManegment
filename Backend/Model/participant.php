<?php

class Participant {
    
    private $conn;
    private $table = "participants";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function createParticipant($user_id, $fullname, $dob, $phone) {
        $sql = "INSERT INTO participants (user_id, dob, phone_number)
                VALUES (:user_id, :dob, :phone)";
        
        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":user_id" => $user_id,
            ":dob" => $dob,
            ":phone" => $phone,
        ]);
    }
}
