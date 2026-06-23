<?php
/**
 * Subida de imágenes para el blog (portada e imágenes dentro del artículo).
 *   POST upload.php   (multipart/form-data, campo "file")   [admin]
 *   → { url: "./api/uploads/xxxxx.jpg" }
 *
 * Las imágenes se guardan en /api/uploads/. Solo el admin autenticado puede subir.
 */
require __DIR__ . '/config.php';
require_auth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json(['error' => 'Método no permitido.'], 405);
}

if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
  json(['error' => 'No se recibió ninguna imagen válida.'], 422);
}

$file = $_FILES['file'];

// Límite de tamaño: 5 MB.
$maxBytes = 5 * 1024 * 1024;
if ($file['size'] > $maxBytes) {
  json(['error' => 'La imagen supera el tamaño máximo de 5 MB.'], 422);
}

// Validación real del tipo por contenido (no por la extensión que envía el cliente).
$allowed = [
  'image/jpeg' => 'jpg',
  'image/png'  => 'png',
  'image/webp' => 'webp',
  'image/gif'  => 'gif',
];
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file['tmp_name']);
if (!isset($allowed[$mime])) {
  json(['error' => 'Formato no permitido. Usa JPG, PNG, WEBP o GIF.'], 422);
}
$ext = $allowed[$mime];

// Carpeta de destino (se crea si no existe).
$dir = __DIR__ . '/uploads';
if (!is_dir($dir) && !@mkdir($dir, 0755, true)) {
  json(['error' => 'No se pudo preparar la carpeta de subidas.'], 500);
}

// Nombre único y seguro.
$name = date('Ymd') . '-' . bin2hex(random_bytes(6)) . '.' . $ext;
$dest = $dir . '/' . $name;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
  json(['error' => 'No se pudo guardar la imagen.'], 500);
}

// URL relativa (coherente con el resto del sitio que usa base './').
json(['url' => './api/uploads/' . $name], 201);
