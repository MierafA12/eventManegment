<?php
class User {
    private $conn;
    private $table = "users";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function createUser($username, $email, $password, $role = "participant") {
        // Hash password before storing
        $hashed = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $this->conn->prepare(
            "INSERT INTO users (username, email, password, role) VALUES (:username, :email, :password, :role)"
        );

        return $stmt->execute([
            ":username" => $username,
            ":email" => $email,
            ":password" => $hashed,
            ":role" => $role
        ]);
    }

    public function getByUsername($username) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute([":username" => $username]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
