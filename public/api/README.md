# Backend del blog — English Pro

API en PHP + MySQL para que el **admin** publique entradas desde `/#/admin`.
Al hacer `npm run build`, esta carpeta se copia a `dist/api/` y se sube junto al
resto a `public_html/`.

## Puesta en marcha en cPanel (una sola vez)

1. **Crear la base de datos**
   - cPanel → *Bases de datos MySQL* → crea una base de datos.
   - Crea un usuario MySQL y **asígnalo a esa base con todos los permisos**.

2. **Cargar las tablas**
   - cPanel → *phpMyAdmin* → selecciona la base de datos → pestaña *Importar*
     → sube `schema.sql`.

3. **Configurar la conexión**
   - Edita `config.php` y completa `DB_NAME`, `DB_USER`, `DB_PASS`
     (DB_HOST normalmente queda `localhost`).

4. **Crear el usuario administrador**
   - Edita en `setup.php` el `username` y `password`.
   - Abre `https://TU-DOMINIO/api/setup.php` en el navegador.
   - Cuando responda `ok`, **borra `setup.php` del servidor**.

5. **Entrar al panel**
   - Ve a `https://TU-DOMINIO/#/admin` e inicia sesión.

## Notas de seguridad
- Las contraseñas se guardan **hasheadas** (`password_hash`), nunca en texto plano.
- Todas las consultas usan **sentencias preparadas** (sin inyección SQL).
- Las acciones de crear/editar/borrar exigen **sesión iniciada**.
- Usa siempre **HTTPS** (el `.htaccess` del sitio ya fuerza https).

## Endpoints
| Método | Ruta | Acceso | Qué hace |
|---|---|---|---|
| GET | `posts.php` | público | Lista de entradas publicadas |
| GET | `posts.php?slug=...` | público | Una entrada publicada |
| GET | `posts.php?all=1` | admin | Todas (incluye borradores) |
| GET | `posts.php?id=...` | admin | Una entrada por id |
| POST | `posts.php` | admin | Crear |
| PUT | `posts.php` | admin | Actualizar |
| DELETE | `posts.php` | admin | Borrar |
| POST | `auth.php?action=login` | público | Iniciar sesión |
| POST | `auth.php?action=logout` | admin | Cerrar sesión |
| GET | `auth.php?action=me` | público | ¿Sesión activa? |
