<?php
class StatusModel {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getStats() {
        $stmt = $this->conn->query("SELECT COUNT(*) AS total FROM users WHERE role='admin'");
        $totalAdmins = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        $stmt = $this->conn->query("SELECT COUNT(*) AS active FROM users WHERE role='admin' AND status='active'");
        $activeAdmins = $stmt->fetch(PDO::FETCH_ASSOC)['active'];

        $stmt = $this->conn->query("SELECT COUNT(*) AS inactive FROM users WHERE role='admin' AND status='inactive'");
        $inactiveAdmins = $stmt->fetch(PDO::FETCH_ASSOC)['inactive'];

        $stmt = $this->conn->query("SELECT COUNT(*) AS events FROM events");
        $totalEvents = $stmt->fetch(PDO::FETCH_ASSOC)['events'];

        return [
            "totalAdmins" => (int)$totalAdmins,
            "activeAdmins" => (int)$activeAdmins,
            "inactiveAdmins" => (int)$inactiveAdmins,
            "totalEvents" => (int)$totalEvents
        ];
    }
}
