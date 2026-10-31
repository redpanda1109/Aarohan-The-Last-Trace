# The Last Trace

Static site and Cloudflare Pages Functions for the Aarohan 2026 investigation challenge.

## Hosting

- Production site: https://aarohan-final.pages.dev/
- Cloudflare Pages project: `aarohan-final`
- GitHub source repository: https://github.com/redpanda1109/Aarohan-The-Last-Trace
- Participant database: Cloudflare D1 database `aarohan-final`

The Git repository contains website source and migrations only. **Participant records, school details, and puzzle/case submissions are stored in D1, never committed to Git.** Names collected by earlier versions remain in existing records; new registrations do not request names. Keep the repository private because the source contains event materials and server-side scoring logic.

The existing Pages project was created with a direct upload, so it cannot be converted to Cloudflare's built-in Git integration. `.github/workflows/deploy.yml` instead deploys the existing project on pushes to `main`. Before that automation can run, add the following under the GitHub repository's **Settings → Secrets and variables → Actions**:

- **Repository variable** `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID.
- **Repository secret** `CLOUDFLARE_API_TOKEN`: a Cloudflare API token scoped to **Cloudflare Pages: Edit** for this account.

Until the account-ID variable and API-token secret are set, the GitHub deploy job is skipped. Do not put the API token in the repository or paste it into chat. Deploy manually with the Wrangler command below in the meantime.

## Participant records

Each participant registers with a team name, grade/class, and school (name is not requested). The registration records the time they accepted the privacy notice. Puzzle attempts (including incorrect attempts), hint use, access-key attempts, and final indictment attempts are saved against a browser session. Each participant can use one hint per puzzle, and their Round 1 page displays their personal hint count out of 15. Progress follows the same browser; clearing its cookies or changing devices loses the session association. Existing registrations retain any name they supplied before the name field was removed; new registrations do not collect a name.

Only authorized event organizers with access to the Cloudflare account should view participant records. In the Cloudflare dashboard, open **Storage & databases → D1 → `aarohan-final` → Console** to review them:

```sql
SELECT id, team_name, grade, school_name, created_at,
       privacy_accepted_at,
       round2_unlocked, case_solved
FROM participants
ORDER BY created_at DESC;
```

```sql
SELECT p.id, p.team_name, p.grade, p.school_name,
       COUNT(h.puzzle_id) AS hints_used
FROM participants AS p
LEFT JOIN hint_usage AS h ON h.participant_id = p.id
GROUP BY p.id
ORDER BY hints_used DESC, p.created_at;
```

```sql
SELECT p.id, p.team_name, h.puzzle_id, h.used_at
FROM hint_usage AS h
JOIN participants AS p ON p.id = h.participant_id
ORDER BY h.used_at DESC;
```

```sql
SELECT p.id, p.team_name, s.submission_type, s.puzzle_id,
       s.answer, s.is_correct, s.created_at
FROM submissions AS s
JOIN participants AS p ON p.id = s.participant_id
WHERE s.submission_type <> 'hint'
ORDER BY s.created_at DESC;
```

Submissions can contain students' answers. Limit access to the Cloudflare account and delete records when the event's retention policy requires it. The registration page describes the information collected and asks participants to confirm they have any required permission.

## Database migrations and deployment

The D1 schema lives in `migrations/`. After a migration is added, apply it to production with:

```powershell
npx wrangler d1 migrations apply aarohan-final --remote
```

Deploy the site and Pages Functions with:

```powershell
npx wrangler pages deploy . --project-name aarohan-final --branch main
```

Do not commit `.dev.vars`, Wrangler authentication files, credentials, or participant exports.
