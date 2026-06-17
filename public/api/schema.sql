-- ============================================================
--  English Pro — Esquema de la base de datos del blog
--  Impórtalo en phpMyAdmin (cPanel) sobre tu base de datos ya creada.
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(50)  NOT NULL UNIQUE,
  name          VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS posts (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(200) NOT NULL UNIQUE,
  title       VARCHAR(255) NOT NULL,
  excerpt     TEXT,
  content     MEDIUMTEXT,
  category    VARCHAR(80)  DEFAULT 'Aprendizaje',
  author_name VARCHAR(120) DEFAULT 'Equipo English Pro',
  cover_from  VARCHAR(9)   DEFAULT '#004088',
  cover_to    VARCHAR(9)   DEFAULT '#003066',
  read_mins   INT          DEFAULT 4,
  status      ENUM('draft','published') DEFAULT 'draft',
  featured    TINYINT(1)   DEFAULT 0,
  date        DATE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
