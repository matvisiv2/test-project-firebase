import {
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../../config/firebase";

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

  const deleteBook = async (id: any) => {
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
          <h1>{book.title ?? book.bookTitle}</h1>
          <p>Author: {book.author}</p>
          <p>Year: {book.year}</p>
          <p>Read: {book.read?.toString()}</p>
          <p>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </p>
        </div>
      ))}
    </div>
  );
};
