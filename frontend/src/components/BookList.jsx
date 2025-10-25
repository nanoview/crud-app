import { useState } from "react";

export default function BookList({ books, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editBook, setEditBook] = useState({ title: "", author: "", year: "" });

  function startEdit(b) {
    setEditingId(b._id ?? b.id);
    setEditBook({ title: b.title ?? "", author: b.author ?? "", year: String(b.year ?? "") });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditBook({ title: "", author: "", year: "" });
  }

  function saveEdit(id) {
    const payload = { ...editBook, year: Number(editBook.year) };
    onUpdate(id, payload);
    cancelEdit();
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Title</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Author</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Year</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((b) => {
          const id = b._id ?? b.id;
          const isEditing = editingId === id;
          return (
            <tr key={id}>
              <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>
                {isEditing ? (
                  <input
                    value={editBook.title}
                    onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                  />
                ) : (
                  b.title
                )}
              </td>
              <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>
                {isEditing ? (
                  <input
                    value={editBook.author}
                    onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                  />
                ) : (
                  b.author
                )}
              </td>
              <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0", width: 80 }}>
                {isEditing ? (
                  <input
                    value={editBook.year}
                    onChange={(e) => setEditBook({ ...editBook, year: e.target.value })}
                    style={{ width: "100%" }}
                  />
                ) : (
                  b.year
                )}
              </td>
              <td style={{ padding: 8, borderBottom: "1px solid #f0f0f0" }}>
                {isEditing ? (
                  <>
                    <button onClick={() => saveEdit(id)} style={{ marginRight: 8 }}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(b)} style={{ marginRight: 8 }}>Edit</button>
                    <button onClick={() => onDelete(id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
