import { Menu, Route, Target, Wallet } from "lucide-react";
import { getText } from "../data/translations";

function BottomNav({ currentPage, setCurrentPage, settings }) {
  const t = getText(settings);

  function go(page) {
    setCurrentPage(page);
  }

  return (
    <nav style={nav}>
      <button onClick={() => go("accueil")} style={logoButton}>
        <img src="/onjarama-path-logo.png" alt="Accueil" style={logo} />
      </button>

      <NavButton
        active={currentPage === "situation"}
        icon={<Wallet />}
        label={t.situation}
        onClick={() => go("situation")}
      />

      <NavButton
        active={currentPage === "objectifs"}
        icon={<Target />}
        label={t.objectifs}
        onClick={() => go("objectifs")}
      />

      <NavButton
        active={currentPage === "parcours"}
        icon={<Route />}
        label={t.parcours}
        onClick={() => go("parcours")}
      />

      <button
        onClick={() => go("reglages")}
        style={{
          ...menuButton,
          color:
            currentPage === "profil" ||
            currentPage === "reglages" ||
            currentPage === "assistant"
              ? "var(--gold)"
              : "var(--text-muted)",
        }}
        aria-label="Menu et réglages"
      >
        <Menu size={24} />
      </button>
    </nav>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...navButton,
        color: active ? "var(--gold)" : "var(--text-muted)",
        background: active ? "rgba(212,175,55,.14)" : "transparent",
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

const nav = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  width: "100%",
  maxWidth: "100%",
  minHeight: "74px",
  background: "var(--bg-card)",
  borderTop: "1px solid var(--border)",
  display: "grid",
  gridTemplateColumns: "64px minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) 64px",
  alignItems: "center",
  gap: "4px",
  zIndex: 999,
  boxShadow: "0 -10px 30px var(--shadow)",
  padding: "6px 8px",
  overflow: "hidden",
};

const logoButton = {
  width: "54px",
  height: "54px",
  borderRadius: "18px",
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,.95)",
  display: "grid",
  placeItems: "center",
};

const logo = {
  width: "42px",
  height: "42px",
  objectFit: "contain",
};

const navButton = {
  minWidth: 0,
  border: "none",
  borderRadius: "15px",
  background: "transparent",
  padding: "7px 3px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  fontSize: "10.5px",
  overflow: "hidden",
};

const menuButton = {
  width: "54px",
  height: "54px",
  borderRadius: "18px",
  border: "1px solid var(--gold)",
  background: "var(--bg-panel)",
  display: "grid",
  placeItems: "center",
};

export default BottomNav;