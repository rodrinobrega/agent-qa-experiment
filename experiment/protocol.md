# Run protocol

The experiment changes one thing: the prompt. Everything else stays identical across runs.

## What stays fixed

- **Agent:** Claude Code (same version for every run, write it down)
- **Model:** the same model for every run, write it down
- **Browser tool:** Playwright MCP, started with `--isolated` so every run begins with an empty browser (no cart, no saved account, first checkout attempt fails)
- **App:** the same deployed URL (or the same local build)
- **Budget:** let each run finish on its own, but stop it at 30 minutes if it hasn't

## What changes

| Level | Prompt | How it's given |
|-------|--------|----------------|
| 1 | One-liner | Pasted directly |
| 2 | Role + context + output format | Installed as a skill (`ux-qa-tester`) |
| 3 | Level 2 + full heuristics checklist and process | Installed as a skill (`ux-qa-tester-pro`) |

Run each level **3 times**. That's 9 runs in total.

## Why the agent runs outside this repo

If the agent runs inside this repo, it can read the source code and the answer key, and the whole test is meaningless. So every run happens in its own empty folder that only contains the prompt or skill and the browser config. The helper script sets that up.

## Steps for each run

1. Make sure the app is reachable (deployed URL, or `npm run dev` in this repo).
2. Create a clean run folder:
   ```bash
   ./scripts/new-run.sh <level> <run-number> <app-url>
   # example
   ./scripts/new-run.sh 2 1 https://ponto-coffee.vercel.app
   ```
3. `cd` into the folder the script prints, start `claude`, and paste the prompt the script prints.
4. Don't help the agent. If it asks a question, answer only: "Use your best judgment."
5. When it finishes, save its full final report to `results/level-<n>/run-<k>.md` in this repo.
6. Note the duration and token cost (`/cost` in Claude Code) in the scorecard.

## Scoring

Score every report against [answer-key.md](answer-key.md) using the rules at the bottom of that file, and fill in [scorecard.md](scorecard.md). Score all runs in one sitting if you can, so your judgment stays consistent.

## Things worth noting while you watch

These aren't scored, but they make good material for the article:

- Did the agent ever try a phone-sized screen or keyboard navigation without being told?
- Did it notice the basket badge, or did it check the cart page and move on?
- When the order failed, did it retry? Did it notice the form was wiped?
- How much did it read the page's accessibility tree versus take screenshots?
