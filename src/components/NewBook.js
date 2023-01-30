import { useState } from 'react'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [p, setP] = useState('');
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
     
    let published = Number.parseInt(p) || 0; 
    props.createBook({ variables: {title, author, published, genres}})
    console.log('add book...')
    
    setTitle('')
    setP('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres => genres.concat(genre))
    setGenre('')
  }

  const seeState = () => {
    console.log(p)
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={p}
            placeholder="enter a year"
            onChange={({ target }) => setP(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button onClick={seeState}>show state</button>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
