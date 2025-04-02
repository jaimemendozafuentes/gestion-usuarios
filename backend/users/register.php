<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../lib/jwt/src/JWT.php';
require_once __DIR__ . '/../lib/jwt/src/Key.php';

use Firebase\JWT\JWT;

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: " . $_ENV['CORS_ORIGIN']);
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

$data = json_decode(file_get_contents('php://input'), true);

// Validación básica
if (!isset($data['email'], $data['password'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Email y contraseña son obligatorios']);
  exit;
}

$email = $data['email'];
$password = $data['password'];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['error' => 'Formato de email no válido']);
  exit;
}

if (strlen($password) < 8) {
  http_response_code(400);
  echo json_encode(['error' => 'La contraseña debe tener al menos 8 caracteres']);
  exit;
}

// Comprobar si ya existe el usuario
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->fetch()) {
  http_response_code(409);
  echo json_encode(['error' => 'El email ya está registrado']);
  exit;
}

// Registrar usuario
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
$stmt->execute([$email, $hashedPassword]);
$userId = $pdo->lastInsertId();

// Generar token
$payload = [
  'sub' => $userId,
  'email' => $email,
  'iat' => time(),
  'exp' => time() + 3600
];
$token = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

// Devolver token
echo json_encode([
  'success' => true,
  'message' => 'Usuario registrado correctamente',
  'token' => $token
]);
