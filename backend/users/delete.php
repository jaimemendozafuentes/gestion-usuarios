<?php
require_once __DIR__ . '/../config/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// ✅ Manejo de solicitud preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit(0);
}

// ✅ Procesamiento del DELETE
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'ID de usuario no proporcionado']);
  exit;
}

$id = $data['id'];

try {
  $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
  $stmt->execute([$id]);

  echo json_encode(['success' => true, 'message' => 'Usuario eliminado correctamente']);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'message' => 'Error al eliminar usuario',
    'error' => $e->getMessage()
  ]);
}
