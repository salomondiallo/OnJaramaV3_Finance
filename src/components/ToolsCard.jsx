function ToolsCard({ setCurrentPage }) {
  const tools = [
    { label: "Simulation budget", page: "rythme" },
    { label: "Simulation dette", page: "rythme" },
    { label: "Projection objectif", page: "rythme" },
    { label: "Assistant IA", page: "assistant" },
  ];

  return (
    <div style={card}>
      <h2>Outils</h2>
      <p style={muted}>Testez un montant, un projet ou une décision.</p>

      <div style={scrollRow}>
        {tools.map((tool) => (
          <button
            key={tool.label}
            onClick={() => setCurrentPage(tool.page)}
            className="tile-hover"
            style={toolCard}
          >
            {tool.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "18px",
  marginTop: "18px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "6px",
};

const scrollRow = {
  display: "flex",
  gap: "10px",
  overflowX: "auto",
  marginTop: "14px",
  paddingBottom: "8px",
};

const toolCard = {
  minWidth: "170px",
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "14px",
  color: "var(--text-main)",
  cursor: "pointer",
};

export default ToolsCard;