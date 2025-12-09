<?php

class AdminModel
{
    private $conn;
    private $table = "users";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Get all admins + superadmins
   public function getAdmins()
    {
    $sql = "SELECT id, username, full_name, status 
            FROM {$this->table}
            WHERE role = 'admin'";

    $stmt = $this->conn->query($sql);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
   }

    // Update status
    public function updateStatus($id, $status)
    {
        $sql = "UPDATE {$this->table} SET status = :status WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([
            ":status" => $status,
            ":id" => $id
        ]);
    }

    // Update admin info
    public function updateAdmin($id, $username)
    {
        $sql = "UPDATE {$this->table} 
                SET username = :username 
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([
            ":username" => $username,
            ":id" => $id
        ]);
    }

    // Delete admin
    public function deleteAdmin($id)
    {
        $sql = "DELETE FROM {$this->table} WHERE id = :id";

        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([":id" => $id]);
    }
}
