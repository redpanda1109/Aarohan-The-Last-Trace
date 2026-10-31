CREATE TABLE hint_usage (
  participant_id TEXT NOT NULL,
  puzzle_id INTEGER NOT NULL CHECK (puzzle_id BETWEEN 1 AND 15),
  used_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  PRIMARY KEY (participant_id, puzzle_id),
  FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
);
