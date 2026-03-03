require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function main() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY or GOOGLE_API_KEY in .env');
    process.exit(1);
  }

  const client = new GoogleGenerativeAI(apiKey);

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models',
      {
        headers: {
          'x-goog-api-key': apiKey,
        },
      }
    );

    if (!response.ok) {
      console.error('ListModels HTTP error:', response.status, response.statusText);
      const text = await response.text();
      console.error(text);
      process.exit(1);
    }

    const data = await response.json();
    console.log('Available models (v1beta):');
    for (const m of data.models || []) {
      console.log('-', m.name);
    }
  } catch (err) {
    console.error('Error listing models:', err);
    process.exit(1);
  }
}

main();

