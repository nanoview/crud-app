import { useState } from "react";

export default function BookForm({ onSubmit }) {
  const [book, setBook] = useState({ title: "", author: "", year: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(book);
    setBook({ title: "", author: "", year: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input placeholder="Title" value={book.title}
             onChange={e => setBook({ ...book, title: e.target.value })} />
      <input placeholder="Author" value={book.author}
             onChange={e => setBook({ ...book, author: e.target.value })} />
      <input placeholder="Year" value={book.year}
             onChange={e => setBook({ ...book, year: e.target.value })} />
      <button type="submit">Add</button>
    </form>
  );
}
