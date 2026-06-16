import { useState } from "react";
import {
  Bell,
  Cloud,
  CreditCard,
  Globe,
  Info,
  Languages,
  Lock,
  Palette,
  RefreshCcw,
  Shield,
  UserCircle,
  Wallet,
} from "lucide-react";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    subtitle: "Préférences rapides, sécurité, sauvegarde et crédits.",
    language: "Langue",
    currency: "Devise",
    appearance: "Apparence",
    notifications: "Notifications",
    synchronization: "Synchronisation",
    backup: "Sauvegarde",
    reset: "Réinitialisation",
    credits: "Crédits",
    privacy: "Confidentialité",
    account: "Compte",

    french: "Français",
    english: "English",
    spanish: "Español",

    dark: "Mode sombre",
    light: "Mode clair",

    on: "ON",
    off: "OFF",

    syncSoon: "Bientôt disponible.",
    syncText: "Connexion cloud prévue plus tard. Aucune transaction bancaire.",
    backupText: "Sauvegarde locale automatique activée sur cet appareil.",
    privacyText:
      "Aucune transaction bancaire n’est possible dans cette version. Les données restent locales tant que la synchronisation n’est pas activée.",
    accountText: "Profil utilisateur, pays, langue et devise sont visibles dans Profil.",

    resetGoals: "Réinitialiser les objectifs",
    resetFinance: "Réinitialiser les finances",
    resetSettings: "Réinitialiser les réglages",
    resetAll: "Réinitialiser tout",

    creator: "Créateur",
    founder: "Fondateur de l’écosystème OnJarama",
    appVersion: "OnJarama Path • Version 3.1 Beta",
    ecosystem: "OnJarama • OJCS • OJCT",
  },

  EN: {
    subtitle: "Quick preferences, security, backup and credits.",
    language: "Language",
    currency: "Currency",
    appearance: "Appearance",
    notifications: "Notifications",
    synchronization: "Synchronization",
    backup: "Backup",
    reset: "Reset",
    credits: "Credits",
    privacy: "Privacy",
    account: "Account",

    french: "Français",
    english: "English",
    spanish: "Español",

    dark: "Dark mode",
    light: "Light mode",

    on: "ON",
    off: "OFF",

    syncSoon: "Coming soon.",
    syncText: "Cloud connection planned later. No banking transaction.",
    backupText: "Automatic local backup enabled on this device.",
    privacyText:
      "No banking transaction is possible in this version. Data stays local until synchronization is enabled.",
    accountText: "User profile, country, language and currency are visible in Profile.",

    resetGoals: "Reset goals",
    resetFinance: "Reset finances",
    resetSettings: "Reset settings",
    resetAll: "Reset everything",

    creator: "Creator",
    founder: "Founder of the OnJarama ecosystem",
    appVersion: "OnJarama Path • Version 3.1 Beta",
    ecosystem: "OnJarama • OJCS • OJCT",
  },

  ES: {
    subtitle: "Preferencias rápidas, seguridad, copia y créditos.",
    language: "Idioma",
    currency: "Moneda",
    appearance: "Apariencia",
    notifications: "Notificaciones",
    synchronization: "Sincronización",
    backup: "Copia de seguridad",
    reset: "Restablecer",
    credits: "Créditos",
    privacy: "Privacidad",
    account: "Cuenta",

    french: "Français",
    english: "English",
    spanish: "Español",

    dark: "Modo oscuro",
    light: "Modo claro",

    on: "ON",
    off: "OFF",

    syncSoon: "Próximamente.",
    syncText: "Conexión cloud prevista más adelante. Ninguna transacción bancaria.",
    backupText: "Copia local automática activada en este dispositivo.",
    privacyText:
      "No es posible realizar transacciones bancarias en esta versión. Los datos permanecen locales hasta activar la sincronización.",
    accountText: "Perfil, país, idioma y moneda están visibles en Perfil.",

    resetGoals: "Restablecer objetivos",
    resetFinance: "Restablecer finanzas",
    resetSettings: "Restablecer ajustes",
    resetAll: "Restablecer todo",

    creator: "Creador",
    founder: "Fundador del ecosistema OnJarama",
    appVersion: "OnJarama Path • Versión 3.1 Beta",
    ecosystem: "OnJarama • OJCS • OJCT",
  },
};

function Reglages({
  settings,
  setSettings,
  resetAll,
  resetFinanceOnly,
  resetSettingsOnly,
  resetGoalsOnly,
  setCurrentPage,
}) {
  const t = getText(settings);
  const p = pageText[settings?.language || "FR"] || pageText.FR;
  const [openSection, setOpenSection] = useState("language");

  function updateSetting(name, value) {
    setSettings({ ...settings, [name]: value });
  }

  function toggle(section) {
    setOpenSection(openSection === section ? null : section);
  }

  return (
    <div>
      <h1>{t.reglages}</h1>
      <p style={muted}>{p.subtitle}</p>

      <Tile
        open={openSection === "language"}
        onClick={() => toggle("language")}
        icon={<Languages />}
        title={p.language}
        color="var(--green)"
      >
        <Option active={settings.language === "FR"} onClick={() => updateSetting("language", "FR")}>
          {p.french}
        </Option>

        <Option active={settings.language === "EN"} onClick={() => updateSetting("language", "EN")}>
          {p.english}
        </Option>

        <Option active={settings.language === "ES"} onClick={() => updateSetting("language", "ES")}>
          {p.spanish}
        </Option>
      </Tile>

      <Tile
        open={openSection === "currency"}
        onClick={() => toggle("currency")}
        icon={<Wallet />}
        title={p.currency}
        color="var(--gold)"
      >
        <Option active={settings.currency === "CAD"} onClick={() => updateSetting("currency", "CAD")}>
          🇨🇦 CAD
        </Option>
        <Option active={settings.currency === "USD"} onClick={() => updateSetting("currency", "USD")}>
          🇺🇸 USD
        </Option>
        <Option active={settings.currency === "EUR"} onClick={() => updateSetting("currency", "EUR")}>
          🇪🇺 EUR
        </Option>
        <Option active={settings.currency === "GBP"} onClick={() => updateSetting("currency", "GBP")}>
          🇬🇧 GBP
        </Option>
        <Option active={settings.currency === "GNF"} onClick={() => updateSetting("currency", "GNF")}>
          🇬🇳 GNF
        </Option>
        <Option active={settings.currency === "XOF"} onClick={() => updateSetting("currency", "XOF")}>
          🌍 XOF — CFA BCEAO
        </Option>
        <Option active={settings.currency === "XAF"} onClick={() => updateSetting("currency", "XAF")}>
          🌍 XAF — CFA BEAC
        </Option>
        <Option active={settings.currency === "CHF"} onClick={() => updateSetting("currency", "CHF")}>
          🇨🇭 CHF
        </Option>
        <Option active={settings.currency === "MAD"} onClick={() => updateSetting("currency", "MAD")}>
          🇲🇦 MAD
        </Option>
      </Tile>

      <Tile
        open={openSection === "appearance"}
        onClick={() => toggle("appearance")}
        icon={<Palette />}
        title={p.appearance}
        color="var(--purple)"
      >
        <Option active={settings.theme === "sombre"} onClick={() => updateSetting("theme", "sombre")}>
          {p.dark}
        </Option>

        <Option active={settings.theme === "clair"} onClick={() => updateSetting("theme", "clair")}>
          {p.light}
        </Option>
      </Tile>

      <Tile
        open={openSection === "notifications"}
        onClick={() => toggle("notifications")}
        icon={<Bell />}
        title={p.notifications}
        color="var(--green)"
      >
        <Option active={settings.notifications} onClick={() => updateSetting("notifications", true)}>
          {p.on}
        </Option>

        <Option active={!settings.notifications} onClick={() => updateSetting("notifications", false)}>
          {p.off}
        </Option>
      </Tile>

      <Tile
        open={openSection === "sync"}
        onClick={() => toggle("sync")}
        icon={<Cloud />}
        title={p.synchronization}
        color="var(--blue)"
      >
        <p>{p.syncSoon}</p>
        <p style={muted}>{p.syncText}</p>
      </Tile>

      <Tile
        open={openSection === "backup"}
        onClick={() => toggle("backup")}
        icon={<Shield />}
        title={p.backup}
        color="var(--gold)"
      >
        <p>{p.backupText}</p>
      </Tile>

      <Tile
        open={openSection === "reset"}
        onClick={() => toggle("reset")}
        icon={<RefreshCcw />}
        title={p.reset}
        color="var(--red)"
      >
        <button onClick={resetGoalsOnly} style={dangerBtn}>
          {p.resetGoals}
        </button>

        <button onClick={resetFinanceOnly} style={dangerBtn}>
          {p.resetFinance}
        </button>

        <button onClick={resetSettingsOnly} style={dangerBtn}>
          {p.resetSettings}
        </button>

        <button onClick={resetAll} style={dangerBtn}>
          {p.resetAll}
        </button>
      </Tile>

      <Tile
        open={openSection === "credits"}
        onClick={() => toggle("credits")}
        icon={<Info />}
        title={p.credits}
        color="var(--purple)"
      >
        <InfoRow label={p.creator} value="Thierno Diallo" />
        <InfoRow label="OnJarama" value={p.founder} />
        <InfoRow label="Version" value={p.appVersion} />
        <InfoRow label="Écosystème" value={p.ecosystem} />
      </Tile>

      <Tile
        open={openSection === "privacy"}
        onClick={() => toggle("privacy")}
        icon={<Lock />}
        title={p.privacy}
        color="var(--gold)"
      >
        <p style={muted}>{p.privacyText}</p>
      </Tile>

      <Tile
        open={openSection === "account"}
        onClick={() => toggle("account")}
        icon={<UserCircle />}
        title={p.account}
        color="var(--blue)"
      >
        <p style={muted}>{p.accountText}</p>

        <button onClick={() => setCurrentPage("profil")} style={profileBtn}>
          {t.profil}
        </button>
      </Tile>
    </div>
  );
}

function Tile({ icon, title, color, open, onClick, children }) {
  return (
    <section style={{ ...tile, borderColor: open ? color : "var(--border)" }}>
      <button onClick={onClick} style={tileHeader}>
        <span style={{ ...iconBox, color }}>{icon}</span>
        <strong>{title}</strong>
        <span style={toggleIcon}>{open ? "−" : "+"}</span>
      </button>

      {open && <div style={tileContent}>{children}</div>}
    </section>
  );
}

function Option({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...option,
        borderColor: active ? "var(--green)" : "var(--border)",
        background: active ? "rgba(34,197,94,.12)" : "var(--bg-panel)",
      }}
    >
      <span>{active ? "✓" : "○"}</span>
      <span>{children}</span>
    </button>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={infoRow}>
      <span style={muted}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const tile = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "10px",
  marginTop: "12px",
};

const tileHeader = {
  width: "100%",
  background: "transparent",
  border: "none",
  color: "var(--text-main)",
  display: "grid",
  gridTemplateColumns: "40px 1fr 28px",
  alignItems: "center",
  gap: "10px",
  textAlign: "left",
};

const iconBox = {
  width: "38px",
  height: "38px",
  borderRadius: "13px",
  background: "var(--bg-panel)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const toggleIcon = {
  fontSize: "22px",
  color: "var(--text-muted)",
  textAlign: "center",
};

const tileContent = {
  marginTop: "12px",
  paddingTop: "12px",
  borderTop: "1px solid var(--border)",
};

const option = {
  width: "100%",
  padding: "12px",
  borderRadius: "13px",
  border: "1px solid var(--border)",
  color: "var(--text-main)",
  marginTop: "8px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  textAlign: "left",
};

const dangerBtn = {
  width: "100%",
  padding: "13px",
  borderRadius: "13px",
  border: "1px solid var(--red)",
  background: "#3a150f",
  color: "white",
  marginTop: "10px",
};

const profileBtn = {
  width: "100%",
  padding: "13px",
  borderRadius: "13px",
  border: "none",
  background: "linear-gradient(90deg,var(--purple),var(--blue))",
  color: "white",
  fontWeight: "bold",
  marginTop: "12px",
};

const infoRow = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  marginTop: "8px",
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "4px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

export default Reglages;