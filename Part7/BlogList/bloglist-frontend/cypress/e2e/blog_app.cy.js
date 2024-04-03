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

    describe('new Blog',function() {
      beforeEach(function() {
        cy.get('#toggle-visible-button').click()
        cy.get('#title').type('Test Blog')
        cy.get('#author').type('Bob Roos')
        cy.get('#url').type('http://www.example.com')
        cy.get('#create-button').click()
      })

      it('A blog can be created', function() {
        cy.contains('Test Blog Bob Roos')
      })

      it('like a blog',function() {
        cy.contains('Test Blog Bob Roos').parent().as('theBlogDiv')
        cy.get('@theBlogDiv').find('#toggle-visible-button').click()
        cy.get('@theBlogDiv').find('#like-button').click()
        cy.get('@theBlogDiv').contains('likes 1')
      })

      it('remove a blog',function() {
        cy.contains('Test Blog Bob Roos').parent().as('theBlogDiv')
        cy.get('@theBlogDiv').find('#toggle-visible-button').click()
        cy.get('@theBlogDiv').find('#remove-button').click()
        cy.get('html').should('not.contain','Test Blog Bob Roos')
      })

      it('only creator can see remove button',function(){

        cy.contains('Test Blog Bob Roos').parent().as('theBlogDiv')
        cy.get('@theBlogDiv').find('#toggle-visible-button').click()
        cy.get('@theBlogDiv').find('#remove-button').parent().should('not.have.css','display','none')

        const newUser = {
          name: 'User2',
          userName: 'User2',
          password: 'User2Pass'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', newUser)

        cy.wait(1000)

        cy.get('#logout-button').click()
        cy.get('#userName').type('User2')
        cy.get('#password').type('User2Pass')
        cy.get('#login').click()

        cy.contains('Test Blog Bob Roos').parent().as('theBlogDiv')
        cy.get('@theBlogDiv').find('#toggle-visible-button').click()
        cy.get('@theBlogDiv').find('#remove-button').parent().should('have.css','display','none')
      })

    })

    it.only('blogs are ordered according to likes with the blog ',function() {
      const blogs=[{ title:'blog with 10 likes',author:'author',url:'http://test.com',likes:10 },
        { title:'blog with 5 likes',author:'author',url:'http://test.com',likes:5 },
        { title:'blog with 15 likes',author:'author',url:'http://test.com',likes:15 },
        { title:'blog with 0 likes',author:'author',url:'http://test.com',likes:0 },
        { title:'blog with 6 likes',author:'author',url:'http://test.com',likes:6 },
        { title:'blog with 20 likes',author:'author',url:'http://test.com',likes:20 }
      ]
      blogs.forEach(blog => cy.createBlog(blog))
      cy.visit('http://localhost:5173')
      blogs.sort((blogA,blogB) => blogB.likes-blogA.likes)
      blogs.forEach((blog,index) => {
        cy.get('.blog').eq(index).should('contain', blog.title)
      })
    })
  })

})