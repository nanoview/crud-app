import { useEffect, useState } from "react";
import { api } from "./api";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import Login from "./components/Login";

export default function App() {
  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(Boolean(localStorage.getItem('token')));

  const handleLogin = () => {
    setIsAdmin(true);
    fetchBooks();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
  };

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const addBook = async (book) => {
    try {
      await api.post("/books", book);
      fetchBooks();
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const updateBook = async (id, book) => {
    try {
      await api.put(`/books/${id}`, book);
      fetchBooks();
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      fetchBooks();
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  return (
    <div className="container">
      <h1>Book Management System</h1>
      {isAdmin ? (
        <>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
          <BookForm onSubmit={addBook} />
          <BookList books={books} onDelete={deleteBook} onUpdate={updateBook} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );

}
