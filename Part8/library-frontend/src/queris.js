import {gql} from "@apollo/client"

export const All_AUTHORS=gql`
query {
    allAuthors{
        id
        name
        born
        bookCount
    }
}`

export const ALL_BOOKS=gql`
query {
    allBooks{
        id
        title
        author
        published
    }
}
`

export const ADD_BOOK=gql`
mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    published
    author
    id
    genres
  }
}
`

export const EDIT_AUTHOR=gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    bookCount
    born
    id
    name
  }
}
`