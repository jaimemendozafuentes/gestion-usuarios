<?php
require_once __DIR__ . '/../config/config.php'; // carga la conexión segura

// 🔐 CORS (para desarrollo)
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: " . $_ENV['CORS_ORIGIN']);
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

//Manejo del preflight request (Angular envía un OPTIONS antes del POST)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

//Leer JSON enviado desde Angular
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !isset($data['password'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Email y contraseña son obligatorios']);
  exit;
}

$email = $data['email'];
$password = $data['password'];

// Verificar si ya existe el usuario
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->fetch()) {
  http_response_code(409);
  echo json_encode(['error' => 'El email ya está registrado']);
  exit;
}

// ✅ Insertar usuario
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
$stmt->execute([$email, $hashedPassword]);

echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
