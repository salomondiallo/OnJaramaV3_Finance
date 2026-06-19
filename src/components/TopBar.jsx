import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Clock3,
  Globe2,
  Home,
  Settings,
  ShieldCheck,
  UserCircle,
  X,
} from "lucide-react";
import { useState } from "react";

function TopBar({
  currentPage,
  goBack,
  canGoBack,
  setCurrentPage,
  notifications,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((item) => !item.read).length
    : 0;

  const mainPages = [
    "accueil",
    "situation",
    "objectifs",
    "parcours",
    "monplan",
    "simulateur",
  ];

  const isMainPage = mainPages.includes(currentPage);

  function openPage(page, keepOpen = false) {
    setCurrentPage(page);

    if (!keepOpen) {
      setMenuOpen(false);
    }
  }

  return (
    <div className={`topbar ${isMainPage ? "topbar-main" : ""}`}>
      <div className="topbar-left">
        {!isMainPage && canGoBack ? (
          <button onClick={goBack} className="topbar-back" aria-label="Retour">
            <ArrowLeft size={20} />
          </button>
        ) : (
          <img
            src="/onjarama-path-logo.png"
            alt="OnJarama Path"
            className="topbar-logo"
          />
        )}

        <div style={brandBlock}>
          <strong>ONJARAMA PATH</strong>
          <span style={breadcrumb}>
            Accueil
            {currentPage !== "accueil" && (
              <>
                <ChevronRight size={12} />
                {getPageLabel(currentPage)}
              </>
            )}
          </span>
        </div>
      </div>

      <div style={topActions}>
        <button
          onClick={() => openPage("reglages", true)}
          className="topbar-menu-btn"
          aria-label="Langue"
        >
          FR/EN
        </button>

        <button
          onClick={() => openPage("notifications")}
          className="topbar-menu-btn"
          aria-label="Notifications"
          style={menuButtonWithBadge}
        >
          <Bell size={19} />

          {unreadCount > 0 && (
            <span style={hamburgerBadge}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setMenuOpen(true)}
          className="topbar-menu-btn"
          aria-label="Profil"
        >
          <UserCircle size={21} />
        </button>
      </div>

      {menuOpen && (
        <>
          <button
            className="topbar-menu-backdrop"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
          />

          <div className="topbar-menu-panel" style={slidePanel}>
            <div className="topbar-menu-head">
              <strong>OnJarama Path V9.1</strong>
              <span>Navigation Premium</span>
            </div>

            <button onClick={() => openPage("accueil")}>
              <Home size={18} />
              Accueil
            </button>

            <button onClick={() => openPage("profil")}>
              <UserCircle size={18} />
              Mon profil
            </button>

            <button onClick={() => openPage("reglages")}>
              <Settings size={18} />
              Réglages
            </button>

            <button onClick={() => openPage("reglages", true)}>
              <Globe2 size={18} />
              Langue
            </button>

            <button onClick={() => openPage("notifications")}>
              <Bell size={18} />
              Notifications
              {unreadCount > 0 && (
                <span style={notificationBadge}>{unreadCount}</span>
              )}
            </button>

            <button onClick={() => openPage("historique")}>
              <Clock3 size={18} />
              Historique
            </button>

            <button onClick={() => openPage("reglages")}>
              <ShieldCheck size={18} />
              Sécurité & confidentialité
            </button>

            <div className="topbar-credit">
              <strong>Thierno Diallo</strong>
              <span>Fondateur de l’écosystème OnJarama</span>
              <small>Guinée 🇬🇳 • Québec ⚜️ • Canada 🇨🇦</small>
              <small>Fièrement développé au Québec ⚜️</small>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="topbar-close-btn"
            >
              <X size={17} />
              Fermer le menu
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function getPageLabel(page) {
  const labels = {
    accueil: "Accueil",
    situation: "Situation",
    objectifs: "Objectifs",
    parcours: "Parcours",
    monplan: "Mon Plan",
    simulateur: "Simulateur",
    dettes: "Dettes",
    epargne: "Épargne",
    paiements: "Paiements",
    transactions: "Transactions",
    assistant: "Assistant IA",
    budget: "Budget",
    explorer: "Explorer",
    horizon: "Horizon",
    profil: "Profil",
    reglages: "Réglages",
    notifications: "Notifications",
    historique: "Historique",
  };

  return labels[page] || "Page";
}

const brandBlock = {
  display: "grid",
  gap: "2px",
  minWidth: 0,
};

const breadcrumb = {
  display: "inline-flex",
  alignItems: "center",
  gap: "3px",
  color: "var(--text-muted)",
  fontSize: "11px",
  whiteSpace: "nowrap",
};

const topActions = {
  display: "flex",
  alignItems: "center",
  gap: "7px",
};

const slidePanel = {
  animation: "menuSlideIn .22s ease",
};

const menuButtonWithBadge = {
  position: "relative",
};

const hamburgerBadge = {
  position: "absolute",
  top: "-6px",
  right: "-6px",
  minWidth: "18px",
  height: "18px",
  borderRadius: "999px",
  background: "var(--red)",
  color: "white",
  fontSize: "10px",
  fontWeight: "bold",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 5px",
  border: "1px solid var(--bg-card)",
};

const notificationBadge = {
  marginLeft: "auto",
  minWidth: "22px",
  height: "22px",
  borderRadius: "999px",
  background: "var(--red)",
  color: "white",
  fontSize: "12px",
  fontWeight: "bold",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 6px",
};

export default TopBar;