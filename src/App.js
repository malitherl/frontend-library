import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      books {
          title
          published
          author
          id
          genres
       }
    }
  }
`
const ALL_BOOKS = gql`
  query {
    allBooks{
      title
      published
      author 
    }
  }
`
const ADD_BOOKS = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author, 
      published: $published, 
      genres: $genres
    ) {
      title 
      author 
      published
      genres
    }
  }
`
export const SET_BORN = gql`
  mutation setBornTo($name: String!, $born: Int!) {
    setBornTo(
      name: $name, 
      born: $born
    ) {
      name
      born
      books {
        title
        published
        author
        id
        genres
      }
    }
  }

`



const App = () => {
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS);
  const result0 = useQuery(ALL_BOOKS)
  const [createBook] = useMutation(ADD_BOOKS, {
    refetchQueries: [ { query: ALL_BOOKS } ] })

  if (result.loading || result0.loading) {
    return <div>loading...</div>
  }
  const allA = result.data.allAuthors
  const allB = result0.data.allBooks
 
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors people= {allA} show={page === 'authors'} />

      <Books books= {allB} show={page === 'books'} />

      <NewBook createBook={createBook} show={page === 'add'} />
    </div>
  )
}

export default App
