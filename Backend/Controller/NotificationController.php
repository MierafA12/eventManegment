<?php
require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../Model/notificationModel.php';

class NotificationController {
    private NotificationModel $model;

    public function __construct(NotificationModel $model) {
        $this->model = $model;
    }

    public function getMyNotifications() {
        $headers = getallheaders();
        $user = decodeJwtToken($headers);

        return [
            "success" => true,
            "notifications" => $this->model->getForUser(
                $user['id'],
                $user['role']
            )
        ];
    }

    public function markRead($request) {
        $data = json_decode($request, true);
        $this->model->markAsRead($data['id']);
        return ["success" => true];
    }
}
