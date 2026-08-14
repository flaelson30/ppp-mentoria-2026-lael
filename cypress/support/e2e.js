// Import commands or put global setup here
// This file is referenced by cypress.config.js

// Optional: add a custom command to login via API
Cypress.Commands.add('apiLogin', (username, password) => {
  return cy.request({
    method: 'POST',
    url: '/auth/login',
    body: { username, password }
  }).then((resp) => resp.body.token);
});
