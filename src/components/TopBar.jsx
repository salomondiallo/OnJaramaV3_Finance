import {
  ArrowLeft,
  Bell,
  BookOpen,
  ChevronRight,
  Clock3,
  FileText,
  Globe2,
  Home,
  Languages,
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
  settings,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const language = settings?.language || "FR";

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
            {getPageLabel("accueil", language)}
            {currentPage !== "accueil" && (
              <>
                <ChevronRight size={12} />
                {getPageLabel(currentPage, language)}
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
          style={languageButton}
        >
          {language}
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
              <strong>OnJarama Path V10.3</strong>
              <span>UX Premium Finalization</span>
            </div>

            <div style={languagePanel}>
              <div style={languagePanelTitle}>
                <Languages size={17} />
                <strong>{language === "EN" ? "Language" : "Langue"}</strong>
              </div>

              <div style={languageGrid}>
                <button
                  onClick={() => openPage("reglages", true)}
                  style={languageChoice(language === "FR")}
                >
                  Français
                </button>

                <button
                  onClick={() => openPage("reglages", true)}
                  style={languageChoice(language === "EN")}
                >
                  English
                </button>

                <button disabled style={languageDisabled}>
                  中文
                  <small>
                    {language === "EN" ? "Soon" : "Bientôt"}
                  </small>
                </button>
              </div>
            </div>

            <button onClick={() => openPage("accueil")}>
              <Home size={18} />
              {getPageLabel("accueil", language)}
            </button>

            <button onClick={() => openPage("profil")}>
              <UserCircle size={18} />
              {getPageLabel("profil", language)}
            </button>

            <button onClick={() => openPage("guide")}>
              <BookOpen size={18} />
              {language === "EN" ? "Guide & Tips" : "Guide & Astuces"}
            </button>

            <button onClick={() => openPage("patchnotes")}>
              <FileText size={18} />
              Patch Notes
            </button>

            <button onClick={() => openPage("reglages")}>
              <Settings size={18} />
              {getPageLabel("reglages", language)}
            </button>

            <button onClick={() => openPage("reglages", true)}>
              <Globe2 size={18} />
              {language === "EN" ? "Language" : "Langue"}
            </button>

            <button onClick={() => openPage("notifications")}>
              <Bell size={18} />
              {getPageLabel("notifications", language)}
              {unreadCount > 0 && (
                <span style={notificationBadge}>{unreadCount}</span>
              )}
            </button>

            <button onClick={() => openPage("historique")}>
              <Clock3 size={18} />
              {getPageLabel("historique", language)}
            </button>

            <button onClick={() => openPage("reglages")}>
              <ShieldCheck size={18} />
              {language === "EN"
                ? "Security & privacy"
                : "Sécurité & confidentialité"}
            </button>

            <div className="topbar-credit">
              <strong>Thierno Diallo</strong>
              <span>
                {language === "EN"
                  ? "Founder of the OnJarama ecosystem"
                  : "Fondateur de l’écosystème OnJarama"}
              </span>
              <small>Guinée 🇬🇳 • Québec ⚜️ • Canada 🇨🇦</small>
              <small>
                {language === "EN"
                  ? "Proudly developed in Quebec ⚜️"
                  : "Fièrement développé au Québec ⚜️"}
              </small>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="topbar-close-btn"
            >
              <X size={17} />
              {language === "EN" ? "Close menu" : "Fermer le menu"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function getPageLabel(page, language = "FR") {
  const labels = {
    FR: {
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
      guide: "Guide & Astuces",
      patchnotes: "Patch Notes",
    },
    EN: {
      accueil: "Home",
      situation: "Situation",
      objectifs: "Goals",
      parcours: "Path",
      monplan: "My Plan",
      simulateur: "Simulator",
      dettes: "Debts",
      epargne: "Savings",
      paiements: "Payments",
      transactions: "Transactions",
      assistant: "AI Assistant",
      budget: "Budget",
      explorer: "Explorer",
      horizon: "Horizon",
      profil: "Profile",
      reglages: "Settings",
      notifications: "Notifications",
      historique: "History",
      guide: "Guide & Tips",
      patchnotes: "Patch Notes",
    },
  };

  return labels[language]?.[page] || labels.FR[page] || "Page";
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

const languageButton = {
  color: "var(--gold)",
  fontWeight: "900",
  boxShadow: "0 0 0 3px rgba(212,175,55,.12)",
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

const languagePanel = {
  border: "1px solid rgba(212,175,55,.35)",
  background: "rgba(212,175,55,.08)",
  borderRadius: "16px",
  padding: "12px",
  marginBottom: "10px",
};

const languagePanelTitle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "var(--gold)",
  marginBottom: "10px",
};

const languageGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "8px",
};

function languageChoice(active) {
  return {
    width: "100%",
    border: active ? "1px solid var(--gold)" : "1px solid var(--border)",
    background: active ? "rgba(212,175,55,.16)" : "var(--bg-panel)",
    color: active ? "var(--gold)" : "var(--text-main)",
    borderRadius: "13px",
    padding: "10px",
    fontWeight: "900",
    textAlign: "left",
    boxShadow: active ? "0 0 16px rgba(212,175,55,.18)" : "none",
  };
}

const languageDisabled = {
  width: "100%",
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,.04)",
  color: "var(--text-muted)",
  borderRadius: "13px",
  padding: "10px",
  fontWeight: "900",
  textAlign: "left",
  opacity: 0.7,
  display: "grid",
  gap: "2px",
};

export default TopBar;