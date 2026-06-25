function NoteHeader({ noteCount, visibleCount, isFiltered }) {
  return (
    <header className="note-header">
      <div>
        <p className="note-brand">Personal Notes</p>
        <p className="note-subtitle">Capture ideas, tasks, and reminders instantly.</p>
        {isFiltered && (
          <p className="note-filter-info">
            Showing {visibleCount} of {noteCount} notes matching your search.
          </p>
        )}
      </div>
      <span className="note-count">
        {noteCount} {noteCount === 1 ? 'note' : 'notes'}
      </span>
    </header>
  );
}

export default NoteHeader;
