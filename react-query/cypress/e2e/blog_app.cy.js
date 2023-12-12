describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Zoro',
      username: 'Zoro',
      password: 'sword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    // ...
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Zoro',
      username: 'Zoro',
      password: 'sword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  describe('Login',function() {
    it('succeeds with correct credentials', {
      defaultCommandTimeout: 10000
    }, function() {
			cy.get('#username').type('Zoro')
			cy.get('#password').type('sword')
			cy.get('#login-button').click()
			cy.contains('Zoro logged-in')
    })

    it('fails with wrong credentials', function() {
			cy.get('#username').type('Zoro')
			cy.get('#password').type('word')
			cy.get('#login-button').click()
			cy.get('.error').contains('Wrong credentials')
    })
	})

  describe('When logged in', function() {
    beforeEach(function() {
			// log in user here
      cy.contains('log in').click()
      cy.get('input:first').type('Zoro')
      cy.get('input:last').type('sword')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
			cy.contains('new blog').click()
			cy.get('#title').type('some title')
      cy.get('#author').type('nisko')
			cy.get('#url').type('www.chinisko.com')
			cy.get('#create-button').click()
			cy.contains('blogs')
    })
    it.only('A blog can be created -> like -> delete the blog,', function() {
			cy.contains('new blog').click()
			cy.get('#title').type('some title')
      cy.get('#author').type('nisko')
			cy.get('#url').type('www.chinisko.com')
			cy.get('#create-button').click()
			cy.contains('View').click()
			cy.contains('like').click()
      cy.contains('21')
      cy.contains('delete').click()
		})
  })
})