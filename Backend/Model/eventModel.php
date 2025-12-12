<?php

class EventModel {
    private mysqli $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    // ---------------- CRUD ----------------

    public function getEvents() {
        $result = $this->conn->query("SELECT * FROM events ORDER BY datetime DESC");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getEventById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM events WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function createEvent($title, $desc, $category, $eventType, $loc, $eventLink, $datetime, $fee, $capacity, $image = null) {
        $stmt = $this->conn->prepare("
            INSERT INTO events(title, description, category, eventType, location, eventLink, datetime, fee, capacity, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->bind_param(
            "sssssssdis",
            $title,
            $desc,
            $category,
            $eventType,
            $loc,
            $eventLink,
            $datetime,
            $fee,
            $capacity,
            $image
        );
        $stmt->execute();
    }

    public function updateEvent($id, $title, $desc, $category, $eventType, $loc, $eventLink, $datetime, $fee, $capacity, $image = null) {
        $stmt = $this->conn->prepare("
            UPDATE events
            SET title=?, description=?, category=?, eventType=?, location=?, eventLink=?, datetime=?, fee=?, capacity=?, image=?
            WHERE id=?
        ");
        $stmt->bind_param(
            "sssssssdisi",
            $title,
            $desc,
            $category,
            $eventType,
            $loc,
            $eventLink,
            $datetime,
            $fee,
            $capacity,
            $image,
            $id
        );
        $stmt->execute();
    }

    public function deleteEvent($id) {
        $stmt = $this->conn->prepare("DELETE FROM events WHERE id=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
    }

    // ---------------- Dashboard ----------------

    public function fetchDashboardStats() {
        $total = $this->conn->query("SELECT COUNT(*) AS total FROM events")->fetch_assoc()['total'];
        $upcoming = $this->conn->query("SELECT COUNT(*) AS upcoming FROM events WHERE datetime > NOW()")->fetch_assoc()['upcoming'];
        $past = $this->conn->query("SELECT COUNT(*) AS past FROM events WHERE datetime <= NOW()")->fetch_assoc()['past'];

        return [
            "totalEvents" => (int)$total,
            "upcomingEvents" => (int)$upcoming,
            "pastEvents" => (int)$past
        ];
    }

    public function fetchEventTrend() {
        $result = $this->conn->query("
            SELECT MONTHNAME(datetime) AS month, COUNT(*) AS events
            FROM events
            WHERE YEAR(datetime) = YEAR(CURDATE())
            GROUP BY MONTH(datetime)
            ORDER BY MONTH(datetime)
        ");
        $trend = [];
        while ($row = $result->fetch_assoc()) {
            $trend[] = [
                "month" => $row['month'],
                "events" => (int)$row['events']
            ];
        }
        return $trend;
    }

    // ---------------- Search & Filter ----------------

    public function searchEvents($query) {
        $searchTerm = "%" . $this->conn->real_escape_string($query) . "%";
        $stmt = $this->conn->prepare("
            SELECT * FROM events 
            WHERE title LIKE ? OR description LIKE ?
            ORDER BY datetime DESC
        ");
        $stmt->bind_param("ss", $searchTerm, $searchTerm);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function filterEvents($filters) {
        $conditions = [];
        $params = [];
        $types = "";

        // Filter by category
        if (!empty($filters['category'])) {
            $conditions[] = "category = ?";
            $params[] = $filters['category'];
            $types .= "s";
        }

        // Filter by event type
        if (!empty($filters['eventType'])) {
            $conditions[] = "eventType = ?";
            $params[] = $filters['eventType'];
            $types .= "s";
        }

        // Filter by status (upcoming/past)
        if (!empty($filters['status'])) {
            if ($filters['status'] === 'upcoming') {
                $conditions[] = "datetime > NOW()";
            } elseif ($filters['status'] === 'past') {
                $conditions[] = "datetime <= NOW()";
            }
        }

        // Filter by date range
        if (!empty($filters['startDate'])) {
            $conditions[] = "datetime >= ?";
            $params[] = $filters['startDate'];
            $types .= "s";
        }

        if (!empty($filters['endDate'])) {
            $conditions[] = "datetime <= ?";
            $params[] = $filters['endDate'];
            $types .= "s";
        }

        // Build query
        $sql = "SELECT * FROM events";
        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(" AND ", $conditions);
        }
        $sql .= " ORDER BY datetime DESC";

        // Execute
        if (!empty($params)) {
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param($types, ...$params);
            $stmt->execute();
            return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        } else {
            return $this->conn->query($sql)->fetch_all(MYSQLI_ASSOC);
        }
    }

    public function searchAndFilter($search, $filters) {
        $conditions = [];
        $params = [];
        $types = "";

        // Search condition
        if (!empty($search)) {
            $searchTerm = "%" . $this->conn->real_escape_string($search) . "%";
            $conditions[] = "(title LIKE ? OR description LIKE ?)";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= "ss";
        }

        // Filter by category
        if (!empty($filters['category'])) {
            $conditions[] = "category = ?";
            $params[] = $filters['category'];
            $types .= "s";
        }

        // Filter by event type
        if (!empty($filters['eventType'])) {
            $conditions[] = "eventType = ?";
            $params[] = $filters['eventType'];
            $types .= "s";
        }

        // Filter by status (upcoming/past)
        if (!empty($filters['status'])) {
            if ($filters['status'] === 'upcoming') {
                $conditions[] = "datetime > NOW()";
            } elseif ($filters['status'] === 'past') {
                $conditions[] = "datetime <= NOW()";
            }
        }

        // Filter by date range
        if (!empty($filters['startDate'])) {
            $conditions[] = "datetime >= ?";
            $params[] = $filters['startDate'];
            $types .= "s";
        }

        if (!empty($filters['endDate'])) {
            $conditions[] = "datetime <= ?";
            $params[] = $filters['endDate'];
            $types .= "s";
        }

        // Build query
        $sql = "SELECT * FROM events";
        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(" AND ", $conditions);
        }
        $sql .= " ORDER BY datetime DESC";

        // Execute
        if (!empty($params)) {
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param($types, ...$params);
            $stmt->execute();
            return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        } else {
            return $this->conn->query($sql)->fetch_all(MYSQLI_ASSOC);
        }
    }

    public function getEventsByCategory() {
        $result = $this->conn->query("
            SELECT category, COUNT(*) AS count
            FROM events
            GROUP BY category
            ORDER BY count DESC
        ");
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
