import {
  ArrowLeft,
  Bell,
  BookOpen,
  ChevronRight,
  CreditCard,
  FileText,
  Info,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
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
  const m = menuText[language] || menuText.FR;

  const isConnected = Boolean(auth?.user || auth?.session?.user);

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
    "paiements",
  ];

  const isMainPage = mainPages.includes(currentPage);

  function openPage(page) {
    setCurrentPage?.(page);
    setMenuOpen(false);
  }

  function updateLanguage(nextLanguage) {
    if (typeof setSettings !== "function") return;

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

    if (language === "EN") {
      updateLanguage("ES");
      return;
    }

    updateLanguage("FR");
  }

  function signOut() {
    if (typeof auth?.signOut === "function") {
      auth.signOut();
      setMenuOpen(false);
    }
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
          aria-label={m.switchLanguage}
          title={m.switchLanguage}
          style={languageButton}
        >
          {language}
        </button>

        <button
          onClick={() => openPage("notifications")}
          className="topbar-menu-btn"
          aria-label={t.notificationsPage}
          title={t.notificationsPage}
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
          title={t.menuOnJarama}
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
              <strong>OnJarama Path V14.5</strong>
              <span>{m.subtitle}</span>
            </div>

            <MenuButton
              icon={<Settings size={18} />}
              label={getPageLabel("reglages", language)}
              onClick={() => openPage("reglages")}
            />

            <MenuButton
              icon={<CreditCard size={18} />}
              label={getPageLabel("paiements", language) || m.payments}
              onClick={() => openPage("paiements")}
            />

            <MenuButton
              icon={<BookOpen size={18} />}
              label={getPageLabel("guide", language)}
              onClick={() => openPage("guide")}
            />

            <MenuButton
              icon={<FileText size={18} />}
              label={getPageLabel("patchnotes", language)}
              onClick={() => openPage("patchnotes")}
            />

            <MenuButton
              icon={<ShieldCheck size={18} />}
              label={m.privacy}
              onClick={() => openPage("reglages")}
            />

            <MenuButton
              icon={<Info size={18} />}
              label={m.about}
              onClick={() => openPage("reglages")}
            />

            <div style={bottomActions}>
              <button
                onClick={signOut}
                disabled={!isConnected || typeof auth?.signOut !== "function"}
                style={{
                  ...logoutButton,
                  opacity:
                    isConnected && typeof auth?.signOut === "function" ? 1 : 0.62,
                  cursor:
                    isConnected && typeof auth?.signOut === "function"
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                <LogOut size={18} />
                {isConnected ? m.logout : t.signOutSoon}
              </button>

              <button
                onClick={() => setMenuOpen(false)}
                className="topbar-close-btn"
              >
                <X size={17} />
                {t.closeMenu}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const menuText = {
  FR: {
    subtitle: "Menu rapide OnJarama Path.",
    privacy: "Confidentialité",
    about: "À propos",
    logout: "Déconnexion",
    payments: "Paiements",
    switchLanguage: "Changer la langue",
  },
  EN: {
    subtitle: "OnJarama Path quick menu.",
    privacy: "Privacy",
    about: "About",
    logout: "Sign out",
    payments: "Payments",
    switchLanguage: "Switch language",
  },
  ES: {
    subtitle: "Menú rápido OnJarama Path.",
    privacy: "Privacidad",
    about: "Acerca de",
    logout: "Cerrar sesión",
    payments: "Pagos",
    switchLanguage: "Cambiar idioma",
  },
};

function MenuButton({ icon, label, onClick }) {
  return (
    <button onClick={onClick} style={menuButton}>
      {icon}
      <span>{label}</span>
    </button>
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

const menuButton = {
  width: "100%",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
  borderRadius: "14px",
  padding: "13px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: "900",
  textAlign: "left",
  marginTop: "9px",
};

const bottomActions = {
  borderTop: "1px solid var(--border)",
  marginTop: "14px",
  paddingTop: "12px",
  display: "grid",
  gap: "10px",
};

const logoutButton = {
  width: "100%",
  border: "1px solid var(--red)",
  background: "rgba(239,68,68,.12)",
  color: "var(--red)",
  borderRadius: "14px",
  padding: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontWeight: "900",
};

export default TopBar;
