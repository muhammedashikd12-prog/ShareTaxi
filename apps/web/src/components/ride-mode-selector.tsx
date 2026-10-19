const modes = [
  { id: 'intercity', title: 'Intercity', description: 'Long-distance seats' },
  { id: 'on-demand', title: 'On-demand', description: 'Shared rides now' },
  { id: 'commute', title: 'Commute', description: 'Daily routes' }
];

export function RideModeSelector() {
  return (
    <div className="ride-mode-selector" aria-label="Ride modes">
      {modes.map((mode) => (
        <button key={mode.id} className={`mode-pill ${mode.id === 'intercity' ? 'active' : ''}`} type="button">
          <strong>{mode.title}</strong>
          <span>{mode.description}</span>
        </button>
      ))}
    </div>
  );
}
