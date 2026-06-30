import NoteCard from './NoteCard';

function NoteList({ notes, onDeleteNote, onTogglePin, showTimestamps, compactMode }) {
  if (notes.length === 0) {
    return (
      <section className="note-list">
        <div className="note-empty">
          <p>No notes yet. Add one above to get started.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="note-list">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDeleteNote}
          onTogglePin={onTogglePin}
          showTimestamp={showTimestamps}
          compactMode={compactMode}
        />
      ))}
    </section>
  );
}

export default NoteList;
