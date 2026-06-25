function NoteCard({ note, onDelete }) {
  return (
    <article className="note-card">
      <div>
        <p className="note-text">{note.text}</p>
        <p className="note-meta">{new Date(note.createdAt).toLocaleString()}</p>
      </div>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </article>
  );
}

export default NoteCard;
