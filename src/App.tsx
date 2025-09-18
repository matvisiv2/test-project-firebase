import "./App.css";

import React, { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, addDoc, collection } from "firebase/firestore";

function App () {
  const [bookList, setBookList] = useState([]);

  const booksCollectionRef = collection(db, "books");

  const getBookList = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      // TODO: delete next line
      console.log(filteredData);
      setBookList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookList();
  }, []);

  const createNewBook = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await addDoc(booksCollectionRef, { ...data, read: data.read ?? false });
      getBookList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App" data-testid="app-page">
      <header className="App-header">
        <p className="header">
          🚀 Vite + React + Typescript + React Testing Library 🤘 <br />& Eslint
          🔥+ Prettier
        </p>

        <Auth />

        <form onSubmit={createNewBook}>
          <input name="title" type="text" placeholder="Book title..." />
          <input name="author" type="text" placeholder="Author..." />
          <input name="year" type="number" />
          <input name="read" type="checkbox" />
          <label htmlFor="read">Read</label>
          <button type="submit">Submit book</button>
        </form>

        <div>
          {bookList.map((book) => (
            <div key={`book-${book.title}`}>
              <h1>{book.title ?? book.bookTitle}</h1>
              <p>Autor: {book.author}</p>
              <p>Year: {book.year}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
