import { useState } from 'react'
import { useMutation } from '@apollo/client';
import {ALL_AUTHORS, SET_BORN} from '../App';

const Authors = ({people, show}) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [setBirth] = useMutation(SET_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS}]
  })

  

  if (!show) {
    return null
  }
  const authors = people
  const onSubmit = async (event) => {
    event.preventDefault();
    let born = Number.parseInt(birthYear) || 0; 
    setBirth({variables: {name, born}})

  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birth year</h2>
      <form  onSubmit={onSubmit}>
        <select>
          {authors.map((a) => (
            <option key={authors.indexOf(a)} onClick={() => setName(a.name)}>{a.name}</option>
          ))}
        </select>
        <input type="number" placeholder='enter year' value={birthYear} onChange={({target}) => setBirthYear(target.value)}></input>
        <button type='submit' >save</button>
      </form>
    </div>
  )
}

export default Authors
