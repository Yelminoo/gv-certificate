-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  certificate_no TEXT NOT NULL UNIQUE,
  issue_date TEXT NOT NULL,
  identification TEXT NOT NULL,
  weight TEXT NOT NULL,
  dimensions TEXT,
  cut TEXT,
  shape TEXT,
  color TEXT,
  comment1 TEXT,
  comment2 TEXT,
  origin TEXT,
  verified_by TEXT,
  certified_by TEXT,
  image_url TEXT,
  signature_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on certificate number for fast lookups
CREATE INDEX idx_certificate_no ON certificates(certificate_no);

-- Create index on creation date
CREATE INDEX idx_created_at ON certificates(created_at);

-- Create uploads table to track image uploads
CREATE TABLE IF NOT EXISTS uploads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  url TEXT NOT NULL,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on file name
CREATE INDEX idx_file_name ON uploads(file_name);
