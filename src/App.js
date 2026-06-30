import { useEffect, useMemo, useState } from 'react';
import './App.css';
import NoteHeader from './components/NoteHeader';
import NoteInputPanel from './components/NoteInputPanel';
import NoteList from './components/NoteList';
import NoteSearch from './components/NoteSearch';
import ProfileSettingsPanel from './components/ProfileSettingsPanel';

const STORAGE_KEY = 'noteApp.notes';
const SETTINGS_KEY = 'noteApp.settings';

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  });
  const [draftTitle, setDraftTitle] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [draftTag, setDraftTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [profileName, setProfileName] = useState('');
  const [profileMood, setProfileMood] = useState('');
  const [accent, setAccent] = useState('rose');
  const [showTimestamps, setShowTimestamps] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [isLandingVisible, setIsLandingVisible] = useState(true);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    try {
      const savedSettings = JSON.parse(window.localStorage.getItem(SETTINGS_KEY) ?? '{}');
      setProfileName(savedSettings.profileName ?? '');
      setProfileMood(savedSettings.profileMood ?? '');
      setAccent(savedSettings.accent ?? 'rose');
      setShowTimestamps(savedSettings.showTimestamps ?? true);
      setCompactMode(savedSettings.compactMode ?? false);
    } catch {
      // ignore invalid stored settings
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({ profileName, profileMood, accent, showTimestamps, compactMode })
    );
  }, [profileName, profileMood, accent, showTimestamps, compactMode]);

  const addNote = () => {
    const title = draftTitle.trim();
    const text = draftBody.trim();
    const tag = draftTag.trim();

    if (!title && !text) return;

    const newNote = {
      id: Date.now(),
      title: title || 'Untitled note',
      text: text || 'No details yet.',
      tag: tag || 'General',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pinned: false,
    };

    setNotes((current) => [newNote, ...current]);
    setDraftTitle('');
    setDraftBody('');
    setDraftTag('');
  };

  const deleteNote = (id) => {
    setNotes((current) => current.filter((note) => note.id !== id));
  };

  const togglePin = (id) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const clearNotes = () => {
    setNotes([]);
  };

  const filteredNotes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    let list = [...notes];

    if (query) {
      list = list.filter((note) =>
        [note.title, note.text, note.tag]
          .join(' ')
          .toLowerCase()
          .includes(query)
      );
    }

    return list.sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }

      if (sortBy === 'pinned') {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [notes, searchTerm, sortBy]);

  return (
    <div className={`App accent-${accent}`}>
      <div className={`note-shell ${compactMode ? 'compact-shell' : ''}`}>
        {isLandingVisible ? (
          <section className="landing-screen">
            <div className="landing-hero">
              <p className="landing-kicker">Welcome to your cozy corner</p>
              <h1 className="landing-title">Hello, {profileName || 'Kirsten'}</h1>
              <p className="landing-copy">
                {profileMood || 'Ready for your next soft idea?'}
              </p>
            </div>

            <ProfileSettingsPanel
              profileName={profileName}
              onProfileNameChange={setProfileName}
              profileMood={profileMood}
              onProfileMoodChange={setProfileMood}
              accent={accent}
              onAccentChange={setAccent}
              showTimestamps={showTimestamps}
              onToggleTimestamps={() => setShowTimestamps((value) => !value)}
              compactMode={compactMode}
              onToggleCompactMode={() => setCompactMode((value) => !value)}
            />

            <button className="primary-button landing-button" type="button" onClick={() => setIsLandingVisible(false)}>
              Open Pink Notes
            </button>
          </section>
        ) : (
          <>
            <div className="page-topbar">
              <button className="secondary-button small-button" type="button" onClick={() => setIsLandingVisible(true)}>
                ← Back
              </button>
              <NoteHeader
                noteCount={notes.length}
                visibleCount={filteredNotes.length}
                isFiltered={searchTerm.trim().length > 0}
                pinnedCount={notes.filter((note) => note.pinned).length}
              />
            </div>
            <NoteInputPanel
              draftTitle={draftTitle}
              onTitleChange={setDraftTitle}
              draftBody={draftBody}
              onBodyChange={setDraftBody}
              draftTag={draftTag}
              onTagChange={setDraftTag}
              onAddNote={addNote}
              onClearNotes={clearNotes}
              hasNotes={notes.length > 0}
            />
            <NoteSearch
              searchTerm={searchTerm}
              sortBy={sortBy}
              onSearchChange={setSearchTerm}
              onClearSearch={() => setSearchTerm('')}
              onSortChange={setSortBy}
            />
            <NoteList
              notes={filteredNotes}
              onDeleteNote={deleteNote}
              onTogglePin={togglePin}
              showTimestamps={showTimestamps}
              compactMode={compactMode}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
