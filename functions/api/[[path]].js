const PUZZLE_ANSWERS = {
  1: ["TARGET"],
  2: ["H"],
  3: ["400"],
  4: ["0X38", "38"],
  5: ["26"],
  6: ["25"],
  7: ["FLAG"],
  8: ["OPS-RELAY"],
  9: ["200"],
  10: ["21:24"],
  11: ["50"],
  12: ["54", "0X54"],
  13: ["3.4"],
  14: ["OPS-GAMMA"],
  15: ["209"],
};

const CODEWORD = "THELASTTRACEKEY";
const CULPRIT = "voss";
const MOTIVES = [
  "STOP THE AUDIT BEFORE THE BOARD MEETS",
  "STOP THE AUDIT",
  "STOP AUDIT BEFORE BOARD MEETS",
];
const SESSION_COOKIE = "__Host-aarohan_session";

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

async function parseBody(request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return null;
  }
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function sessionId(request) {
  const cookie = request.headers.get("Cookie") || "";
  const value = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);
  return value && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
    ? value
    : null;
}

async function participantFor(request, env) {
  const id = sessionId(request);
  if (!id) return null;
  return env.DB.prepare(
    "SELECT id, name, team_name, grade, school_name, round2_unlocked, case_solved, total_score FROM participants WHERE id = ?",
  ).bind(id).first();
}

async function requireParticipant(request, env) {
  const participant = await participantFor(request, env);
  return participant ? { participant } : { response: json({ error: "Register before continuing." }, 401) };
}

function normalizeAnswer(value) {
  return value.trim().toUpperCase().replace(/\.$/, "");
}

function normalizeMotive(value) {
  return value.toUpperCase().replace(/[^A-Z\s]/g, "").replace(/\s+/g, " ").trim();
}

async function register(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405, { Allow: "POST" });

  const existingId = sessionId(request);
  if (existingId && await participantFor(request, env)) {
    return json({ error: "This browser is already registered." }, 409);
  }

  const body = await parseBody(request);
  if (!body) return json({ error: "A valid JSON request is required." }, 400);

  const fields = {
    team_name: body.teamName,
    grade: body.grade,
    school_name: body.schoolName,
  };
  for (const [field, value] of Object.entries(fields)) {
    if (typeof value !== "string" || !value.trim() || value.trim().length > 100) {
      return json({ error: "Enter a value of 1–100 characters in every registration field." }, 400);
    }
  }
  if (body.privacyAccepted !== true) {
    return json({ error: "Review and accept the privacy notice to register." }, 400);
  }

  const id = crypto.randomUUID();
  await env.DB.prepare(
    "INSERT INTO participants (id, name, team_name, grade, school_name, privacy_accepted_at) VALUES (?, '', ?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))",
  ).bind(id, fields.team_name.trim(), fields.grade.trim(), fields.school_name.trim()).run();

  const participant = await participantFor(
    new Request(request.url, { headers: { Cookie: `${SESSION_COOKIE}=${id}` } }),
    env,
  );
  return json({
    participant: {
      id: participant.id,
      teamName: participant.team_name,
      grade: participant.grade,
      schoolName: participant.school_name,
    },
  }, 201, {
    "Set-Cookie": `${SESSION_COOKIE}=${id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`,
  });
}

async function getState(request, env) {
  const result = await requireParticipant(request, env);
  if (result.response) return result.response;

  const solved = await env.DB.prepare(
    "SELECT puzzle_id FROM puzzle_progress WHERE participant_id = ? ORDER BY puzzle_id",
  ).bind(result.participant.id).all();
  const hints = await env.DB.prepare(
    "SELECT puzzle_id FROM hint_usage WHERE participant_id = ? ORDER BY puzzle_id",
  ).bind(result.participant.id).all();

  return json({
    participant: {
      id: result.participant.id,
      teamName: result.participant.team_name,
      grade: result.participant.grade,
      schoolName: result.participant.school_name,
    },
    solvedPuzzleIds: solved.results.map((row) => row.puzzle_id),
    hintUsedPuzzleIds: hints.results.map((row) => row.puzzle_id),
    totalScore: result.participant.total_score,
    round2Unlocked: Boolean(result.participant.round2_unlocked),
    caseSolved: Boolean(result.participant.case_solved),
  });
}

async function useHint(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405, { Allow: "POST" });

  const result = await requireParticipant(request, env);
  if (result.response) return result.response;

  const body = await parseBody(request);
  const puzzleId = Number(body?.puzzleId);
  if (!Number.isInteger(puzzleId) || puzzleId < 1 || puzzleId > 15) {
    return json({ error: "Choose a valid puzzle." }, 400);
  }

  const insert = await env.DB.prepare(
    "INSERT INTO hint_usage (participant_id, puzzle_id) VALUES (?, ?) ON CONFLICT (participant_id, puzzle_id) DO NOTHING",
  ).bind(result.participant.id, puzzleId).run();

  const participant = await env.DB.prepare(
    "SELECT total_score FROM participants WHERE id = ?",
  ).bind(result.participant.id).first();
  return json({
    used: true,
    alreadyUsed: insert.meta.changes === 0,
    totalScore: participant.total_score,
  });
}

async function submitPuzzle(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405, { Allow: "POST" });

  const result = await requireParticipant(request, env);
  if (result.response) return result.response;

  const body = await parseBody(request);
  if (!body) return json({ error: "A valid JSON request is required." }, 400);

  const puzzleId = Number(body.puzzleId);
  const answers = PUZZLE_ANSWERS[puzzleId];
  if (!answers || typeof body.answer !== "string" || !body.answer.trim() || body.answer.length > 256) {
    return json({ error: "Enter a valid puzzle answer." }, 400);
  }

  const existing = await env.DB.prepare(
    "SELECT 1 FROM puzzle_progress WHERE participant_id = ? AND puzzle_id = ?",
  ).bind(result.participant.id, puzzleId).first();
  if (existing) {
    return json({
      correct: true,
      alreadySolved: true,
      totalScore: result.participant.total_score,
    });
  }

  const normalized = normalizeAnswer(body.answer);
  const correct = answers.includes(normalized);
  await env.DB.prepare(
    "INSERT INTO submissions (participant_id, submission_type, puzzle_id, answer, is_correct) VALUES (?, 'puzzle', ?, ?, ?)",
  ).bind(result.participant.id, puzzleId, body.answer.trim(), Number(correct)).run();

  if (correct) {
    await env.DB.prepare(
      "INSERT INTO puzzle_progress (participant_id, puzzle_id) VALUES (?, ?)",
    ).bind(result.participant.id, puzzleId).run();
  }

  const participant = await env.DB.prepare(
    "SELECT total_score FROM participants WHERE id = ?",
  ).bind(result.participant.id).first();
  return json({ correct, totalScore: participant.total_score });
}

async function unlockRound2(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405, { Allow: "POST" });

  const result = await requireParticipant(request, env);
  if (result.response) return result.response;

  const body = await parseBody(request);
  if (!body || typeof body.code !== "string" || body.code.length > 64) {
    return json({ error: "Enter a valid access key." }, 400);
  }

  const solved = await env.DB.prepare(
    "SELECT COUNT(*) AS count FROM puzzle_progress WHERE participant_id = ?",
  ).bind(result.participant.id).first();
  const code = body.code.trim().toUpperCase().replace(/[^A-Z]/g, "");
  const correct = solved.count === 15 && code === CODEWORD;

  await env.DB.prepare(
    "INSERT INTO submissions (participant_id, submission_type, answer, is_correct) VALUES (?, 'unlock', ?, ?)",
  ).bind(result.participant.id, body.code.trim(), Number(correct)).run();

  if (correct) {
    await env.DB.prepare(
      "UPDATE participants SET round2_unlocked = 1 WHERE id = ?",
    ).bind(result.participant.id).run();
  }
  return json({ correct, error: correct ? undefined : "The key is incorrect or not all puzzles are solved yet." });
}

async function submitIndictment(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405, { Allow: "POST" });

  const result = await requireParticipant(request, env);
  if (result.response) return result.response;
  if (!result.participant.round2_unlocked) {
    return json({ error: "Unlock Round 2 before submitting the indictment." }, 403);
  }

  const body = await parseBody(request);
  if (!body || typeof body.culprit !== "string" || typeof body.motive !== "string" || body.motive.length > 512) {
    return json({ error: "Enter a valid indictment." }, 400);
  }

  const culprit = body.culprit.trim().toLowerCase();
  const motive = normalizeMotive(body.motive.trim());
  const correct = culprit === CULPRIT && MOTIVES.includes(motive);

  await env.DB.prepare(
    "INSERT INTO submissions (participant_id, submission_type, answer, is_correct) VALUES (?, 'indictment', ?, ?)",
  ).bind(result.participant.id, JSON.stringify({ culprit, motive }), Number(correct)).run();

  if (correct) {
    await env.DB.prepare(
      "UPDATE participants SET case_solved = 1 WHERE id = ?",
    ).bind(result.participant.id).run();
  }

  return json({ correct });
}

export async function onRequest({ request, env }) {
  if (!env.DB) return json({ error: "Participant storage is not configured." }, 503);

  const path = new URL(request.url).pathname;
  if (path === "/api/register") return register(request, env);
  if (path === "/api/state" && request.method === "GET") return getState(request, env);
  if (path === "/api/hint") return useHint(request, env);
  if (path === "/api/puzzle-submit") return submitPuzzle(request, env);
  if (path === "/api/unlock") return unlockRound2(request, env);
  if (path === "/api/indictment") return submitIndictment(request, env);
  return json({ error: "Not found." }, 404);
}
