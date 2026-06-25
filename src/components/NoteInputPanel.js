function NoteInputPanel({ draft, onDraftChange, onAddNote, onClearNotes, hasNotes }) {
  return (
    <section className="note-input-panel">
      <textarea
        aria-label="Write a note"
        className="note-textarea"
        placeholder="Write a new note..."
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
      />
      <div className="note-buttons">
        <button className="primary-button" onClick={onAddNote} disabled={!draft.trim()}>
          Add note
        </button>
        <button className="secondary-button" onClick={onClearNotes} disabled={!hasNotes}>
          Clear all
        </button>
      </div>
    </section>
  );
}

export default NoteInputPanel;
