# AI-Augmented Playwright Failure Intelligence Framework

## Overview

This project demonstrates an AI-assisted failure analysis system built on top of Playwright automation.

Instead of manually debugging failed tests, the framework:

1. Executes Playwright tests
2. Parses structured JSON test results
3. Extracts failure metadata (title, status, error stack trace)
4. Enriches context using source test files
5. Sends structured failure data to a Large Language Model (LLM)
6. Receives root cause analysis and suggested code fixes

This simulates an MCP-style modular tool architecture for intelligent QA workflows.

--------------------------------------------

## Why This Project?

Modern QA must evolve beyond writing test scripts.

This project explores:

- AI-augmented failure triage
- Structured telemetry parsing
- Tool-based architecture
- LLM integration into automation pipelines
- Intelligent debugging workflows

It represents a shift from reactive debugging to AI-assisted root cause detection.

---------------------------------------------

## Architecture
```
automation/
│
├── agents/
│   ├── runAnalysis.js        # Orchestrates AI failure analysis
│   ├── llmAgent.js           # AI abstraction layer
│   ├── geminiProvider.js     # Gemini API integration
│   ├── listModels.js         # Model discovery utility
│
├── mcp/
│   └── tools/
│       └── getLatestFailure.js   # Parses Playwright JSON results
│
├── features/
│   └── login/
│       ├── login.page.js
│       ├── login.spec.js
│		├── login.locators.js
│
├── config/
│   └── env.js  				# Environment configuration
│
├── pages/
│   └── BasePage.js				# Shared BasePage for common Playwright utilities                
│
└── playwright.config.js
```
-----------------------------------------------

## How It Works (Execution Flow)

### Run Playwright Tests
```
npx playwright test --reporter=json > test-results/results.json

```

Playwright generates structured JSON output including:
- Test titles
- Status (passed, failed, timedOut)
- Error stack traces
- Source file references

------------------------------------------------

### Extract Latest Failure

`getLatestFailure.js`:
- Reads JSON output
- Traverses nested structure (`suites → specs → tests → results`)
- Detects failed or timedOut tests
- Extracts structured metadata

Example extracted object:

```json
{
  "title": "Valid login should navigate to inventory page",
  "status": "timedOut",
  "error": "Error: locator.fill: Test timeout..."
}
```

------------------------------------------------

### Enrich With Source Context

`runAnalysis.js`:
- Loads corresponding test file
- Adds code context to failure payload
- Sends structured data to LLM

-------------------------------------------------

### AI Failure Analysis

The LLM:
- Classifies failure type
- Identifies likely root cause
- Detects locator issues
- Suggests corrected selectors
- Provides code-level fixes

---------------------------------------------------

## Example AI Output

When an incorrect locator (`#wrong-username`) is introduced:

AI correctly identifies:

- Timeout due to element not found
- Incorrect CSS selector
- Suggested corrected locator
- Updated Page Object snippet

-------------------------------------------------

## Future Enhancements

- Dynamic test file resolution
- Multi-test failure summarization
- GitHub Actions integration
- Pull request fix suggestions
- Full MCP-style tool registry
- CI pipeline integration

---------------------------------------------------

## Tech Stack

- Playwright
- Node.js
- Gemini LLM API
- Modular agent-based architecture

---------------------------------------------------

## Purpose

This project is a prototype of an AI-first QA ecosystem where:
Automation + AI + Structured telemetry = Intelligent testing workflows
It demonstrates how QA teams can integrate LLMs into failure triage and debugging processes to reduce manual effort and improve turnaround time.