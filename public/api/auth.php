<?php
/**
 * Autenticación del admin: login, logout y comprobación de sesión.
 *   GET  auth.php?action=me      → ¿hay sesión iniciada?
 *   POST auth.php?action=login   → { username, password }
 *   POST auth.php?action=logout  → cierra sesión
 */
require __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

if ($method === 'GET' && $action === 'me') {
  if (empty($_SESSION['user_id'])) {
    json(['authenticated' => false]);
  }
  json([
    'authenticated' => true,
    'user' => ['id' => $_SESSION['user_id'], 'name' => $_SESSION['user_name']],
  ]);
}

if ($method === 'POST' && $action === 'login') {
  $b = body();
  $username = trim($b['username'] ?? '');
  $password = (string) ($b['password'] ?? '');

  $stmt = db()->prepare('SELECT id, name, password_hash FROM users WHERE username = ?');
  $stmt->execute([$username]);
  $user = $stmt->fetch();

  if (!$user || !password_verify($password, $user['password_hash'])) {
    json(['error' => 'Usuario o contraseña incorrectos.'], 401);
  }

  session_regenerate_id(true);
  $_SESSION['user_id'] = (int) $user['id'];
  $_SESSION['user_name'] = $user['name'];
  json(['authenticated' => true, 'user' => ['id' => $user['id'], 'name' => $user['name']]]);
}

if ($method === 'POST' && $action === 'logout') {
  $_SESSION = [];
  session_destroy();
  json(['authenticated' => false]);
}

json(['error' => 'Acción no válida.'], 400);
