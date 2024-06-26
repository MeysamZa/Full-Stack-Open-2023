import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client"
import {All_AUTHORS, ALL_BOOKS} from './queris'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState("authors");
  const authorsResult=useQuery(All_AUTHORS)
  const booksResult=useQuery(ALL_BOOKS)

  if(authorsResult.loading || booksResult.loading){
    return (
      <div>
        data is loading...
      </div>
    )
  }

  return (
    <div className='container'>
      <Notification/>
      <div>
        <button onClick={() => setPage("authors")} >authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={authorsResult.data.allAuthors}/>

      <Books show={page === "books"} books={booksResult.data.allBooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
