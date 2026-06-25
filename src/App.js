import { useEffect, useState } from 'react';
import './App.css';
import NoteHeader from './components/NoteHeader';
import NoteInputPanel from './components/NoteInputPanel';
import NoteList from './components/NoteList';

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
        <NoteHeader noteCount={notes.length} />
        <NoteInputPanel
          draft={draft}
          onDraftChange={setDraft}
          onAddNote={addNote}
          onClearNotes={clearNotes}
          hasNotes={notes.length > 0}
        />
        <NoteList notes={notes} onDeleteNote={deleteNote} />
      </div>
    </div>
  );
}

export default App;
