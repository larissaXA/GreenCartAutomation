const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:8000",   // URL base dos testes
    specPattern: [
        "cypress/e2e/**/*.cy.js",
        "cypress/api/**/*.cy.js"
    ], // Padrão dos arquivos de teste
    supportFile: false, // Arquivo de suporte
    viewportWidth: 1280,   // Largura da tela
    viewportHeight: 720,   // Altura da tela
    defaultCommandTimeout: 8000, // Tempo padrão para comandos
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
