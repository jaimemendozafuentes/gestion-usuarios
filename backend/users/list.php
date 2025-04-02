<?php
require_once __DIR__ . '/../config/config.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: " . $_ENV['CORS_ORIGIN']);
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

// ✅ Incluir después de enviar headers
require_once __DIR__ . '/../middlewares/authenticate.php';

try {
  $stmt = $pdo->query("SELECT id, email, created_at FROM users ORDER BY id DESC");
  $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode([
    'success' => true,
    'users' => $users
  ]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'message' => 'Error al obtener usuarios',
    'error' => $e->getMessage()
  ]);
}
