CREATE TABLE children (
  id INTEGER PRIMARY KEY,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  gender TEXT NOT NULL,
  name TEXT NOT NULL
);

ALTER TABLE users ADD COLUMN child_id INTEGER REFERENCES children(id);
