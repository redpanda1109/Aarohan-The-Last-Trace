# The Last Trace

Static site and Cloudflare Pages Functions for the Aarohan 2026 investigation challenge.

## Hosting

- Production site: https://aarohan-final.pages.dev/
- Cloudflare Pages project: `aarohan-final`
- GitHub source repository: https://github.com/redpanda1109/Aarohan-The-Last-Trace
- Participant database: Cloudflare D1 database `aarohan-final`

The Git repository contains website source and migrations only. **Participant names, school details, and puzzle/case submissions are stored in D1, never committed to Git.** Keep the repository private because the source contains event materials and server-side scoring logic.

The existing Pages project was created with a direct upload, so it cannot be converted to Cloudflare's built-in Git integration. `.github/workflows/deploy.yml` instead deploys the existing project on pushes to `main`. Before that automation can run, add the following under the GitHub repository's **Settings → Secrets and variables → Actions**:

- **Repository variable** `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID.
- **Repository secret** `CLOUDFLARE_API_TOKEN`: a Cloudflare API token scoped to **Cloudflare Pages: Edit** for this account.

Until the account-ID variable and API-token secret are set, the GitHub deploy job is skipped. Do not put the API token in the repository or paste it into chat. Deploy manually with the Wrangler command below in the meantime.

## Participant records

Each participant registers with their name, team name, grade/class, and school. The registration records the time they accepted the privacy notice. Puzzle attempts (including incorrect attempts), access-key attempts, and final indictment attempts are saved against a browser session. Progress follows the same browser; clearing its cookies or changing devices loses the session association.

Only authorized event organizers with access to the Cloudflare account should view participant records. In the Cloudflare dashboard, open **Storage & databases → D1 → `aarohan-final` → Console** to review them:

```sql
SELECT id, name, team_name, grade, school_name, created_at,
       privacy_accepted_at,
       round2_unlocked, case_solved
FROM participants
ORDER BY created_at DESC;
```

```sql
SELECT p.name, p.team_name, s.submission_type, s.puzzle_id,
       s.answer, s.is_correct, s.created_at
FROM submissions AS s
JOIN participants AS p ON p.id = s.participant_id
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
