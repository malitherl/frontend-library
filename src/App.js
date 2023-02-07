import { useState } from 'react'
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`
const ALL_BOOKS = gql`
  query {
    allBooks{
      title
      published
      author {
        name
        born
      }
      id
      genres
    }
  }
`
const ALL_GENRE = gql`
  query {
    allGenre
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
      author {
        name
        born
        bookCount
      }
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
      bookCount 
    }
  }

`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_FILTER = gql`
  query findBookByGenre($genre: String!) {
    findBookByGenre(genre: $genre) {
      title
      published
      author {
        name
        born
        bookCount
      }
      id
      genres
    }
  }
`

export const USER = gql`
  query me{
    me {
      username
      favouriteGenre
      id
    }
  }
`




const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_AUTHORS);
  const result0 = useQuery(ALL_BOOKS);
  const result1 = useQuery(ALL_GENRE);
  const client = useApolloClient();
  const [createBook] = useMutation(ADD_BOOKS, {
    refetchQueries: [ { query: ALL_BOOKS } ] })

  if (result.loading || result0.loading || result1.loading) {

    return <div>loading...</div>
   
  }

  console.log(page)
  const logout = () => {
    setToken(null)
    localStorage.clear();
    client.resetStore();
    setPage('authors')
  }


  const allA = result.data.allAuthors
  const allB = result0.data.allBooks
  const allG = result1.data.allGenre

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
      </div>
      {token ? <button onClick={() => logout()}>logout</button> 
               
            :  <button onClick={() => setPage('login')}>login</button> } 
      
      {token && <button onClick={() => setPage('add')}>add a book</button>}
      {token && <button onClick={() => setPage('recommend')}>recommend</button>}
      
      <Authors people= {allA} show={page === 'authors'} />
      <Books genres={allG}  books= {allB} show={page === 'books'} />
      <NewBook createBook={createBook} show = {page === 'add'}/>
      <Login setToken= {setToken} show={page === 'login'}/>
      {token ? <Recommend show={page === 'recommend'}/> : <div></div>}
      
      
    </div>
  )
}

export default App
