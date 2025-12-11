<?php
require_once "../Model/eventModel.php";
require_once "../config/database.php";
require_once "../Middleware/AuthMiddleware.php";


class EventController {
    private EventModel $eventModel;

    public function __construct($conn) {
        $this->eventModel = new EventModel($conn);
    }

    // ---------------- CRUD Operations ----------------

    // Get all events
    public function getAll() {
        $events = $this->eventModel->getEvents();
        echo json_encode($events);
    }

    // Get single event
    public function getOne() {
        $id = $_GET['id'] ?? 0;
        $event = $this->eventModel->getEventById($id);
        echo json_encode($event);
    }

    // Create event
    public function create() {
        // Handle file upload
        $imagePath = null;
        if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
            $targetDir = "../uploads/";
            if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);
            $fileName = time() . "_" . basename($_FILES["image"]["name"]);
            $targetFile = $targetDir . $fileName;
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
                $imagePath = $fileName;
            }
        }

        $data = $_POST;

        $this->eventModel->createEvent(
            $data['title'],
            $data['description'],
            $data['category'],
            $data['eventType'],
            $data['location'] ?? null,
            $data['eventLink'] ?? null,
            $data['datetime'],
            $data['fee'],
            $data['capacity'] ?? null,
            $imagePath
        );

        echo json_encode(['success' => true, 'message' => 'Event created']);
    }

    // Update event
    public function update() {
        $imagePath = null;
        if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
            $targetDir = "../uploads/";
            if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);
            $fileName = time() . "_" . basename($_FILES["image"]["name"]);
            $targetFile = $targetDir . $fileName;
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
                $imagePath = $fileName;
            }
        }

        $data = $_POST;

        $this->eventModel->updateEvent(
            $data['id'],
            $data['title'],
            $data['description'],
            $data['category'],
            $data['eventType'],
            $data['location'] ?? null,
            $data['eventLink'] ?? null,
            $data['datetime'],
            $data['fee'],
            $data['capacity'] ?? null,
            $imagePath
        );

        echo json_encode(['success' => true, 'message' => 'Event updated']);
    }

    // Delete event
    public function delete() {
        $id = $_POST['id'] ?? 0;
        $this->eventModel->deleteEvent($id);
        echo json_encode(['success' => true, 'message' => 'Event deleted']);
    }

    // ---------------- Dashboard Stats ----------------

    public function getDashboardStats() {
        $stats = $this->eventModel->fetchDashboardStats();
        echo json_encode(['success' => true, 'stats' => $stats]);
    }

    public function getEventTrend() {
        $trend = $this->eventModel->fetchEventTrend();
        echo json_encode(['success' => true, 'eventData' => $trend]);
    }
}

// ---------------- Route Handling ----------------

$conn = (new Database())->getConnection();
$controller = new EventController($conn);

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'getAll': $controller->getAll(); break;
    case 'getOne': $controller->getOne(); break;
    case 'create': $controller->create(); break;
    case 'update': $controller->update(); break;
    case 'delete': $controller->delete(); break;
    case 'getStats': $controller->getDashboardStats(); break;
    case 'getTrend': $controller->getEventTrend(); break;
    default: echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
?>
