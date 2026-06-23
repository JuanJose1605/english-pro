<?php
/**
 * CRUD de entradas del blog.
 *   GET    posts.php             → lista pública (solo publicadas)
 *   GET    posts.php?slug=...    → una entrada pública por slug
 *   GET    posts.php?all=1       → lista completa (incluye borradores) [admin]
 *   GET    posts.php?id=...      → una entrada por id (incluye borrador) [admin]
 *   POST   posts.php            → crear  [admin]
 *   PUT    posts.php            → actualizar { id, ... } [admin]
 *   DELETE posts.php            → borrar { id } [admin]
 */
require __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

/* ---------------- Lectura ---------------- */
if ($method === 'GET') {
  $slug = $_GET['slug'] ?? null;
  $id = $_GET['id'] ?? null;

  if ($id !== null) {
    require_auth();
    $stmt = db()->prepare('SELECT * FROM posts WHERE id = ?');
    $stmt->execute([(int) $id]);
    $post = $stmt->fetch();
    if (!$post) json(['error' => 'Entrada no encontrada.'], 404);
    json($post);
  }

  if ($slug !== null) {
    $stmt = db()->prepare("SELECT * FROM posts WHERE slug = ? AND status = 'published'");
    $stmt->execute([$slug]);
    $post = $stmt->fetch();
    if (!$post) json(['error' => 'Entrada no encontrada.'], 404);
    json($post);
  }

  if (isset($_GET['all'])) {
    require_auth();
    json(db()->query('SELECT * FROM posts ORDER BY created_at DESC')->fetchAll());
  }

  json(db()->query("SELECT * FROM posts WHERE status = 'published' ORDER BY date DESC, id DESC")->fetchAll());
}

/* ---------------- Escritura (requiere login) ---------------- */
require_auth();
$b = body();

/** Si esta entrada se marca como destacada, quita el destacado de las demás. */
function clear_featured($exceptId = 0) {
  $stmt = db()->prepare('UPDATE posts SET featured = 0 WHERE id <> ?');
  $stmt->execute([(int) $exceptId]);
}

/** Garantiza un slug único (añade -2, -3, ... si ya existe). */
function unique_slug($base, $ignoreId = 0) {
  $slug = $base;
  $i = 1;
  while (true) {
    $stmt = db()->prepare('SELECT id FROM posts WHERE slug = ? AND id <> ?');
    $stmt->execute([$slug, (int) $ignoreId]);
    if (!$stmt->fetch()) return $slug;
    $i++;
    $slug = $base . '-' . $i;
  }
}

if ($method === 'POST') {
  $title = trim($b['title'] ?? '');
  if ($title === '') json(['error' => 'El título es obligatorio.'], 422);

  $slug = unique_slug(slugify($b['slug'] ?? $title));
  $featured = !empty($b['featured']) ? 1 : 0;
  if ($featured) clear_featured();

  $stmt = db()->prepare(
    'INSERT INTO posts
      (slug, title, excerpt, content, category, author_name, cover_from, cover_to, cover_image, read_mins, status, featured, date)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)'
  );
  $stmt->execute([
    $slug,
    $title,
    $b['excerpt'] ?? '',
    $b['content'] ?? '',
    $b['category'] ?? 'Aprendizaje',
    $b['author_name'] ?? 'Equipo English Pro',
    $b['cover_from'] ?? '#004088',
    $b['cover_to'] ?? '#003066',
    !empty($b['cover_image']) ? $b['cover_image'] : null,
    (int) ($b['read_mins'] ?? 4),
    ($b['status'] ?? 'draft') === 'published' ? 'published' : 'draft',
    $featured,
    !empty($b['date']) ? $b['date'] : date('Y-m-d'),
  ]);

  $id = db()->lastInsertId();
  $stmt = db()->prepare('SELECT * FROM posts WHERE id = ?');
  $stmt->execute([$id]);
  json($stmt->fetch(), 201);
}

if ($method === 'PUT' || $method === 'PATCH') {
  $id = (int) ($b['id'] ?? 0);
  if (!$id) json(['error' => 'Falta el id.'], 422);

  $title = trim($b['title'] ?? '');
  if ($title === '') json(['error' => 'El título es obligatorio.'], 422);

  $slug = unique_slug(slugify($b['slug'] ?? $title), $id);
  $featured = !empty($b['featured']) ? 1 : 0;
  if ($featured) clear_featured($id);

  $stmt = db()->prepare(
    'UPDATE posts SET
      slug = ?, title = ?, excerpt = ?, content = ?, category = ?, author_name = ?,
      cover_from = ?, cover_to = ?, cover_image = ?, read_mins = ?, status = ?, featured = ?, date = ?
     WHERE id = ?'
  );
  $stmt->execute([
    $slug,
    $title,
    $b['excerpt'] ?? '',
    $b['content'] ?? '',
    $b['category'] ?? 'Aprendizaje',
    $b['author_name'] ?? 'Equipo English Pro',
    $b['cover_from'] ?? '#004088',
    $b['cover_to'] ?? '#003066',
    !empty($b['cover_image']) ? $b['cover_image'] : null,
    (int) ($b['read_mins'] ?? 4),
    ($b['status'] ?? 'draft') === 'published' ? 'published' : 'draft',
    $featured,
    !empty($b['date']) ? $b['date'] : date('Y-m-d'),
    $id,
  ]);

  $stmt = db()->prepare('SELECT * FROM posts WHERE id = ?');
  $stmt->execute([$id]);
  json($stmt->fetch());
}

if ($method === 'DELETE') {
  $id = (int) ($b['id'] ?? 0);
  if (!$id) json(['error' => 'Falta el id.'], 422);
  $stmt = db()->prepare('DELETE FROM posts WHERE id = ?');
  $stmt->execute([$id]);
  json(['ok' => true]);
}

json(['error' => 'Método no permitido.'], 405);
