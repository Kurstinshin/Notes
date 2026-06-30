function ProfileSettingsPanel({
  profileName,
  onProfileNameChange,
  profileMood,
  onProfileMoodChange,
  accent,
  onAccentChange,
  showTimestamps,
  onToggleTimestamps,
  compactMode,
  onToggleCompactMode,
}) {
  return (
    <section className="profile-settings-panel">
      <div className="profile-card">
        <div className="profile-avatar">💗</div>
        <div>
          <p className="profile-greeting">Hello, {profileName || 'cozy friend'}</p>
          <p className="profile-subtext">{profileMood || 'Ready for your next soft idea?'}</p>
        </div>
      </div>

      <div className="settings-grid">
        <label className="field">
          <span>Your name</span>
          <input
            aria-label="Your name"
            value={profileName}
            onChange={(event) => onProfileNameChange(event.target.value)}
            placeholder="Enter your name"
          />
        </label>

        <label className="field">
          <span>Vibe</span>
          <input
            aria-label="Profile mood"
            value={profileMood}
            onChange={(event) => onProfileMoodChange(event.target.value)}
            placeholder="Describe your mood"
          />
        </label>

        <label className="field">
          <span>Accent</span>
          <select aria-label="Accent color" value={accent} onChange={(event) => onAccentChange(event.target.value)}>
            <option value="rose">Rose</option>
            <option value="peach">Peach</option>
            <option value="lilac">Lilac</option>
          </select>
        </label>

        <div className="toggle-stack">
          <label className="toggle-row">
            <input type="checkbox" checked={showTimestamps} onChange={onToggleTimestamps} />
            <span>Show timestamps</span>
          </label>
          <label className="toggle-row">
            <input type="checkbox" checked={compactMode} onChange={onToggleCompactMode} />
            <span>Compact cards</span>
          </label>
        </div>
      </div>
    </section>
  );
}

export default ProfileSettingsPanel;
