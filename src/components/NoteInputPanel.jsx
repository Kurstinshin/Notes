function NoteInputPanel({
  draftTitle,
  onTitleChange,
  draftBody,
  onBodyChange,
  draftTag,
  onTagChange,
  onAddNote,
  onClearNotes,
  hasNotes,
}) {
  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      onAddNote();
    }
  };

  return (
    <section className="note-input-panel">
      <div className="note-input-grid">
        <label className="field">
          <span>Note title</span>
          <input
            aria-label="Note title"
            placeholder="Give this note a title"
            value={draftTitle}
            onChange={(event) => onTitleChange(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Tag</span>
          <input
            aria-label="Note tag"
            placeholder="e.g. Work"
            value={draftTag}
            onChange={(event) => onTagChange(event.target.value)}
          />
        </label>
      </div>
      <label className="field field-full">
        <span>Write a note</span>
        <textarea
          aria-label="Write a note"
          className="note-textarea"
          placeholder="Capture an idea, reminder, or plan..."
          value={draftBody}
          onChange={(event) => onBodyChange(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </label>
      <div className="note-input-meta">
        <span>{draftBody.length} characters</span>
        <span>{draftTitle.trim() || draftBody.trim() ? 'Ready to add' : 'Type a note to save it'}</span>
      </div>
      <div className="note-buttons">
        <button className="primary-button" onClick={onAddNote} disabled={!draftTitle.trim() && !draftBody.trim()}>
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
