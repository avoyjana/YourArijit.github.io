<?php
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "user_count_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Increment the user count
$sql = "UPDATE user_count SET count = count + 1 WHERE id = 1";
$conn->query($sql);

// Retrieve the current count
$sql = "SELECT count FROM user_count WHERE id = 1";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$current_count = $row['count'];

$conn->close();

// Return the current count as JSON
header('Content-Type: application/json');
echo json_encode(['count' => $current_count]);
?>
