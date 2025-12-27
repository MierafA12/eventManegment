<?php
require_once __DIR__ . '/../Model/notificationModel.php';

class NotificationService {
    private NotificationModel $model;

    public function __construct(NotificationModel $model) {
        $this->model = $model;
    }

    public function notifyUser(
        int $userId,
        string $type,
        string $title,
        string $message,
        string $entityType = null,
        int $entityId = null
    ) {
        return $this->model->create([
            "user_id" => $userId,
            "role" => null,
            "type" => $type,
            "title" => $title,
            "message" => $message,
            "entity_type" => $entityType,
            "entity_id" => $entityId
        ]);
    }

    public function notifyRole(
        string $role,
        string $type,
        string $title,
        string $message,
        string $entityType = null,
        int $entityId = null
    ) {
        return $this->model->create([
            "user_id" => null,
            "role" => $role,
            "type" => $type,
            "title" => $title,
            "message" => $message,
            "entity_type" => $entityType,
            "entity_id" => $entityId
        ]);
    }
}
