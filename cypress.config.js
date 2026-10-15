const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  video: true,
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: "https://www.amazon.com",
    viewportWidth: 1920,
    viewportHeight: 1080,
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
  },
   env: {
    agodaUrl: process.env.AGODA_URL,
    amazonUrl: process.env.AMAZON_URL,
    youtubeUrl: process.env.YOUTUBE_URL,
  },
});

