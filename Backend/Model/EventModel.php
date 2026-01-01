<?php
require_once "BaseModel.php";

class EventModel extends BaseModel {

    public function __construct(mysqli $conn) {
        parent::__construct($conn, "events");
    }

    public function createEvent(array $data): bool {
        return $this->insert($data);
    }

    public function allEvents(?int $userId = null): array {
        if ($userId) {
            $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE user_id = ? ORDER BY created_at DESC");
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        }
        return $this->all();
    }

    public function getActiveEvents(): array {
        $result = $this->conn->query("SELECT * FROM {$this->table} WHERE status='active'");
        if (!$result) return [];
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getDashboardStats(?int $userId = null): array {
        $now = date('Y-m-d');
        $where = $userId ? "WHERE user_id = $userId" : "";
        
        $total = $this->conn->query("SELECT COUNT(*) as count FROM events $where")->fetch_assoc()['count'] ?? 0;
        
        $upcomingWhere = $userId ? "AND user_id = $userId" : "";
        $upcoming = $this->conn->query("SELECT COUNT(*) as count FROM events WHERE event_date >= '$now' $upcomingWhere")->fetch_assoc()['count'] ?? 0;
        
        $pastWhere = $userId ? "AND user_id = $userId" : "";
        $past = $this->conn->query("SELECT COUNT(*) as count FROM events WHERE event_date < '$now' $pastWhere")->fetch_assoc()['count'] ?? 0;

        return [
            "totalEvents" => (int)$total,
            "upcomingEvents" => (int)$upcoming,
            "pastEvents" => (int)$past
        ];
    }

    public function getEventTrend(?int $userId = null): array {
        $whereClause = $userId ? "AND user_id = $userId" : "";
        $sql = "SELECT MONTHNAME(event_date) as month, COUNT(*) as events 
                FROM events 
                WHERE event_date >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
                $whereClause
                GROUP BY YEAR(event_date), MONTH(event_date)
                ORDER BY MIN(event_date) ASC";
        $result = $this->conn->query($sql);
        if (!$result) return [];
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getFiltered($search, $category, $status, ?int $userId = null): array {
        $sql = "SELECT * FROM events WHERE 1=1";
        if ($userId) {
            $sql .= " AND user_id = $userId";
        }
        if ($search) {
            $search = $this->conn->real_escape_string($search);
            $sql .= " AND (title LIKE '%$search%' OR description LIKE '%$search%')";
        }
        if ($category && $category !== 'all') {
            $category = $this->conn->real_escape_string($category);
            $sql .= " AND category = '$category'";
        }
        if ($status && $status !== 'all') {
            $status = $this->conn->real_escape_string($status);
            $sql .= " AND status = '$status'";
        }

        $result = $this->conn->query($sql);
        if (!$result) return [];
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function updateEvent($id, $data, ?int $userId = null): bool {
        $conditions = ["id" => $id];
        if ($userId) $conditions["user_id"] = $userId;
        return $this->update($data, $conditions);
    }

    public function deleteEvent($id, ?int $userId = null): bool {
        $sql = "DELETE FROM events WHERE id = ?";
        if ($userId) $sql .= " AND user_id = ?";
        
        $stmt = $this->conn->prepare($sql);
        if ($userId) {
            $stmt->bind_param("ii", $id, $userId);
        } else {
            $stmt->bind_param("i", $id);
        }
        return $stmt->execute();
    }
}
?>
