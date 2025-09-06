const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:8000", 
    env: {
      urls: {
        myListings: "/shop/mylistings/",
        login: "/auth/login/",
        shop: "/shop/",
        createProduct: "/shop/create_product/",
        cart: "/cart/"
      }
    },
    specPattern: [
        "cypress/e2e/**/*.cy.js",
        "cypress/api/**/*.cy.js"
    ], 
    supportFile: 'cypress/support/e2e.js', 
    viewportWidth: 1280,   
    viewportHeight: 720,   
    defaultCommandTimeout: 8000, 
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: false
    },
    video: true,              
    screenshotsFolder: "cypress/screenshots", 
    videosFolder: "cypress/videos",         
    screenshotOnRunFailure: true  
  },
});
