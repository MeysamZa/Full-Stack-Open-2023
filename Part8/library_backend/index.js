const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose=require('./mongoose')
const Book=require('./model/Book')
const Author=require('./model/Author')
const { GraphQLError } = require('graphql')



// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'Demons',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
type Book{
  title:String!
  published: Int!
  author:Author!
  id: ID!
  genres:[String!]!
}
type Author{
  name:String!
  id:ID!
  born:Int
  bookCount:Int!
}
  type Query {
    bookCount: Int!
    authorCount:Int!
    allBooks(author:String,genre:String):[Book!]!
    allAuthors:[Author!]!
  }
  type Mutation{
    addBook(title:String!,author:String!,published:Int!,genres:[String!]!):Book
    editAuthor(name:String!, setBornTo:Int!):Author
  }
`

const resolvers = {
  Query: {
    bookCount: async() => Book.collection.countDocuments(),
    authorCount: async() =>Author.collection.countDocuments(),
    allBooks:async(root,args) =>{
      if(!args.author && !args.genre){
        return Book.find({}).populate('author')      
      }
      if(!args.author && args.genre){
        return Book.find({genres:args.genre}).populate('author')      
      }
      if(args.author && !args.genre){
        const author=await Author.findOne({name:args.author})
        if(!author){
          return []
        }
        return Book.find({author:author.id}).populate('author')      
      }
      if(args.author && args.genre){
        const author=await Author.findOne({name:args.author})
        if(!author){
          return []
        }
        return Book.find({author:author.id,genres:args.genre}).populate('author')      
      }


    },
    allAuthors: async() =>Author.find({}),
  },
  Author:{
    bookCount:async(root) => {
      const authorBooks=await Book.find({author:root.id})
      return authorBooks.length
    }
  },
  Mutation:{
    addBook:async (root,args)=>{
      try{
      let author=await Author.findOne({name:args.author})
      if(!author){
        author=new Author({name:args.author})
        author=await author.save()
      }
      const book=new Book({
        title:args.title,
        genres:args.genres,
        published:args.published,
        author:author._id
      })
      const savedBook=await book.save()
      return savedBook.populate('author')
    }
    catch(error){
      throw new GraphQLError('Saving book failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args.title,
          error
        }
      })
    }
    },
    editAuthor:async(root,args)=>{
      try{
      const author=await Author.findOne({name:args.name})
      author.born=args.setBornTo
      const savedAuthor=await author.save()
      return savedAuthor
    }
    catch(error){
      throw new GraphQLError('setting author\'s born year failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args.name,
          error
        }
      })
    }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
