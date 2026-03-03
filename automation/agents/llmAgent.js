const GeminiProvider = require('./geminiProvider');

class LLMAgent {
    constructor() {
        this.provider = new GeminiProvider();
    }

    async analyzeFailure(errorLog, testContent) {
        const prompt = `
                You are a senior QA automation architect.

                Analyze this Playwright failure.

                Test File:
                ${testContent}

                Error:
                ${errorLog}

                Respond with:
                - Failure Type
                - Root Cause
                - Suggested Fix
                `;

        return await this.provider.analyze(prompt);
    }
}

module.exports = LLMAgent;