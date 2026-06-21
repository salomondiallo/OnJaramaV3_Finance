import { useState } from "react";
import {
  Bell,
  Building2,
  Cloud,
  Fingerprint,
  Info,
  KeyRound,
  Languages,
  Lock,
  Palette,
  RefreshCcw,
  Shield,
  Sparkles,
  Wallet,
} from "lucide-react";
import { getText } from "../data/translations";

function Reglages({
  settings,
  setSettings,
  resetAll,
  resetFinanceOnly,
  resetSettingsOnly,
  resetGoalsOnly,
}) {
  const t = getText(settings);

  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;

  const [openSection, setOpenSection] = useState("language");
  const [confirmAction, setConfirmAction] = useState(null);

  function updateSetting(name, value) {
    setSettings({ ...settings, [name]: value });
  }

  function toggle(section) {
    setOpenSection(openSection === section ? null : section);
  }

  function askConfirm(label, action) {
    setConfirmAction({ label, action });
  }

  function runConfirmedAction() {
    if (!confirmAction?.action) return;

    confirmAction.action();
    setConfirmAction(null);
  }

  return (
    <div className="native-page">
      <h1>{t.reglages}</h1>
      <p style={muted}>{p.subtitle}</p>

      {confirmAction && (
        <section style={confirmBox}>
          <strong>{t.confirmReset}</strong>
          <p style={muted}>
            {t.resetWarning}
            <br />
            <strong>{confirmAction.label}</strong>
          </p>

          <div style={confirmActions}>
            <button onClick={runConfirmedAction} style={dangerBtn}>
              {t.yesConfirm}
            </button>

            <button onClick={() => setConfirmAction(null)} style={cancelBtn}>
              {t.cancel}
            </button>
          </div>
        </section>
      )}

      <Tile
        open={openSection === "language"}
        onClick={() => toggle("language")}
        icon={<Languages />}
        title={t.language}
        color="var(--green)"
      >
        <Option
          active={settings.language === "FR"}
          onClick={() => updateSetting("language", "FR")}
        >
          {t.french}
        </Option>

        <Option
          active={settings.language === "EN"}
          onClick={() => updateSetting("language", "EN")}
        >
          {t.english}
        </Option>

        <Option
          active={settings.language === "ES"}
          onClick={() => updateSetting("language", "ES")}
        >
          {t.spanish}
        </Option>

        <StatusLine title={t.chinese} text={t.soon} color="var(--blue)" />
      </Tile>

      <Tile
        open={openSection === "notifications"}
        onClick={() => toggle("notifications")}
        icon={<Bell />}
        title={t.notifications}
        color="var(--green)"
      >
        <Option
          active={settings.notifications}
          onClick={() => updateSetting("notifications", true)}
        >
          {t.on}
        </Option>

        <Option
          active={!settings.notifications}
          onClick={() => updateSetting("notifications", false)}
        >
          {t.off}
        </Option>
      </Tile>

      <Tile
        open={openSection === "appearance"}
        onClick={() => toggle("appearance")}
        icon={<Palette />}
        title={t.appearance}
        color="var(--purple)"
      >
        <Option
          active={settings.theme === "sombre"}
          onClick={() => updateSetting("theme", "sombre")}
        >
          {t.darkMode}
        </Option>

        <Option
          active={settings.theme === "clair"}
          onClick={() => updateSetting("theme", "clair")}
        >
          {t.lightMode}
        </Option>
      </Tile>

      <Tile
        open={openSection === "behavior"}
        onClick={() => toggle("behavior")}
        icon={<Sparkles />}
        title={p.behavior}
        color="var(--gold)"
      >
        <StatusLine title={p.onJaramaLive} text={t.on} color="var(--green)" />
        <StatusLine title={p.speAdvice} text={t.on} color="var(--gold)" />
        <StatusLine title={p.progressFlag} text={t.on} color="var(--blue)" />
        <StatusLine title={p.animations} text={t.on} color="var(--purple)" />
        <StatusLine title={p.hideNavigation} text={t.on} color="var(--green)" />
      </Tile>

      <Tile
        open={openSection === "privacy"}
        onClick={() => toggle("privacy")}
        icon={<Lock />}
        title={t.privacy}
        color="var(--gold)"
      >
        <p style={muted}>{t.privacyText}</p>

        <Option
          active={settings.privacyMode}
          onClick={() => updateSetting("privacyMode", true)}
        >
          {t.on}
        </Option>

        <Option
          active={!settings.privacyMode}
          onClick={() => updateSetting("privacyMode", false)}
        >
          {t.off}
        </Option>

        <StatusLine
          title={t.hideAmounts}
          text={settings.showAmounts ? t.off : t.on}
          color="var(--gold)"
        />

        <Option
          active={!settings.showAmounts}
          onClick={() => updateSetting("showAmounts", false)}
        >
          {t.hideAmounts}
        </Option>

        <Option
          active={settings.showAmounts}
          onClick={() => updateSetting("showAmounts", true)}
        >
          {t.showAmounts}
        </Option>
      </Tile>

      <Tile
        open={openSection === "security"}
        onClick={() => toggle("security")}
        icon={<KeyRound />}
        title={t.security}
        color="var(--purple)"
      >
        <p style={muted}>{t.securityText}</p>

        <StatusLine title={t.pinCode} text={t.soon} color="var(--gold)" />
        <StatusLine
          title={t.biometrics}
          text={t.soon}
          color="var(--green)"
          icon={<Fingerprint size={16} />}
        />
        <StatusLine title={t.googleSignIn} text={t.soon} color="var(--blue)" />
        <StatusLine
          title={t.microsoftSignIn}
          text={t.soon}
          color="var(--purple)"
        />
      </Tile>

      <Tile
        open={openSection === "sync"}
        onClick={() => toggle("sync")}
        icon={<Cloud />}
        title={t.cloudSynchronization}
        color="var(--blue)"
      >
        <StatusLine
          title={t.cloudSync}
          text={t.cloudComingSoon}
          color="var(--blue)"
        />

        <StatusLine
          title={t.googleSignIn}
          text={t.soon}
          color="var(--green)"
        />

        <StatusLine
          title={t.microsoftSignIn}
          text={t.soon}
          color="var(--purple)"
        />

        <p style={muted}>{t.cloudText}</p>

        <InfoRow
          label="syncEnabled"
          value={String(Boolean(settings.syncEnabled))}
        />
        <InfoRow label="cloudProvider" value={settings.cloudProvider || "null"} />
        <InfoRow label="lastSync" value={settings.lastSync || "null"} />
      </Tile>

      <Tile
        open={openSection === "banking"}
        onClick={() => toggle("banking")}
        icon={<Building2 />}
        title={t.bankConnection}
        color="var(--gold)"
      >
        <StatusLine
          title={t.bankSync}
          text={t.bankingComingSoon}
          color="var(--gold)"
        />
        <p style={muted}>{t.readOnlyNoTransaction}</p>
      </Tile>

      <Tile
        open={openSection === "currency"}
        onClick={() => toggle("currency")}
        icon={<Wallet />}
        title={t.currency}
        color="var(--gold)"
      >
        {["CAD", "USD", "EUR", "GBP", "GNF", "XOF", "XAF", "CHF", "MAD"].map(
          (currency) => (
            <Option
              key={currency}
              active={settings.currency === currency}
              onClick={() => updateSetting("currency", currency)}
            >
              {currency}
            </Option>
          )
        )}
      </Tile>

      <Tile
        open={openSection === "backup"}
        onClick={() => toggle("backup")}
        icon={<Shield />}
        title={t.backup}
        color="var(--gold)"
      >
        <p>{t.backupText}</p>
      </Tile>

      <Tile
        open={openSection === "reset"}
        onClick={() => toggle("reset")}
        icon={<RefreshCcw />}
        title={t.reset}
        color="var(--red)"
      >
        <button
          onClick={() => askConfirm(t.resetGoals, resetGoalsOnly)}
          style={dangerBtn}
        >
          {t.resetGoals}
        </button>

        <button
          onClick={() => askConfirm(t.resetFinance, resetFinanceOnly)}
          style={dangerBtn}
        >
          {t.resetFinance}
        </button>

        <button
          onClick={() => askConfirm(t.resetSettings, resetSettingsOnly)}
          style={dangerBtn}
        >
          {t.resetSettings}
        </button>

        <button onClick={() => askConfirm(t.resetAll, resetAll)} style={dangerBtn}>
          {t.resetAll}
        </button>
      </Tile>

      <Tile
        open={openSection === "about"}
        onClick={() => toggle("about")}
        icon={<Info />}
        title={p.about}
        color="var(--purple)"
      >
        <InfoRow label={p.application} value="OnJarama Path" />
        <InfoRow label={p.version} value="V13.5 Final Cleanup" />
        <InfoRow label={p.creator} value="Thierno Diallo" />
        <InfoRow label="OnJarama" value={t.founder} />
        <InfoRow label={p.origin} value={t.guineaQuebecCanada} />
        <InfoRow label={p.quebec} value={t.proudlyQuebec} />
      </Tile>
    </div>
  );
}

const pageText = {
  FR: {
    subtitle: "Langue, notifications, apparence, comportement, sécurité et informations de l'application.",
    behavior: "Comportement",
    onJaramaLive: "Afficher OnJarama Live",
    speAdvice: "Afficher les conseils SPE",
    progressFlag: "Afficher le drapeau de progression",
    animations: "Animations",
    hideNavigation: "Navigation masquable",
    about: "À propos",
    application: "Application",
    version: "Version",
    creator: "Créateur",
    origin: "Origine",
    quebec: "Québec",
  },
  EN: {
    subtitle: "Language, notifications, appearance, behavior, security and application information.",
    behavior: "Behavior",
    onJaramaLive: "Show OnJarama Live",
    speAdvice: "Show SPE advice",
    progressFlag: "Show progress flag",
    animations: "Animations",
    hideNavigation: "Hideable navigation",
    about: "About",
    application: "Application",
    version: "Version",
    creator: "Creator",
    origin: "Origin",
    quebec: "Quebec",
  },
  ES: {
    subtitle: "Idioma, notificaciones, apariencia, comportamiento, seguridad e información de la aplicación.",
    behavior: "Comportamiento",
    onJaramaLive: "Mostrar OnJarama Live",
    speAdvice: "Mostrar consejos SPE",
    progressFlag: "Mostrar bandera de progreso",
    animations: "Animaciones",
    hideNavigation: "Navegación ocultable",
    about: "Acerca de",
    application: "Aplicación",
    version: "Versión",
    creator: "Creador",
    origin: "Origen",
    quebec: "Quebec",
  },
};

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

function StatusLine({ title, text, color, icon = null }) {
  return (
    <div style={{ ...statusLine, borderColor: color }}>
      <div style={statusTitle}>
        {icon}
        <strong>{title}</strong>
      </div>
      <span>{text}</span>
    </div>
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

const statusLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  marginTop: "8px",
  display: "grid",
  gap: "4px",
};

const statusTitle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const confirmBox = {
  background: "linear-gradient(135deg, rgba(239,68,68,.14), var(--bg-card))",
  border: "1px solid var(--red)",
  borderRadius: "18px",
  padding: "14px",
  marginTop: "12px",
};

const confirmActions = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "12px",
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

const cancelBtn = {
  width: "100%",
  padding: "13px",
  borderRadius: "13px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
  marginTop: "10px",
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