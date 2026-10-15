#!/usr/bin/env bash
# Creates an isolated folder for one agent run, outside this repo,
# so the agent can't read the source code or the answer key.
set -euo pipefail

LEVEL="${1:-}"
RUN="${2:-}"
URL="${3:-http://localhost:5173}"

if [[ -z "$LEVEL" || -z "$RUN" ]]; then
  echo "Usage: $0 <level 1|2|3> <run-number> [app-url]"
  exit 1
fi

REPO="$(cd "$(dirname "$0")/.." && pwd)"
BASE="${AGENT_QA_RUNS:-$HOME/agent-qa-runs}"
DIR="$BASE/level-$LEVEL-run-$RUN"

if [[ -e "$DIR" ]]; then
  echo "Already exists: $DIR (delete it to start over)"
  exit 1
fi

mkdir -p "$DIR"

cat > "$DIR/.mcp.json" <<JSON
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--isolated"]
    }
  }
}
JSON

case "$LEVEL" in
  1)
    PROMPT="You are a QA engineer. Test the website at $URL and look for UX errors."
    ;;
  2)
    mkdir -p "$DIR/.claude/skills/ux-qa-tester"
    sed "s|{APP_URL}|$URL|g" "$REPO/prompts/level-2-role-and-context/SKILL.md" > "$DIR/.claude/skills/ux-qa-tester/SKILL.md"
    PROMPT="Use the ux-qa-tester skill to test the website at $URL."
    ;;
  3)
    mkdir -p "$DIR/.claude/skills/ux-qa-tester-pro"
    sed "s|{APP_URL}|$URL|g" "$REPO/prompts/level-3-full-checklist/SKILL.md" > "$DIR/.claude/skills/ux-qa-tester-pro/SKILL.md"
    PROMPT="Use the ux-qa-tester-pro skill to test the website at $URL."
    ;;
  *)
    echo "Level must be 1, 2 or 3"
    exit 1
    ;;
esac

echo "$PROMPT" > "$DIR/PROMPT.txt"

echo ""
echo "Run folder ready: $DIR"
echo ""
echo "  cd \"$DIR\" && claude"
echo ""
echo "Then paste this prompt:"
echo ""
echo "  $PROMPT"
echo ""
echo "Save the final report to: $REPO/results/level-$LEVEL/run-$RUN.md"
