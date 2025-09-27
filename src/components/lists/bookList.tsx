import {
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { auth, db } from "../../config/firebase";

interface props {
  booksCollectionRef: CollectionReference;
  update: number;
}

export const BookList = ({ booksCollectionRef, update }: props) => {
  const [bookList, setBookList] = useState<{ id: string }[]>([]);

  const getBookList = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const filteredData: { id: string }[] = data.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBookList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookList();
  }, [update]);

  const updateBookTitle = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const book = Object.fromEntries(formData.entries());

    const bookDoc = doc(db, "books", `${book.id}`);
    try {
      // TODO: delete next line
      console.log(auth?.currentUser?.uid);

      await updateDoc(bookDoc, { title: book.newTitle });
      getBookList();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (id: string) => {
    const bookDoc = doc(db, "books", id);
    try {
      await deleteDoc(bookDoc);
      getBookList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {bookList.map((book: any) => (
        <div key={`book-${book.id}`}>
          <h1 style={{ color: book.read ? "green" : "#d12800" }}>
            {book.title || "untitled"}
          </h1>
          <p>Author: {book.author}</p>
          <p>Year: {book.year}</p>
          <p>Read: {book.read?.toString()}</p>
          <button onClick={() => deleteBook(book.id)}>Delete book</button>
          <form onSubmit={updateBookTitle} style={{ display: "inline" }}>
            <input
              type="text"
              name="id"
              hidden={true}
              value={book.id}
              readOnly={true}
            />
            <input type="text" name="newTitle" placeholder="new title..." />
            <button type="submit">Update title</button>
          </form>
        </div>
      ))}
    </div>
  );
};
