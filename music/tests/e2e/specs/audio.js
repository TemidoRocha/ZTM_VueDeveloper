describe('Audio Player', () => {
  it('play audio', () => {
    cy.visit('/');
    cy.get('.composition-name:first').click();
    cy.get('#play-button').click();
    cy.wait(5000); // the time to wait in milisec
    cy.get('#player-play-button').click();
  });
});
