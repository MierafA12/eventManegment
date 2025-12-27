<?php
class NotificationModel {
    private mysqli $conn;

    public function __construct(mysqli $conn) {
        $this->conn = $conn;
    }

    public function create(array $data): bool {
        $stmt = $this->conn->prepare("
            INSERT INTO notifications
            (user_id, role, type, title, message, entity_type, entity_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->bind_param(
            "isssssi",
            $data['user_id'],
            $data['role'],
            $data['type'],
            $data['title'],
            $data['message'],
            $data['entity_type'],
            $data['entity_id']
        );

        return $stmt->execute();
    }

    public function getForUser(int $userId, string $role): array {
    $stmt = $this->conn->prepare("
        SELECT *
        FROM notifications
        WHERE 
            (user_id = ?)
            OR (role = ?)
        ORDER BY created_at DESC
    ");

    $stmt->bind_param("is", $userId, $role);
    $stmt->execute();

    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
}


    public function markAsRead(int $id): bool {
        $stmt = $this->conn->prepare(
            "UPDATE notifications SET is_read = 1 WHERE id = ?"
        );
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
