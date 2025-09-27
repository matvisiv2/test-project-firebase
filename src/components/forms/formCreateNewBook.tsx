import { addDoc, CollectionReference } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

import { auth } from "../../config/firebase";

interface props {
  booksCollectionRef: CollectionReference;
  setUpdateBookList: Dispatch<SetStateAction<number>>;
}

export const FormCreateNewBook = ({
  booksCollectionRef,
  setUpdateBookList,
}: props) => {
  const createNewBook = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // TODO: delete next line
      console.log(auth?.currentUser?.uid);

      await addDoc(booksCollectionRef, {
        ...data,
        read: data.read ?? false,
        userId: auth?.currentUser?.uid ?? null,
      });
      setUpdateBookList(Math.random());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={createNewBook}>
      <input name="title" type="text" placeholder="Book title..." />
      <input name="author" type="text" placeholder="Author..." />
      <input name="year" type="number" />
      <input name="read" type="checkbox" />
      <label htmlFor="read">Read</label>
      <button type="submit">Submit book</button>
    </form>
  );
};
