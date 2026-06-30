function NoteHeader({ noteCount, visibleCount, isFiltered, pinnedCount }) {
  return (
    <header className="note-header">
      <div>
        <p className="note-brand">Pink Notes</p>
        <p className="note-subtitle">
          Capture ideas, tasks, and reminders in one calm workspace.
        </p>
        {isFiltered && (
          <p className="note-filter-info">
            Showing {visibleCount} of {noteCount} notes matching your search.
          </p>
        )}
      </div>
      <div className="note-pill-stack">
        <span className="note-pill">📌 {pinnedCount} pinned</span>
        <span className="note-count">
          {noteCount} {noteCount === 1 ? 'note' : 'notes'}
        </span>
      </div>
    </header>
  );
}

export default NoteHeader;
