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
}
