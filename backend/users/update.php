<?php
require_once __DIR__ . '/../config/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// ✅ Preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

// ✅ Recibir y validar datos
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id']) || !isset($data['email'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
  exit;
}

$id = $data['id'];
$email = $data['email'];

// ✅ Actualizar usuario
try {
  $stmt = $pdo->prepare("UPDATE users SET email = ? WHERE id = ?");
  $stmt->execute([$email, $id]);

  echo json_encode(['success' => true, 'message' => 'Usuario actualizado correctamente']);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Error al actualizar usuario']);
}
