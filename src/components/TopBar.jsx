import {
  ArrowLeft,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cloud,
  FileText,
  Globe2,
  Home,
  Languages,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  UserCircle,
  Wifi,
  X,
} from "lucide-react";
import { useState } from "react";
import { getPageLabel, getText } from "../data/translations";

function TopBar({
  currentPage,
  goBack,
  canGoBack,
  setCurrentPage,
  notifications,
  settings,
  setSettings,
  auth,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const language = settings?.language || "FR";
  const t = getText(settings);

  const isConnected = Boolean(auth?.user || auth?.session?.user);
  const userEmail =
    auth?.user?.email ||
    auth?.session?.user?.email ||
    auth?.profile?.email ||
    "";

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

  function updateLanguage(nextLanguage) {
    if (typeof setSettings !== "function") {
      openPage("reglages", true);
      return;
    }

    setSettings({
      ...settings,
      language: nextLanguage,
    });
  }

  function toggleQuickLanguage() {
    if (language === "FR") {
      updateLanguage("EN");
      return;
    }

    updateLanguage("FR");
  }

  return (
    <div className={`topbar ${isMainPage ? "topbar-main" : ""}`}>
      <div className="topbar-left">
        {!isMainPage && canGoBack ? (
          <button onClick={goBack} className="topbar-back" aria-label={t.return}>
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
          onClick={toggleQuickLanguage}
          className="topbar-menu-btn"
          aria-label={language === "EN" ? "Switch to French" : "Passer en anglais"}
          style={languageButton}
        >
          {language}
        </button>

        <button
          onClick={() => openPage("notifications")}
          className="topbar-menu-btn"
          aria-label={t.notificationsPage}
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
          aria-label={t.menuOnJarama}
        >
          <Menu size={22} />
        </button>
      </div>

      {menuOpen && (
        <>
          <button
            className="topbar-menu-backdrop"
            onClick={() => setMenuOpen(false)}
            aria-label={t.closeMenu}
          />

          <div className="topbar-menu-panel" style={slidePanel}>
            <div className="topbar-menu-head">
              <strong>OnJarama Path V13.1</strong>
              <span>{t.v131Subtitle}</span>
            </div>

            <div style={accountCard}>
              <div style={accountTop}>
                <UserCircle size={26} color="var(--gold)" />
                <div>
                  <strong>{isConnected ? t.connectedAccount : t.guestMode}</strong>
                  <small>{userEmail || "OnJarama Path"}</small>
                </div>
              </div>

              <div style={cloudGrid}>
                <CloudStatus
                  icon={<Cloud size={16} />}
                  title="Cloud"
                  value={isConnected ? t.cloudReady : t.cloudGuest}
                  color="var(--gold)"
                />

                <CloudStatus
                  icon={<Wifi size={16} />}
                  title={t.cloudSync}
                  value={isConnected ? t.cloudPrepared : t.cloudLocal}
                  color="var(--blue)"
                />

                <CloudStatus
                  icon={<CheckCircle2 size={16} />}
                  title={t.backup}
                  value={t.localActive}
                  color="var(--green)"
                />
              </div>
            </div>

            <div style={languagePanel}>
              <div style={languagePanelTitle}>
                <Languages size={17} />
                <strong>{t.language}</strong>
              </div>

              <div style={languageGrid}>
                <button
                  onClick={() => updateLanguage("FR")}
                  style={languageChoice(language === "FR")}
                >
                  FR — {t.french}
                </button>

                <button
                  onClick={() => updateLanguage("EN")}
                  style={languageChoice(language === "EN")}
                >
                  EN — {t.english}
                </button>

                <button
                  onClick={() => updateLanguage("ES")}
                  style={languageChoice(language === "ES")}
                >
                  ES — {t.spanish}
                </button>

                <button disabled style={languageDisabled}>
                  {t.chinese}
                  <small>{t.soon}</small>
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

            <button onClick={() => openPage("reglages")}>
              <Settings size={18} />
              {getPageLabel("reglages", language)}
            </button>

            <button onClick={() => openPage("reglages", true)}>
              <Globe2 size={18} />
              {t.languageSettings}
            </button>

            <button onClick={() => openPage("notifications")}>
              <Bell size={18} />
              {getPageLabel("notifications", language)}
              {unreadCount > 0 && (
                <span style={notificationBadge}>{unreadCount}</span>
              )}
            </button>

            <button onClick={() => openPage("guide")}>
              <BookOpen size={18} />
              {getPageLabel("guide", language)}
            </button>

            <button onClick={() => openPage("patchnotes")}>
              <FileText size={18} />
              {getPageLabel("patchnotes", language)}
            </button>

            <button onClick={() => openPage("historique")}>
              <Clock3 size={18} />
              {getPageLabel("historique", language)}
            </button>

            <button onClick={() => openPage("reglages")}>
              <ShieldCheck size={18} />
              {t.securityPrivacy}
            </button>

            <button disabled style={disabledMenuButton}>
              <LogOut size={18} />
              {t.signOutSoon}
            </button>

            <div className="topbar-credit">
              <strong>Thierno Diallo</strong>
              <span>{t.founder}</span>
              <small>{t.guineaQuebecCanada}</small>
              <small>{t.proudlyQuebec}</small>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="topbar-close-btn"
            >
              <X size={17} />
              {t.closeMenu}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function CloudStatus({ icon, title, value, color }) {
  return (
    <div style={{ ...cloudStatus, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <small>{title}</small>
      <strong>{value}</strong>
    </div>
  );
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

const accountCard = {
  border: "1px solid rgba(212,175,55,.35)",
  background:
    "linear-gradient(135deg, rgba(212,175,55,.10), rgba(56,189,248,.06), var(--bg-panel))",
  borderRadius: "16px",
  padding: "12px",
  marginBottom: "10px",
};

const accountTop = {
  display: "grid",
  gridTemplateColumns: "34px 1fr",
  gap: "10px",
  alignItems: "center",
  marginBottom: "10px",
};

const cloudGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "8px",
};

const cloudStatus = {
  border: "1px solid var(--border)",
  background: "rgba(0,0,0,.10)",
  borderRadius: "13px",
  padding: "9px",
  display: "grid",
  gridTemplateColumns: "24px 1fr",
  gap: "3px 8px",
  alignItems: "center",
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

const disabledMenuButton = {
  opacity: 0.62,
  cursor: "not-allowed",
};

export default TopBar;