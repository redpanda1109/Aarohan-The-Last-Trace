CREATE TABLE participants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  team_name TEXT NOT NULL,
  grade TEXT NOT NULL,
  school_name TEXT NOT NULL,
  round2_unlocked INTEGER NOT NULL DEFAULT 0,
  case_solved INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE puzzle_progress (
  participant_id TEXT NOT NULL,
  puzzle_id INTEGER NOT NULL,
  solved_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  PRIMARY KEY (participant_id, puzzle_id),
  FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
);

CREATE TABLE submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  participant_id TEXT NOT NULL,
  submission_type TEXT NOT NULL CHECK (submission_type IN ('puzzle', 'unlock', 'indictment')),
  puzzle_id INTEGER,
  answer TEXT NOT NULL,
  is_correct INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
);

CREATE INDEX submissions_participant_created
  ON submissions (participant_id, created_at);
