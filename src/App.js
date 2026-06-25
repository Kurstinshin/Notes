import { useEffect, useState } from 'react';
import './App.css';

const STORAGE_KEY = 'noteApp.notes';

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  });
  const [draft, setDraft] = useState('');

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const text = draft.trim();
    if (!text) return;

    const newNote = {
      id: Date.now(),
      text,
      createdAt: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setDraft('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const clearNotes = () => {
    setNotes([]);
  };

  return (
    <div className="App">
      <div className="note-shell">
        <header className="note-header">
          <div>
            <p className="note-brand">Personal Notes</p>
            <p className="note-subtitle">Capture ideas, tasks, and reminders instantly.</p>
          </div>
          <span className="note-count">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
        </header>

        <section className="note-input-panel">
          <textarea
            aria-label="Write a note"
            className="note-textarea"
            placeholder="Write a new note..."
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <div className="note-buttons">
            <button className="primary-button" onClick={addNote} disabled={!draft.trim()}>
              Add note
            </button>
            <button className="secondary-button" onClick={clearNotes} disabled={notes.length === 0}>
              Clear all
            </button>
          </div>
        </section>

        <section className="note-list">
          {notes.length === 0 ? (
            <div className="note-empty">
              <p>No notes yet. Add one above to get started.</p>
            </div>
          ) : (
            notes.map((note) => (
              <article className="note-card" key={note.id}>
                <div>
                  <p className="note-text">{note.text}</p>
                  <p className="note-meta">{new Date(note.createdAt).toLocaleString()}</p>
                </div>
                <button className="delete-button" onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
