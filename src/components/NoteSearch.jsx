function NoteSearch({ searchTerm, sortBy, onSearchChange, onClearSearch, onSortChange }) {
  return (
    <section className="note-search-panel">
      <input
        type="search"
        aria-label="Search notes"
        className="note-search-input"
        placeholder="Search notes, tags, or ideas..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <label className="sort-select">
        <span>Sort</span>
        <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          <option value="recent">Most recent</option>
          <option value="pinned">Pinned first</option>
        </select>
      </label>
      {searchTerm && (
        <button className="secondary-button small-button" type="button" onClick={onClearSearch}>
          Clear search
        </button>
      )}
    </section>
  );
}

export default NoteSearch;
