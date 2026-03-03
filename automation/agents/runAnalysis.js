const LLMAgent = require('./llmAgent');
const { getLatestFailure } = require('../mcp/tools/getLatestFailure');
const fs = require('fs');
const path = require('path');

(async () => {
  const agent = new LLMAgent();

  const failure = await getLatestFailure();

  if (!failure) {
    console.log("No failures found.");
    return;
  }

  console.log("Failure Object Sent to LLM:");
  console.log(JSON.stringify(failure, null, 2));

  // Optional: load test file content for richer context
  const testFilePath = path.join(__dirname, '../features/login.spec.js');
  const testContent = fs.existsSync(testFilePath)
    ? fs.readFileSync(testFilePath, 'utf-8')
    : "Test content not found.";

  const analysis = await agent.analyzeFailure(
    failure.error,
    testContent
  );

  console.log("\nLLM Analysis:\n");
  console.log(analysis);
})();