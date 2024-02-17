describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Meysam Zahedi',
      userName: 'MeysamZa',
      password: '123321'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#userName').type('MeysamZa')
      cy.get('#password').type('123321')
      cy.get('#login').click()
      cy.contains('Meysam Zahedi logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#userName').type('Wrong')
      cy.get('#password').type('Wrong')
      cy.get('#login').click()
      cy.contains('invalid username or password').should('have.css','color','rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#userName').type('MeysamZa')
      cy.get('#password').type('123321')
      cy.get('#login').click()
      cy.contains('Meysam Zahedi logged in')
    })

    it('A blog can be created', function() {
      cy.get('#toggle-visible-button').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Bob Roos')
      cy.get('#url').type('http://www.example.com')
      cy.get('#create-button').click()
      cy.contains('Test Blog Bob Roos')
    })
  })

})