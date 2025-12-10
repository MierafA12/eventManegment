<?php
class BaseModel {
    protected mysqli $conn;
    protected string $table;

    public function __construct(mysqli $conn, string $table) {
        $this->conn = $conn;
        $this->table = $table;
    }

    public function all(): array {
        $result = $this->conn->query("SELECT * FROM {$this->table}");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function insert(array $data): bool {
        $columns = implode(", ", array_keys($data));
        $placeholders = implode(", ", array_fill(0, count($data), "?"));
        $types = str_repeat("s", count($data));
        $stmt = $this->conn->prepare("INSERT INTO {$this->table} ($columns) VALUES ($placeholders)");

        if (!$stmt) return false;

        $stmt->bind_param($types, ...array_values($data));
        return $stmt->execute();
    }

    public function findBy(array $conditions): ?array {
        $keys = array_keys($conditions);
        $where = implode(" AND ", array_map(fn($k) => "$k = ?", $keys));
        $types = str_repeat("s", count($conditions));
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE $where LIMIT 1");
        if (!$stmt) return null;
        $stmt->bind_param($types, ...array_values($conditions));
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc() ?: null;
    }
}
?>
