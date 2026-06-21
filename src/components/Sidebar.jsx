function Sidebar({ sidebarOpen, currentPage, setCurrentPage, settings }) {
  if (!sidebarOpen) return null;

  const language = settings?.language || "FR";

  const t = {
    FR: {
      account: "Compte",
      preferences: "Préférences",
      resources: "Ressources",
      security: "Sécurité",
      profile: "Profil",
      settings: "Paramètres",
      guide: "Guide",
      patchNotes: "Patch Notes",
      privacy: "Confidentialité",
      logout: "Déconnexion",
    },
    EN: {
      account: "Account",
      preferences: "Preferences",
      resources: "Resources",
      security: "Security",
      profile: "Profile",
      settings: "Settings",
      guide: "Guide",
      patchNotes: "Patch Notes",
      privacy: "Privacy",
      logout: "Logout",
    },
    ES: {
      account: "Cuenta",
      preferences: "Preferencias",
      resources: "Recursos",
      security: "Seguridad",
      profile: "Perfil",
      settings: "Configuración",
      guide: "Guía",
      patchNotes: "Patch Notes",
      privacy: "Privacidad",
      logout: "Cerrar sesión",
    },
  }[language];

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

        <MenuSection title={t.account}>
          <MenuItem
            active={currentPage === "profil"}
            onClick={() => setCurrentPage("profil")}
          >
            {t.profile}
          </MenuItem>

          <MenuItem
            active={currentPage === "reglages"}
            onClick={() => setCurrentPage("reglages")}
          >
            {t.settings}
          </MenuItem>
        </MenuSection>

        <MenuSection title={t.preferences}>
          <MenuItem>{language}</MenuItem>
          <MenuItem>Notifications</MenuItem>
          <MenuItem>Thème</MenuItem>
        </MenuSection>

        <MenuSection title={t.resources}>
          <MenuItem onClick={() => setCurrentPage("guide")}>
            {t.guide}
          </MenuItem>

          <MenuItem onClick={() => setCurrentPage("patchnotes")}>
            {t.patchNotes}
          </MenuItem>
        </MenuSection>

        <MenuSection title={t.security}>
          <MenuItem>{t.privacy}</MenuItem>
        </MenuSection>
      </div>

      <div style={logoutBox}>
        <MenuItem danger>{t.logout}</MenuItem>
      </div>
    </aside>
  );
}

function MenuSection({ title, children }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={sectionTitle}>{title}</div>
      {children}
    </div>
  );
}

function MenuItem({ children, active, onClick, danger }) {
  return (
    <div
      onClick={onClick}
      style={{
        ...menuItem,
        background: active ? "#143b73" : "transparent",
        color: danger
          ? "#ef4444"
          : active
            ? "white"
            : "var(--text-muted)",
      }}
    >
      {children}
    </div>
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
};

const pathText = {
  color: "#e11d2e",
  fontWeight: "bold",
  letterSpacing: "6px",
};

const tagline = {
  color: "var(--text-muted)",
  fontSize: "12px",
  marginTop: "10px",
};

const sectionTitle = {
  color: "var(--gold)",
  fontSize: "12px",
  fontWeight: "700",
  textTransform: "uppercase",
  marginBottom: "8px",
};

const menuItem = {
  padding: "12px",
  borderRadius: "12px",
  cursor: "pointer",
  marginBottom: "6px",
};

const logoutBox = {
  borderTop: "1px solid var(--border)",
  paddingTop: "12px",
};

export default Sidebar;