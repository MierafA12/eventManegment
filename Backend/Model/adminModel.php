<?php
require_once "BaseModel.php";

class AdminModel extends BaseModel {
    public function __construct(mysqli $conn) {
        parent::__construct($conn, "users"); // ✅ pass mysqli connection first
    }

    // Example: get all admins
    public function getAdmins(): array {
        $result = $this->conn->query("SELECT * FROM users WHERE role='admin'");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function createAdmin($full_name, $username, $email, $password, $status = 'active'): bool {
        $hashed = password_hash($password, PASSWORD_DEFAULT);
        return $this->insert([
            "full_name" => $full_name,
            "username" => $username,
            "email" => $email,
            "password" => $hashed,
            "role" => "admin",
            "status" => $status
        ]);
    }

    public function updateAdmin($id, $full_name, $username, $email, $status): bool {
        $stmt = $this->conn->prepare("UPDATE users SET full_name=?, username=?, email=?, status=? WHERE id=?");
        $stmt->bind_param("ssssi", $full_name, $username, $email, $status, $id);
        return $stmt->execute();
    }

    public function deleteAdmin($id): bool {
        $stmt = $this->conn->prepare("DELETE FROM users WHERE id=? AND role='admin'");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    public function updateStatus($id, $status): bool {
        $stmt = $this->conn->prepare("UPDATE users SET status=? WHERE id=? AND role='admin'");
        $stmt->bind_param("si", $status, $id);
        return $stmt->execute();
    }
}
?>
