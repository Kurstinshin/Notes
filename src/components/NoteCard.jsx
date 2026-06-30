function NoteCard({ note, onDelete, onTogglePin, showTimestamp, compactMode }) {
  const createdLabel = new Date(note.createdAt).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <article className={`note-card ${note.pinned ? 'note-card-pinned' : ''} ${compactMode ? 'compact-card' : ''}`}>
      <div className="note-card-main">
        <div className="note-card-top">
          <div>
            <p className="note-title">{note.title}</p>
            <span className="note-tag">{note.tag}</span>
          </div>
          <button
            className={`pin-button ${note.pinned ? 'active' : ''}`}
            type="button"
            onClick={() => onTogglePin(note.id)}
          >
            {note.pinned ? 'Pinned' : 'Pin'}
          </button>
        </div>
        <p className="note-text">{note.text}</p>
        {showTimestamp && <p className="note-meta">Created {createdLabel}</p>}
      </div>
      <button className="delete-button" type="button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </article>
  );
}

export default NoteCard;
