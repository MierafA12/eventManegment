<?php
require_once "BaseModel.php";

class StatusModel extends BaseModel {
    public function __construct(mysqli $conn) {
        parent::__construct($conn, "users"); // pass mysqli connection
    }

    public function getStats(): array {
        // Total admins
        $result = $this->conn->query("SELECT COUNT(*) AS total FROM users WHERE role='admin'");
        $totalAdmins = $result->fetch_assoc()['total'];

        // Active admins
        $result = $this->conn->query("SELECT COUNT(*) AS active FROM users WHERE role='admin' AND status='active'");
        $activeAdmins = $result->fetch_assoc()['active'];

        // Inactive admins
        $result = $this->conn->query("SELECT COUNT(*) AS inactive FROM users WHERE role='admin' AND status='inactive'");
        $inactiveAdmins = $result->fetch_assoc()['inactive'];

        // Total events
        $result = $this->conn->query("SELECT COUNT(*) AS events FROM events");
        $totalEvents = $result->fetch_assoc()['events'];

        return [
            "totalAdmins" => (int)$totalAdmins,
            "activeAdmins" => (int)$activeAdmins,
            "inactiveAdmins" => (int)$inactiveAdmins,
            "totalEvents" => (int)$totalEvents
        ];
    }
}

?>
