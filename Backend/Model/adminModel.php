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
     public function getAdminById($id) {
    $stmt = $this->conn->prepare("SELECT * FROM users WHERE id = ? AND role IN ('admin', 'superadmin')");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc(); 
}
// AdminModel.php (or UserModel.php if shared)
public function updatePassword($id, $hashedPassword): bool {
    // Allow admin, superadmin, and participant to change password
    $stmt = $this->conn->prepare(
        "UPDATE users SET password=? WHERE id=? AND role IN ('admin','superadmin','participant')"
    );
    $stmt->bind_param("si", $hashedPassword, $id);
    return $stmt->execute();
}

public function getUserById($id) {
    $stmt = $this->conn->prepare("SELECT * FROM users WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
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
    public function getEventsSummary(): array {
        $sql = "
            SELECT 
                e.id, 
                e.title AS event_name, 
                u.full_name AS organizer, 
                COUNT(ra.id) AS total_attendance
            FROM events e
            JOIN users u ON e.user_id = u.id
            LEFT JOIN tickets t ON t.event_id = e.id
            LEFT JOIN registration_attendees ra ON ra.registration_id = t.id
            GROUP BY e.id
            ORDER BY e.event_date DESC
        ";

        $result = $this->conn->query($sql);
        if (!$result) return [];
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getRegistrationsByEvent($adminId, $role): array {
        $sql = "
            SELECT 
                e.id as event_id,
                e.title as event_name,
                e.event_date,
                e.event_time,
                ra.attendee_name as fullName,
                ra.attendee_email as email,
                ra.ticket_code,
                ra.id as attendee_id,
                t.ticket_type,
                t.payment_status
            FROM events e
            LEFT JOIN tickets t ON t.event_id = e.id
            LEFT JOIN registration_attendees ra ON ra.registration_id = t.id
        ";

        if ($role !== 'superadmin') {
            $sql .= " WHERE e.user_id = ?";
        }

        $sql .= " ORDER BY e.id, ra.id";

        $stmt = $this->conn->prepare($sql);

        if ($role !== 'superadmin') {
            $stmt->bind_param("i", $adminId);
        }

        $stmt->execute();
        $result = $stmt->get_result();
        
        if (!$result) return [];
        
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $events = [];
        
        foreach ($data as $row) {
            $eventId = $row['event_id'];
            if (!isset($events[$eventId])) {
                $events[$eventId] = [
                    'id' => $eventId,
                    'name' => $row['event_name'],
                    'date' => $row['event_date'],
                    'time' => $row['event_time'],
                    'registeredUsers' => []
                ];
            }
            if ($row['attendee_id']) {
                $events[$eventId]['registeredUsers'][] = [
                    'id' => $row['attendee_id'],
                    'fullName' => $row['fullName'],
                    'email' => $row['email'],
                    'ticketCode' => $row['ticket_code'],
                    'ticketType' => $row['ticket_type'],
                    'paymentStatus' => $row['payment_status']
                ];
            }
        }
        
        return array_values($events);
    }

}

?>
