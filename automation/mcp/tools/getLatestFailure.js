const fs = require('fs');
const path = require('path');

function getLatestFailure() {
    const resultsPath = path.join(__dirname, '../../test-results/results.json');
  
    if (!fs.existsSync(resultsPath)) {
      return null;
    }
  
    const data = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
  
    for (const rootSuite of data.suites || []) {
  
      for (const innerSuite of rootSuite.suites || []) {
  
        for (const spec of innerSuite.specs || []) {
  
          for (const test of spec.tests || []) {
  
            for (const result of test.results || []) {
  
              if (result.status !== 'passed') {
  
                // Use the detailed error from result.errors[1]
                const detailedError =
                  result.errors?.[1]?.message ||
                  result.error?.message ||
                  "No detailed error message found.";
  
                return {
                  title: spec.title,
                  status: result.status,
                  error: detailedError
                };
              }
  
            }
          }
        }
  
      }
    }
  
    return null;
  }

  module.exports = { getLatestFailure };