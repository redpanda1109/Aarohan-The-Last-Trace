ALTER TABLE participants ADD COLUMN total_score INTEGER NOT NULL DEFAULT 0;

UPDATE participants
SET total_score =
  (SELECT COUNT(*) * 100 FROM puzzle_progress WHERE participant_id = participants.id) -
  (SELECT COUNT(*) * 30 FROM hint_usage WHERE participant_id = participants.id);

CREATE TRIGGER puzzle_progress_score_insert
AFTER INSERT ON puzzle_progress
BEGIN
  UPDATE participants SET total_score = total_score + 100 WHERE id = NEW.participant_id;
END;

CREATE TRIGGER puzzle_progress_score_delete
AFTER DELETE ON puzzle_progress
BEGIN
  UPDATE participants SET total_score = total_score - 100 WHERE id = OLD.participant_id;
END;

CREATE TRIGGER hint_usage_score_insert
AFTER INSERT ON hint_usage
BEGIN
  UPDATE participants SET total_score = total_score - 30 WHERE id = NEW.participant_id;
END;

CREATE TRIGGER hint_usage_score_delete
AFTER DELETE ON hint_usage
BEGIN
  UPDATE participants SET total_score = total_score + 30 WHERE id = OLD.participant_id;
END;

CREATE VIEW participant_puzzle_scores AS
WITH RECURSIVE puzzle_ids(puzzle_id) AS (
  SELECT 1
  UNION ALL
  SELECT puzzle_id + 1 FROM puzzle_ids WHERE puzzle_id < 15
)
SELECT
  p.id AS participant_id,
  p.team_name,
  p.total_score,
  puzzle_ids.puzzle_id,
  CASE WHEN pp.puzzle_id IS NULL THEN 0 ELSE 1 END AS solved,
  CASE WHEN h.puzzle_id IS NULL THEN 0 ELSE 1 END AS hint_used,
  CASE WHEN h.puzzle_id IS NULL THEN 0 ELSE 30 END AS penalty,
  (CASE WHEN pp.puzzle_id IS NULL THEN 0 ELSE 100 END) -
    (CASE WHEN h.puzzle_id IS NULL THEN 0 ELSE 30 END) AS question_score
FROM participants AS p
CROSS JOIN puzzle_ids
LEFT JOIN puzzle_progress AS pp
  ON pp.participant_id = p.id AND pp.puzzle_id = puzzle_ids.puzzle_id
LEFT JOIN hint_usage AS h
  ON h.participant_id = p.id AND h.puzzle_id = puzzle_ids.puzzle_id;
