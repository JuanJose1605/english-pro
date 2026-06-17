<?php
/**
 * ============================================================
 *  English Pro — Configuración del backend del blog
 * ============================================================
 *  ⚠️  EDITA estos 4 valores con los datos de TU base de datos
 *      MySQL creada en cPanel (sección "Bases de datos MySQL").
 * ============================================================
 */
define('DB_HOST', 'localhost');
define('DB_NAME', 'TU_BASE_DE_DATOS');   // ej: cpaneluser_englishpro
define('DB_USER', 'TU_USUARIO_MYSQL');   // ej: cpaneluser_blog
define('DB_PASS', 'TU_CONTRASENA');      // la contraseña de ese usuario

// --- Configuración de sesión segura (login del admin) ---
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_samesite', 'Lax');
session_start();

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

/** Conexión PDO reutilizable a MySQL. */
function db() {
  static $pdo = null;
  if ($pdo === null) {
    try {
      $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [
          PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
          PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
      );
    } catch (PDOException $e) {
      json(['error' => 'No se pudo conectar a la base de datos.'], 500);
    }
  }
  return $pdo;
}

/** Responde JSON y termina. */
function json($data, $code = 200) {
  http_response_code($code);
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}

/** Lee el cuerpo JSON de la petición. */
function body() {
  return json_decode(file_get_contents('php://input'), true) ?: [];
}

/** Corta la petición si no hay sesión de admin iniciada. */
function require_auth() {
  if (empty($_SESSION['user_id'])) {
    json(['error' => 'No autorizado. Inicia sesión.'], 401);
  }
}

/** Convierte un título en un slug seguro para la URL. */
function slugify($text) {
  $text = @iconv('UTF-8', 'ASCII//TRANSLIT', $text);
  $text = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $text));
  return trim($text, '-') ?: 'post';
}
