<?php

class AuthMiddleware {
    public static function check() {
        session_start();
        if (!isset($_SESSION["user"])) {
            die(json_encode(["status" => "error", "message" => "Unauthorized"]));
        }
    }
}
