<?php
require_once "BaseModel.php";

require_once "BaseModel.php";

class UserModel extends BaseModel {
    public function __construct(mysqli $conn) {
        parent::__construct($conn, "users"); // ✅ pass mysqli first, then table name
    }

    public function createUser($username, $email, $password, $role="participant") {
        $hashed = password_hash($password, PASSWORD_DEFAULT);
        return $this->insert([
            "username" => $username,
            "email" => $email,
            "password" => $hashed,
            "role" => $role
        ]);
    }

    public function getByEmail($email) {
        return $this->findBy(["email" => $email]);
    }
   public function getUserById($id) {
    $rows = $this->select(["id", "full_name", "username", "email", "role"], ["id" => $id]);
    return $rows ? $rows[0] : null; 
}
}


?>
