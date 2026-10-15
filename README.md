# Can an AI agent be your QA tester?

An experiment: I built a small online coffee store with **20 UX problems planted on purpose**, then let an AI agent test it like a human QA engineer would. The only thing that changes between runs is how much effort goes into the prompt.

- **Level 1:** a one-line prompt.
- **Level 2:** a skill with a role, context and an output format.
- **Level 3:** a skill with all of that plus a full checklist based on Nielsen's usability heuristics and WCAG accessibility basics.

Question: how much does the prompt actually matter?

## What's in here

```
├── src/                      The test app: "Ponto Coffee Roasters" (React + Vite)
│   └── api/                  Fake backend: random delays, a failing first checkout, localStorage
├── prompts/
│   ├── level-1-simple/       The one-liner
│   ├── level-2-role-and-context/
│   └── level-3-full-checklist/
├── experiment/
│   ├── protocol.md           How every run is done, so results are comparable
│   ├── answer-key.md         ⚠️ The 20 planted issues (spoilers)
│   └── scorecard.md          Where results get recorded
├── scripts/new-run.sh        Sets up an isolated folder for each agent run
└── results/                  Agent reports, one file per run
```

The prompts were written **before** the bugs, from general usability principles, so the detailed prompt isn't secretly a description of the answers.

## Run the app

```bash
npm install
npm run dev        # http://localhost:5173
```

It's a static site, so it deploys anywhere (Vercel, Netlify, GitHub Pages): build command `npm run build`, output folder `dist`.

## Run the experiment

See [experiment/protocol.md](experiment/protocol.md). In short:

```bash
./scripts/new-run.sh 2 1 https://your-deployed-url
```

That creates a clean folder outside this repo with the right prompt and a fresh browser setup, so the agent can't peek at the code or the answer key.

## Try it yourself

Want to test your own prompt or a different agent? Point it at the app, then compare its report with [the answer key](experiment/answer-key.md). No peeking first.
