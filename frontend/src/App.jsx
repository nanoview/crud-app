import { useEffect, useState } from "react";
import { api } from "./api";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

export default function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await api.get("/");
    setBooks(res.data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const addBook = async (book) => {
    await api.post("/", book);
    fetchBooks();
  };

  const updateBook = async (id, book) => {
    await api.put(`/${id}`, book);
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await api.delete(`/${id}`);
    fetchBooks();
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>📚 Book Manager</h1>
      <BookForm onSubmit={addBook} />
      <BookList books={books} onDelete={deleteBook} onUpdate={updateBook} />
    </div>
  );
}
