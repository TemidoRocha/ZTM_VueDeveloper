// https://docs.cypress.io/api/table-of-contents

describe('Sanity Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Listen to great music!');
  });
});

/**
 * Testing the audio player
 * 1. Visit home page
 * 2. Click on first song
 * 3. Play audio
 * 4. Wait 5 seconds
 * 5. Pause audio
 */
