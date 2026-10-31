ALTER TABLE participants ADD COLUMN privacy_accepted_at TEXT NOT NULL DEFAULT '';

UPDATE participants
SET privacy_accepted_at = created_at
WHERE privacy_accepted_at = '';
