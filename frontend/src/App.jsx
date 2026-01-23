import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { api } from "./api";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import Login from "./components/Login";
import Register from "./components/Register";

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
    <Router>
      <div className="container">
        {isAdmin && (
          <div className="header">
            <h1>Book Management System</h1>
            <button onClick={handleLogout} className="logout-btn">Sign Out</button>
          </div>
        )}
        {!isAdmin && <h1>Book Management System</h1>}
        <Routes>
          <Route path="/register" element={
            isAdmin ? <Navigate to="/" /> : <Register />
          } />
          <Route path="/" element={
            isAdmin ? (
              <>
                <BookForm onSubmit={addBook} />
                <BookList books={books} onDelete={deleteBook} onUpdate={updateBook} />
              </>
            ) : (
              <Login onLogin={handleLogin} />
            )
          } />
        </Routes>
      </div>
    </Router>
  );

}
