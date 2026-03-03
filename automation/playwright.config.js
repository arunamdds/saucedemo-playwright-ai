const {defineConfig} = require('@playwright/test');
module.exports = defineConfig({
    testDir: './features',
    timeout: 30000,
    retries: 1,
    use:{
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on',
    },
    reporter:[
     ['html', {outputFolder: 'playwright-report', open: 'never'}],
     ['json', {outputFile: 'test-results/results.json'}]
    ],
});