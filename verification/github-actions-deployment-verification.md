# GitHub Actions Deployment Verification via Connected GitHub Fetch

**Type:** Reusable verification recipe (no code module)  
**Proven source:** Pop Squadron — GitHub Pages deployment, October 2026  
**Scope:** GitHub repositories whose deployment workflows run on pushes to a branch

## Problem this solves

A successful commit is not proof of a successful deployment. Some GitHub connector actions can read repository files and inspect jobs but cannot **list recent push-triggered workflow runs**. In particular, `mcp__GitHub__fetch_commit_workflow_runs` currently filters to pull-request-triggered runs; an empty response for a push deployment is **not** evidence that the deployment is missing.

The connected GitHub **generic fetch** action can read the approved GitHub REST workflow-runs collection. Discover and use `tools.mcp__GitHub__fetch` through `functions.exec` instead of treating a missing specialized list action as loss of GitHub access.

## 1. Discover the connected action

Within `functions.exec`, inspect the available tools if needed:

```js
text(ALL_TOOLS.filter(x => x.name === "mcp__GitHub__fetch"));
```

This action accepts an approved `api.github.com` URL. Do not substitute ordinary web search for authenticated repository workflows when the connected action is available.

## 2. Read recent runs on the deployment branch

```js
const repo = "OWNER/REPO";
const branch = "main"; // replace with the actual deployment branch
const r = await tools.mcp__GitHub__fetch({
  url: `https://api.github.com/repos/${repo}/actions/runs?branch=${branch}&per_page=10`
});
const runs = JSON.parse(r.result.content).workflow_runs;
text(runs.map(x => ({
  id: x.id,
  workflow: x.name,
  sha: x.head_sha,
  status: x.status,
  conclusion: x.conclusion,
  url: x.html_url,
  updated: x.updated_at
})));
```

Identify the **intended deployment workflow**, not merely the newest unrelated workflow. Match its `head_sha` to the intended commit (ideally the current deployment branch HEAD), and verify:

- `status === "completed"`
- `conclusion === "success"`
- `head_sha` matches the intended deployed revision.

A successful **older** run is not evidence that newer code deployed. A pending run remains pending; a cancelled or failed run is not a success.

## 3. Inspect failed or successful jobs

Use the `id` from the matching workflow run:

```js
const repo = "OWNER/REPO";
const runId = 123456789; // actual run ID from step 2
const r = await tools.mcp__GitHub__fetch({
  url: `https://api.github.com/repos/${repo}/actions/runs/${runId}/jobs`
});
const jobs = JSON.parse(r.result.content).jobs;
text(jobs.map(j => ({
  id: j.id,
  name: j.name,
  status: j.status,
  conclusion: j.conclusion,
  steps: j.steps?.map(s => ({
    name: s.name,
    conclusion: s.conclusion
  }))
})));
```

For failure diagnosis, identify the **first failed step**, inspect its logs when a connected log-reading action is available, and correct the actual cause. Do not infer the failure stage solely from an email notification. After committing a fix, repeat run verification against the **new** SHA.

For success, confirm the workflow includes and successfully completed the relevant tests, build, artifact upload and actual deployment/publish step. A green test job alone is not necessarily a published site.

## 4. Report the evidence and acceptance boundary

Report the workflow name, full or abbreviated SHA, run ID/link, status, conclusion, and relevant successful or failed steps. Distinguish:

1. **Committed** — repository contains intended changes.
2. **Automated-tested/build succeeded** — workflow checks passed.
3. **Published/deployed** — actual deployment step completed successfully for the matching SHA.
4. **Activated on target device** — browser/PWA loaded the new build.
5. **Device-tested/user-accepted** — changed behavior worked in real use.

Do not claim steps 4–5 merely from GitHub Actions success. For installed PWAs, use the project's update procedure and the [Local-First PWA Release Verification](local-first-pwa-release.md) recipe; protect saved data.

## Verified Pop Squadron example

Repository: `ErikEhresman-ST1987/pop-squadron`  
Branch: `main`  
Workflow: `Deploy Pop Squadron`  
Intended commit: `c436d19e459792bc7707facab80bbf91223505ab`  
Run: [39721045930](https://github.com/ErikEhresman-ST1987/pop-squadron/actions/runs/39721045930)  
Observed: `completed / success` (October 22, 2026 UTC).

The job details confirmed success for `npm install`, `npm test`, `npm run build`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4`. The prior run [39720631131](https://github.com/ErikEhresman-ST1987/pop-squadron/actions/runs/39720631131) for commit `914e96e` failed. The corrected commit's successful run—not the older successful deployment—established that Mission 23 had deployed. iPhone gameplay remained a separate checkpoint.

## Limitations

- Requires an available connected GitHub `fetch` action and sufficient repository access.
- A list of recent runs may omit older matching runs; increase pagination or filter by workflow when necessary.
- For multiple workflows, explicitly match the deployment workflow and intended SHA.
- GitHub Actions completion does not guarantee immediate CDN propagation, installed PWA activation, or real-device functionality.
- Never ask the user to inspect GitHub manually before trying the connected workflow-runs collection.
