import { CollectionReference, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

interface props {
  booksCollectionRef: CollectionReference;
  update: number;
}

export const BookList = ({ booksCollectionRef, update }: props) => {
  const [bookList, setBookList] = useState<{ id: string }[]>([]);

  const getBookList = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const filteredData: { id: string }[] = data.docs.map((doc) => ({
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

  return (
    <div>
      {bookList.map((book: any) => (
        <div key={`book-${book.id}`}>
          <h1>{book.title ?? book.bookTitle}</h1>
          <p>Author: {book.author}</p>
          <p>Year: {book.year}</p>
          <p>Read: {book.read?.toString()}</p>
        </div>
      ))}
    </div>
  );
};
