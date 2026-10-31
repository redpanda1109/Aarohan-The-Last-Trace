UPDATE participants
SET
  round1_completed_at = COALESCE(
    round1_completed_at,
    (
      SELECT s.created_at
      FROM submissions AS s
      WHERE s.participant_id = participants.id
        AND s.submission_type = 'unlock'
        AND s.is_correct = 1
      ORDER BY s.created_at
      LIMIT 1
    )
  ),
  round1_duration_seconds = COALESCE(
    round1_duration_seconds,
    (
      SELECT MAX(0, CAST((
        julianday((
          SELECT s.created_at
          FROM submissions AS s
          WHERE s.participant_id = participants.id
            AND s.submission_type = 'unlock'
            AND s.is_correct = 1
          ORDER BY s.created_at
          LIMIT 1
        )) - julianday(participants.created_at)
      ) * 86400 AS INTEGER))
    )
  ),
  round2_started_at = COALESCE(
    round2_started_at,
    (
      SELECT s.created_at
      FROM submissions AS s
      WHERE s.participant_id = participants.id
        AND s.submission_type = 'unlock'
        AND s.is_correct = 1
      ORDER BY s.created_at
      LIMIT 1
    )
  ),
  case_solved_at = COALESCE(
    case_solved_at,
    (
      SELECT s.created_at
      FROM submissions AS s
      WHERE s.participant_id = participants.id
        AND s.submission_type = 'indictment'
        AND s.is_correct = 1
      ORDER BY s.created_at
      LIMIT 1
    )
  ),
  round2_duration_seconds = COALESCE(
    round2_duration_seconds,
    (
      SELECT MAX(0, CAST((
        julianday((
          SELECT i.created_at
          FROM submissions AS i
          WHERE i.participant_id = participants.id
            AND i.submission_type = 'indictment'
            AND i.is_correct = 1
          ORDER BY i.created_at
          LIMIT 1
        )) - julianday((
          SELECT u.created_at
          FROM submissions AS u
          WHERE u.participant_id = participants.id
            AND u.submission_type = 'unlock'
            AND u.is_correct = 1
          ORDER BY u.created_at
          LIMIT 1
        ))
      ) * 86400 AS INTEGER))
    )
  )
WHERE EXISTS (
  SELECT 1
  FROM submissions AS s
  WHERE s.participant_id = participants.id
    AND s.submission_type = 'unlock'
    AND s.is_correct = 1
);
