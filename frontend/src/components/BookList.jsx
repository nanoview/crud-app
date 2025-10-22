import { useState } from "react";

export default function BookList({ books, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(null);
  const [editBook, setEditBook] = useState({});

  return (
    <ul>
      {books.map((b) => (
        <li key={b._id} style={{ marginBottom: 10 }}>
          {editing === b._id ? (
            <>
              <input value={editBook.title}
                     onChange={e => setEditBook({ ...editBook, title: e.target.value })} />
              <input value={editBook.author}
                     onChange={e => setEditBook({ ...editBook, author: e.target.value })} />
              <input value={editBook.year}
                     onChange={e => setEditBook({ ...editBook, year: e.target.value })} />
              <button onClick={() => { onUpdate(b._id, editBook); setEditing(null); }}>Save</button>
            </>
          ) : (
            <>
              {b.title} — {b.author} ({b.year})
              <button onClick={() => { setEditing(b._id); setEditBook(b); }}>✏️</button>
              <button onClick={() => onDelete(b._id)}>🗑️</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
