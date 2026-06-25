function NoteSearch({ searchTerm, onSearchChange, onClearSearch }) {
  return (
    <section className="note-search-panel">
      <input
        type="search"
        aria-label="Search notes"
        className="note-search-input"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      {searchTerm && (
        <button className="secondary-button small-button" type="button" onClick={onClearSearch}>
          Clear search
        </button>
      )}
    </section>
  );
}

export default NoteSearch;
