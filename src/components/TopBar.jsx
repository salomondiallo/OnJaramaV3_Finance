function TopBar({ currentPage, goBack }) {
  if (currentPage === "accueil") return null;

  return (
    <div style={bar}>
      <button onClick={goBack} style={backButton} aria-label="Retour">
        ←
      </button>
    </div>
  );
}

const bar = {
  minHeight: "42px",
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
};

const backButton = {
  width: "42px",
  height: "42px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "var(--bg-card)",
  color: "var(--gold)",
  fontSize: "22px",
  fontWeight: "bold",
  boxShadow: "0 8px 22px var(--shadow)",
};

export default TopBar;