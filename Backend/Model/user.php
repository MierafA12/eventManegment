<?php
class User {
    private $conn;
    private $table = "users";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function createUser($username, $email, $password, $role = "participant") {
        $hashed = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $this->conn->prepare(
            "INSERT INTO users (username, email, password, role) 
             VALUES (:username, :email, :password, :role)"
        );

        return $stmt->execute([
            ":username" => $username,
            ":email" => $email,
            ":password" => $hashed,
            ":role" => $role
        ]);
    }

    public function getByEmail($email) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute([":email" => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
