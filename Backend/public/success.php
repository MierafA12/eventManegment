<?php
$tx_ref = $_GET['tx_ref'] ?? 'Unknown';
$event = $_GET['event'] ?? 'Your Event';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful!</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f0f8ff; }
        .success { color: #28a745; font-size: 2.5em; margin-bottom: 20px; }
        .details { font-size: 1.2em; background: white; padding: 30px; border-radius: 15px; display: inline-block; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="details">
        <h1 class="success">Payment Successful! 🎉</h1>
        <p>Transaction Reference: <strong><?= htmlspecialchars($tx_ref) ?></strong></p>
        <p>Event: <strong><?= htmlspecialchars($event) ?></strong></p>
        <p>Thank you! Your ticket(s) have been generated.</p>
        <a href="/dashboard" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 8px;">Go to Dashboard</a>
    </div>
</body>
</html>