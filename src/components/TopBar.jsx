import {
  ArrowLeft,
  Bell,
  Globe2,
  Menu,
  Settings,
  UserCircle,
  X,
} from "lucide-react";
import { useState } from "react";

function TopBar({ currentPage, goBack, canGoBack, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const mainPages = [
    "accueil",
    "situation",
    "objectifs",
    "parcours",
    "profil",
    "simulateur",
  ];

  const isMainPage = mainPages.includes(currentPage);

  function openPage(page) {
    setCurrentPage(page);
    setMenuOpen(false);
  }

  return (
    <div className={`topbar ${isMainPage ? "topbar-main" : ""}`}>
      <div className="topbar-left">
        {!isMainPage && canGoBack && (
          <button onClick={goBack} className="topbar-back" aria-label="Retour">
            <ArrowLeft size={20} />
          </button>
        )}

        {isMainPage && (
          <img
            src="/onjarama-path-logo.png"
            alt="OnJarama Path"
            className="topbar-logo"
          />
        )}
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="topbar-menu-btn"
        aria-label="Menu"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {menuOpen && (
        <>
          <button
            className="topbar-menu-backdrop"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
          />

          <div className="topbar-menu-panel">
            <button onClick={() => openPage("profil")}>
              <UserCircle size={18} />
              Profil
            </button>

            <button onClick={() => openPage("reglages")}>
              <Settings size={18} />
              Réglages
            </button>

            <button onClick={() => openPage("reglages")}>
              <Globe2 size={18} />
              Langue
            </button>

            <button onClick={() => openPage("profil")}>
              <Bell size={18} />
              Notifications
            </button>

            <div className="topbar-credit">
              <strong>Thierno Diallo</strong>
              <span>Fondateur de l’écosystème OnJarama</span>
              <small>Fièrement développé au Québec ⚜️</small>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TopBar;