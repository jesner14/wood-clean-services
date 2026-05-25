type PlaceholderPanelProps = {
  heading: string;
  description: string;
};

export function PlaceholderPanel({ heading, description }: PlaceholderPanelProps) {
  return (
    <div
      className="card-elevated"
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 6px 24px rgba(82,51,124,0.10)',
        border: '1px solid #e2e8f0',
        maxWidth: '720px',
      }}
    >
      <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>
        {heading}
      </h2>
      <p style={{ fontSize: '15px', color: '#64748b', margin: 0, lineHeight: 1.7 }}>{description}</p>
    </div>
  );
}
