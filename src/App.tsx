import "./App.css";

import { collection } from "firebase/firestore";
import { useMemo, useState } from "react";

import { Auth } from "./components/auth";
import { FormCreateNewBook } from "./components/forms/formCreateNewBook";
import { BookList } from "./components/lists/bookList";
import { db } from "./config/firebase";

function App() {
  const [updateBookList, setUpdateBookList] = useState(1);
  const booksCollectionRef = useMemo(() => collection(db, "books"), []);

  return (
    <div className="App" data-testid="app-page">
      <header className="App-header">
        <p className="header">
          🚀 Vite + React + Typescript + React Testing Library 🤘 <br />& Eslint
          🔥+ Prettier
        </p>

        <Auth />

        <FormCreateNewBook
          booksCollectionRef={booksCollectionRef}
          setUpdateBookList={setUpdateBookList}
        />

        <BookList
          booksCollectionRef={booksCollectionRef}
          update={updateBookList}
        />
      </header>
    </div>
  );
}

export default App;
