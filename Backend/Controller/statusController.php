<?php
require_once __DIR__ . '/../Model/statusModel.php';

class StatusController {
    private $model;

    public function __construct($db) {
        $this->model = new StatusModel($db);
    }

    public function getStats() {
        return [
            "status" => "success",
            "data" => $this->model->getStats()
        ];
    }
}
