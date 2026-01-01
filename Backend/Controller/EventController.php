<?php
require_once "../Model/EventModel.php";
require_once "../helpers/jwt.php";

class EventController {
    private EventModel $model;

    public function __construct(mysqli $db) {
        $this->model = new EventModel($db);
    }

    public function createEvent(array $headers) {
        $decoded = decodeJwtToken($headers);
        if (!$decoded) {
            return ["success" => false, "message" => "Unauthorized"];
        }

        $userId = $decoded['id'];

        $title       = $_POST['title'] ?? null;
        $description = $_POST['description'] ?? null;
        $category    = $_POST['category'] ?? null;
        $eventType   = $_POST['eventType'] ?? null;
        $datetime    = $_POST['datetime'] ?? null;
        $fee         = $_POST['fee'] ?? 0;
        $location    = $_POST['location'] ?? null;
        $eventLink   = $_POST['eventLink'] ?? null;
        $capacity    = $_POST['capacity'] ?? null;

        $required = ['title','description','category','eventType','datetime'];
        foreach ($required as $field) {
            if (empty($$field)) {
                return ["success" => false, "message" => "$field is required"];
            }
        }

        if (strpos($datetime, 'T') === false) {
            return ["success" => false, "message" => "Invalid datetime format"];
        }
        [$date, $time] = explode("T", $datetime);

        $imageName = null;
        if (isset($_FILES['image']) && $_FILES['image']['name']) {
            $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $imageName = uniqid("event_") . "." . $ext;
            $uploadDir = "uploads/events/";
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }
            move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $imageName);
        }

        $data = [
            "user_id"     => $userId,
            "title"       => $title,
            "description" => $description,
            "category"    => $category,
            "eventType"   => $eventType,
            "location"    => $eventType === "Physical" ? $location : null,
            "eventLink"   => $eventType === "Online" ? $eventLink : null,
            "event_date"  => $date,
            "event_time"  => $time,
            "fee"         => $fee,
            "capacity"    => $eventType === "Physical" ? $capacity : null,
            "image"       => $imageName,
            "status"      => "active"
        ];

        // Start transaction: create event and notify superadmin atomically
        $conn = $this->model->getConnection();
        $conn->begin_transaction();
        try {
            $created = $this->model->createEvent($data);
            if (!$created) {
                throw new Exception("Event insert failed");
            }

            // get the inserted event id
            $newEventId = (int)$conn->insert_id;

            // If creator is an admin, notify superadmin with the real entity_id
            if ($decoded['role'] === 'admin') {
                require_once "../Model/NotificationModel.php";
                $notifModel = new NotificationModel($conn);
                $notifModel->create([
                    'user_id' => $userId,
                    'role' => 'superadmin',
                    'type' => 'event_created',
                    'title' => 'New Event Created',
                    'message' => "An admin has created a new event: " . $title,
                    'entity_type' => 'event',
                    'entity_id' => $newEventId
                ]);
            }

            $conn->commit();
            return ["success" => true, "message" => "Event created successfully", "event_id" => $newEventId];
        } catch (Exception $e) {
            $conn->rollback();
            error_log("Event creation failed: " . $e->getMessage());
            return ["success" => false, "message" => "Failed to create event"];
        }
    }

    public function getAllEvents(array $headers) {
        $decoded = decodeJwtToken($headers);
        $role = $decoded['role'];
        $userId = ($role === 'admin') ? $decoded['id'] : null;

        $events = $this->model->allEvents($userId);
        return ["success" => true, "events" => $events];
    }

    public function getPublicEvents() {
        $events = $this->model->getActiveEvents();
        return ["success" => true, "events" => $events];
    }

    public function getEvent() {
        $id = (int)($_GET['id'] ?? 0);
        if (!$id) {
            return ["success" => false, "message" => "Event ID is required"];
        }

        $sql = "
            SELECT *, 
            (SELECT IFNULL(SUM(quantity), 0) FROM tickets WHERE event_id = events.id AND payment_status = 'paid') as registered_count
            FROM events 
            WHERE id = ? 
            LIMIT 1
        ";

        $stmt = $this->model->getConnection()->prepare($sql);
        if (!$stmt) {
            return ["success" => false, "message" => "Query preparation failed"];
        }

        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $event = $result->fetch_assoc();

        if (!$event) {
            return ["success" => false, "message" => "Event not found"];
        }

        $event['id'] = (int)$event['id'];
        $event['registered_count'] = (int)$event['registered_count'];
        $event['fee'] = (float)$event['fee'];
        if (isset($event['capacity'])) {
            $event['capacity'] = ($event['capacity'] !== null) ? (int)$event['capacity'] : null;
        }

        return ["success" => true, "data" => $event];
    }

    public function getDashboardStats(array $headers) {
        $decoded = decodeJwtToken($headers);
        $role = $decoded['role'];
        $userId = ($role === 'admin') ? $decoded['id'] : null;

        $stats = $this->model->getDashboardStats($userId);
        return ["success" => true, "stats" => $stats];
    }

    public function getEventTrend(array $headers) {
        $decoded = decodeJwtToken($headers);
        $role = $decoded['role'];
        $userId = ($role === 'admin') ? $decoded['id'] : null;

        $trend = $this->model->getEventTrend($userId);
        return ["success" => true, "eventData" => $trend];
    }

    public function getFilteredEvents(array $headers = []) {
        $search   = $_GET['search'] ?? null;
        $category = $_GET['category'] ?? null;
        $status   = $_GET['status'] ?? null;

        $userId = null;
        if (!empty($headers)) {
            try {
                $decoded = decodeJwtToken($headers);
                if ($decoded && $decoded['role'] === 'admin') {
                    $userId = $decoded['id'];
                }
            } catch (Exception $e) {
            }
        }

        $events = $this->model->getFiltered($search, $category, $status, $userId);
        return ["success" => true, "events" => $events];
    }

    public function updateEvent(array $headers) {
        $decoded = decodeJwtToken($headers);
        $role = $decoded['role'];
        $userId = ($role === 'admin') ? $decoded['id'] : null;

        $id = $_POST['id'] ?? null;
        if (!$id) return ["success" => false, "message" => "ID required"];

        $data = [];
        $fields = ['title', 'description', 'category', 'eventType', 'location', 'eventLink', 'fee', 'capacity', 'status'];
        foreach ($fields as $f) {
            if (isset($_POST[$f])) $data[$f] = $_POST[$f];
        }

        if (isset($data['eventType'])) {
            if ($data['eventType'] === 'Online') {
                $data['location'] = null;
                $data['capacity'] = null;
            } else if ($data['eventType'] === 'Physical') {
                $data['eventLink'] = null;
            }
        }

        if (isset($_POST['datetime']) && strpos($_POST['datetime'], 'T') !== false) {
            [$date, $time] = explode("T", $_POST['datetime']);
            $data['event_date'] = $date;
            $data['event_time'] = $time;
        }

        if (isset($_FILES['image']) && $_FILES['image']['name']) {
            $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $imageName = uniqid("event_") . "." . $ext;
            $uploadDir = "uploads/events/";
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
            move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $imageName);
            $data['image'] = $imageName;
        }

        if ($this->model->updateEvent($id, $data, $userId)) {
            return ["success" => true, "message" => "Event updated"];
        }
        return ["success" => false, "message" => "Update failed or unauthorized"];
    }

    public function deleteEvent(array $headers) {
        $decoded = decodeJwtToken($headers);
        $role = $decoded['role'];
        $userId = ($role === 'admin') ? $decoded['id'] : null;

        $id = $_POST['id'] ?? null;
        if (!$id) return ["success" => false, "message" => "ID required"];
        if ($this->model->deleteEvent($id, $userId)) {
            return ["success" => true, "message" => "Event deleted"];
        }
        return ["success" => false, "message" => "Delete failed or unauthorized"];
    }
}
?>