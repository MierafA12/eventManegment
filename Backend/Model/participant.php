<?php
class Participant {
    private $conn;
    private $table = "participants";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create participant record
    public function createParticipant($user_id, $full_name, $dob, $phone_number) {
        $stmt = $this->conn->prepare("
            INSERT INTO participants (user_id, full_name, dob, phone_number)
            VALUES (:user_id, :full_name, :dob, :phone_number)
        ");
        return $stmt->execute([
            ":user_id" => $user_id,
            ":full_name" => $full_name,
            ":dob" => $dob,
            ":phone_number" => $phone_number
        ]);
    }
}

// User model (you can put in User.php)
// class User {
//     private $conn;
//     private $table = "users";

//     public function __construct($db) {
//         $this->conn = $db;
//     }

//     // Create user
//     public function createUser($username, $email, $password) {
//         $stmt = $this->conn->prepare("
//             INSERT INTO users (username, email, password)
//             VALUES (:username, :email, :password)
//         ");
//         return $stmt->execute([
//             ":username" => $username,
//             ":email" => $email,
//             ":password" => password_hash($password, PASSWORD_BCRYPT),
//         ]);
//     }

//     // Get user by email
//     public function getByEmail($email) {
//         $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = :email");
//         $stmt->execute([":email" => $email]);
//         return $stmt->fetch(PDO::FETCH_ASSOC);
//     }
// }
?>
