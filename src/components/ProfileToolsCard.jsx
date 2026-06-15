function ProfileToolsCard() {
  const tools = ["📚 Ressources", "🧭 Guides", "❓ FAQ", "📘 Glossaire"];

  return (
    <div style={cardStyle}>
      <h2>Boîte à outils</h2>
      <p style={{ color: "#b8c7dd", marginTop: "5px" }}>dans Profil</p>

      <div style={toolGrid}>
        {tools.map((tool) => (
          <div key={tool} style={toolItem}>
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#0d1d33",
  border: "1px solid #1d3355",
  borderRadius: "16px",
  padding: "20px",
  minHeight: "150px",
};

const toolGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "10px",
  marginTop: "15px",
};

const toolItem = {
  background: "#081427",
  borderRadius: "12px",
  padding: "14px",
  textAlign: "center",
};

export default ProfileToolsCard;