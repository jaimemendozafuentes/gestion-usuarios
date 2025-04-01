<?php
require_once __DIR__ . '/../vendor/autoload.php';


use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$required = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASS', 'CORS_ORIGIN'];
foreach ($required as $key) {
  if (!isset($_ENV[$key])) {
    http_response_code(500);
    echo json_encode(['error' => "Falta la variable de entorno: $key"]);
    exit;
  }
}


try {
  $pdo = new PDO(
    "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};charset=utf8mb4",
    $_ENV['DB_USER'],
    $_ENV['DB_PASS']
  );
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Error al conectar con la base de datos.']);
  exit;
}
