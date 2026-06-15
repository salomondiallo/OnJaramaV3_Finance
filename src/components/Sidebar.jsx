import { navigationItems } from "../data/navigationItems";

function Sidebar({ sidebarOpen, currentPage, setCurrentPage }) {
  if (!sidebarOpen) return null;

  return (
    <aside className="desktop-sidebar" style={sidebarStyle}>
      <div>
        <div style={brandBox}>
          <img src="/onjarama-path-logo.png" alt="OnJarama Path" style={logo} />

          <h2 style={{ marginTop: "8px" }}>
            <span style={{ color: "#e11d2e" }}>ON</span>JARAMA
          </h2>

          <p style={pathText}>PATH</p>

          <p style={tagline}>
            Votre parcours.
            <br />
            Votre rythme.
            <br />
            Votre avenir.
          </p>
        </div>

        <ul>
          {navigationItems
            .filter((item) => item.id !== "reglages")
            .map((item) => (
              <li
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className="tile-hover"
                style={{
                  ...menuItem,
                  background:
                    currentPage === item.id ? "#143b73" : "transparent",
                  color: currentPage === item.id ? "white" : "var(--text-muted)",
                  fontWeight: currentPage === item.id ? "bold" : "normal",
                  borderColor:
                    currentPage === item.id ? "#4da3ff" : "transparent",
                }}
              >
                {item.label}
              </li>
            ))}
        </ul>
      </div>

      <div
        onClick={() => setCurrentPage("reglages")}
        className="tile-hover"
        style={{
          ...profileBox,
          background: currentPage === "reglages" ? "#143b73" : "var(--bg-card)",
        }}
      >
        👤 Profil / Réglages →
      </div>
    </aside>
  );
}

const sidebarStyle = {
  width: "260px",
  minHeight: "100vh",
  background: "var(--bg-panel)",
  padding: "18px",
  borderRight: "1px solid var(--border)",
  position: "sticky",
  top: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const brandBox = {
  textAlign: "center",
  marginBottom: "28px",
};

const logo = {
  width: "115px",
  height: "115px",
  objectFit: "contain",
  marginBottom: "10px",
};

const pathText = {
  color: "#e11d2e",
  fontWeight: "bold",
  letterSpacing: "6px",
  marginTop: "4px",
};

const tagline = {
  color: "var(--text-muted)",
  fontSize: "12px",
  marginTop: "10px",
  lineHeight: "18px",
};

const menuItem = {
  padding: "14px",
  marginBottom: "8px",
  borderRadius: "12px",
  cursor: "pointer",
  border: "1px solid transparent",
};

const profileBox = {
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid var(--border)",
  cursor: "pointer",
  color: "white",
};

export default Sidebar;