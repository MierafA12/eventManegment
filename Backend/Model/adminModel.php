<?php

class AdminModel
{
    private $conn;
    private $table = "users";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Get all admins
    public function getAdmins()
    {
        $sql = "SELECT id, username, full_name, email, status 
                FROM {$this->table} 
                WHERE role = 'admin'";
        $stmt = $this->conn->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Create new admin
    public function createAdmin($full_name, $username, $email, $password)
    {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $sql = "INSERT INTO {$this->table} 
                (full_name, username, email, password, role, status, created_at)
                VALUES (:full_name, :username, :email, :password, 'admin', 'active', NOW())";

        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([
            ":full_name" => $full_name,
            ":username"  => $username,
            ":email"     => $email,
            ":password"  => $hashedPassword
        ]);
    }

    // Update admin info
    public function updateAdmin($id, $full_name, $username, $email, $status)
    {
        $sql = "UPDATE {$this->table} 
                SET full_name = :full_name, 
                    username = :username, 
                    email = :email, 
                    status = :status
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([
            ":full_name" => $full_name,
            ":username"  => $username,
            ":email"     => $email,
            ":status"    => $status,
            ":id"        => $id
        ]);
    }

    // Toggle status
    public function updateStatus($id, $status)
    {
        $sql = "UPDATE {$this->table} SET status = :status WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([":status" => $status, ":id" => $id]);
    }

    // Delete admin
    public function deleteAdmin($id)
    {
        $sql = "DELETE FROM {$this->table} WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([":id" => $id]);
    }
}
