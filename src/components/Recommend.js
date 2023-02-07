import { useQuery } from "@apollo/client"
import { USER, BOOK_FILTER } from "../App"


const Recommend = (props) => {

    


    const user = useQuery(USER);
    
    const genre = user.data ?  user.data.me.favouriteGenre : null
    const filteredBooks = useQuery(BOOK_FILTER, {    
        variables: { genre },    
        skip: !genre,  
    })
    console.log(filteredBooks)

    if (!props.show) {
        return null
      }
    

    return (
        <div>
                        
            {
                filteredBooks.data && 
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
    )


}

export default Recommend;




    
   