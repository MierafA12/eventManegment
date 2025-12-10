<?php
require_once __DIR__ . '/../Model/statusModel.php';

class StatusController {
    private StatusModel $model;

    public function __construct(StatusModel $model) {
        $this->model = $model;
    }

    public function getStats() {
        return ["status" => "success", "data" => $this->model->getStats()];
    }
}
?>
