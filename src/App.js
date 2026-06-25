import { useEffect, useMemo, useState } from 'react';
import './App.css';
import NoteHeader from './components/NoteHeader';
import NoteInputPanel from './components/NoteInputPanel';
import NoteList from './components/NoteList';
import NoteSearch from './components/NoteSearch';

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
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredNotes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return notes;
    }

    return notes.filter((note) => note.text.toLowerCase().includes(query));
  }, [notes, searchTerm]);

  return (
    <div className="App">
      <div className="note-shell">
        <NoteHeader
          noteCount={notes.length}
          visibleCount={filteredNotes.length}
          isFiltered={searchTerm.trim().length > 0}
        />
        <NoteInputPanel
          draft={draft}
          onDraftChange={setDraft}
          onAddNote={addNote}
          onClearNotes={clearNotes}
          hasNotes={notes.length > 0}
        />
        <NoteSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={() => setSearchTerm('')}
        />
        <NoteList notes={filteredNotes} onDeleteNote={deleteNote} />
      </div>
    </div>
  );
}

export default App;
