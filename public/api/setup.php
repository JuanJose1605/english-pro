<?php
/**
 * ============================================================
 *  CREAR / ACTUALIZAR el usuario administrador  (ejecutar 1 vez)
 * ============================================================
 *  1. Edita el usuario y la contraseña de abajo.
 *  2. Abre en el navegador:  https://TU-DOMINIO/api/setup.php
 *  3. Cuando veas "ok", ⚠️ BORRA este archivo del servidor.
 * ============================================================
 */
require __DIR__ . '/config.php';

// ⚠️ CAMBIA estos valores antes de ejecutar:
$username = 'admin';
$name     = 'Administrador';
$password = 'CambiaEstaClave123';

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = db()->prepare(
  'INSERT INTO users (username, name, password_hash)
   VALUES (?, ?, ?)
   ON DUPLICATE KEY UPDATE name = VALUES(name), password_hash = VALUES(password_hash)'
);
$stmt->execute([$username, $name, $hash]);

json([
  'ok' => true,
  'message' => "Usuario '$username' creado/actualizado. ⚠️ BORRA ahora este archivo setup.php del servidor.",
]);
