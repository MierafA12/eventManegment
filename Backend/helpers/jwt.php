<?php
require_once __DIR__ . '/../vendor/autoload.php'; // correct path
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function generateJwtToken($userId, $role) {
    $secretKey = "thisIsASuperSecretKey1234567890!@#$%"; // replace with your secret
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600; // 1 hour

    $payload = [
        "iat" => $issuedAt,
        "exp" => $expirationTime,
        "sub" => $userId,
        "role" => $role
    ];

    return JWT::encode($payload, $secretKey, 'HS256');
}
