import { useQuery } from "@apollo/client"
import { useState } from "react"
import { BOOK_FILTER } from "../App"


const Books = (props) => {
  


  const books = props.books
  const genres = props.genres

  const [filters, setFilters] = useState(false);
  const [genre, setGenre] = useState(null);
  const filteredBooks = useQuery(BOOK_FILTER, {    
        variables: { genre },    
        skip: !genre,  
      })
  if (!props.show) {
    return null
  }

  const handleClick = () => {
    setFilters(false)
    setGenre(null)
  }

  const handleGenre = (event) => {
    const genre = event.target.value
    setGenre(genre)
    setFilters(true)
  }


  return (
    <div>
      <h2>books</h2>
          <div>    
            {!genre && !filters &&
              <table>
                <tbody>
                  <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                  </tr>
                  {books.map((a) => (
                    <tr key={a.title}>
                      <td>{a.title}</td>
                      <td>{a.author.name}</td>
                      <td>{a.published}</td>
                    </tr>
                  ))}
                </tbody>
            </table>}
          </div>
          <div>
                {
                  filteredBooks.data && filters &&
                  <table>
                    <tbody>
                      <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                      </tr>
                      {filteredBooks.data.findBookByGenre.map((a) => (
                        <tr key={a.title}>
                          <td>{a.title}</td>
                          <td>{a.author.name}</td>
                          <td>{a.published}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                }

    </div>
      {genres.map((g, index) => <button key={index} value= {g} onClick={handleGenre}>{g}</button>)}
      <button onClick={handleClick}>clear filters</button>
    </div>
  )
}

export default Books
