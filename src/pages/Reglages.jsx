import { useEffect, useState } from "react";
import {
  Bell,
  Building2,
  CheckCircle,
  Cloud,
  Fingerprint,
  Info,
  KeyRound,
  Languages,
  Lock,
  Palette,
  RefreshCcw,
  Shield,
  ShieldCheck,
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
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!successMessage) return;
    const timer = window.setTimeout(() => setSuccessMessage(""), 2400);
    return () => window.clearTimeout(timer);
  }, [successMessage]);

  function updateSetting(name, value) {
    setSettings({ ...settings, [name]: value });
  }

  function toggle(section) {
    setOpenSection(openSection === section ? null : section);
  }

  function askConfirm(label, action, success) {
    setConfirmAction({ label, action, success });
  }

  function runConfirmedAction() {
    if (!confirmAction?.action) return;

    confirmAction.action();
    setSuccessMessage(confirmAction.success || p.resetDone);
    setConfirmAction(null);
  }

  return (
    <div className="native-page">
      <h1>{t.reglages}</h1>
      <p style={muted}>{p.subtitle}</p>

      {successMessage && (
        <section style={successBox}>
          <CheckCircle color="var(--green)" />
          <strong>{successMessage}</strong>
        </section>
      )}

      {confirmAction && (
        <section style={confirmBox}>
          <strong>{p.confirmTitle}</strong>
          <p style={muted}>
            {p.confirmText}
            <br />
            <strong>{confirmAction.label}</strong>
          </p>

          <div style={confirmActions}>
            <button onClick={runConfirmedAction} style={dangerBtn}>
              {p.yesReset}
            </button>

            <button onClick={() => setConfirmAction(null)} style={cancelBtn}>
              {p.cancel}
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
        <p style={muted}>{p.securityIntro}</p>

        <StatusLine title={p.localStorage} text={p.activeOnDevice} color="var(--green)" />
        <StatusLine title={p.noTransactions} text={p.guaranteed} color="var(--green)" />
        <StatusLine title={p.readOnlyBanking} text={p.soon} color="var(--gold)" />
        <StatusLine title={t.pinCode} text={t.soon} color="var(--gold)" />
        <StatusLine
          title={t.biometrics}
          text={t.soon}
          color="var(--green)"
          icon={<Fingerprint size={16} />}
        />
        <StatusLine title={t.googleSignIn} text={t.soon} color="var(--blue)" />
        <StatusLine title={t.microsoftSignIn} text={t.soon} color="var(--purple)" />
      </Tile>

      <Tile
        open={openSection === "trust"}
        onClick={() => toggle("trust")}
        icon={<ShieldCheck />}
        title={p.trustCenter}
        color="var(--green)"
      >
        <p style={muted}>{p.trustText}</p>

        <StatusLine title={p.dataOwnership} text={p.userControlled} color="var(--green)" />
        <StatusLine title={p.localMode} text={p.availableNow} color="var(--green)" />
        <StatusLine title={p.resetPossible} text={p.availableNow} color="var(--gold)" />
        <StatusLine title={p.bankingFuture} text={p.readOnlyOnly} color="var(--blue)" />
        <StatusLine title={p.transactions} text={p.neverByApp} color="var(--green)" />
      </Tile>

      <Tile
        open={openSection === "sync"}
        onClick={() => toggle("sync")}
        icon={<Cloud />}
        title={t.cloudSynchronization}
        color="var(--blue)"
      >
        <StatusLine title={t.cloudSync} text={t.cloudComingSoon} color="var(--blue)" />
        <StatusLine title={t.googleSignIn} text={t.soon} color="var(--green)" />
        <StatusLine title={t.microsoftSignIn} text={t.soon} color="var(--purple)" />

        <p style={muted}>{t.cloudText}</p>

        <InfoRow label="syncEnabled" value={String(Boolean(settings.syncEnabled))} />
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
        <StatusLine title={t.bankSync} text={t.bankingComingSoon} color="var(--gold)" />
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
        <p style={resetIntro}>{p.resetIntro}</p>

        <button
          onClick={() => askConfirm(t.resetGoals, resetGoalsOnly, p.goalsResetDone)}
          style={dangerBtn}
        >
          {t.resetGoals}
        </button>

        <button
          onClick={() => askConfirm(t.resetFinance, resetFinanceOnly, p.financeResetDone)}
          style={dangerBtn}
        >
          {t.resetFinance}
        </button>

        <button
          onClick={() => askConfirm(t.resetSettings, resetSettingsOnly, p.settingsResetDone)}
          style={dangerBtn}
        >
          {t.resetSettings}
        </button>

        <button
          onClick={() => askConfirm(t.resetAll, resetAll, p.allResetDone)}
          style={dangerStrongBtn}
        >
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
        <InfoRow label={p.version} value="V20 Production Ready" />
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
    subtitle:
      "Langue, notifications, apparence, comportement, sécurité et informations de l'application.",
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
    trustCenter: "Centre de confiance",
    trustText:
      "OnJarama Path vous aide à comprendre votre situation. L’application ne déplace pas d’argent et ne prend pas de décision à votre place.",
    dataOwnership: "Vos données",
    userControlled: "Sous votre contrôle",
    localMode: "Mode local",
    availableNow: "Disponible",
    resetPossible: "Réinitialisation",
    bankingFuture: "Banque future",
    readOnlyOnly: "Lecture seule",
    transactions: "Transactions",
    neverByApp: "Jamais par l’app",
    securityIntro:
      "La sécurité doit être visible. Voici ce que l’application fait et ne fait pas.",
    localStorage: "Stockage local",
    activeOnDevice: "Actif sur cet appareil",
    noTransactions: "Aucune transaction",
    guaranteed: "Garanti",
    readOnlyBanking: "Connexion bancaire",
    soon: "Bientôt",
    resetIntro:
      "Chaque réinitialisation demande une confirmation. Une fois validée, l’action est appliquée immédiatement.",
    confirmTitle: "Confirmation requise",
    confirmText: "Cette action peut effacer des données. Voulez-vous continuer ?",
    yesReset: "Oui, réinitialiser",
    cancel: "Annuler",
    resetDone: "Réinitialisation effectuée.",
    goalsResetDone: "Objectifs réinitialisés.",
    financeResetDone: "Données financières réinitialisées.",
    settingsResetDone: "Réglages réinitialisés.",
    allResetDone: "Application réinitialisée.",
  },
  EN: {
    subtitle:
      "Language, notifications, appearance, behavior, security and application information.",
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
    trustCenter: "Trust center",
    trustText:
      "OnJarama Path helps you understand your situation. The app does not move money and does not make decisions for you.",
    dataOwnership: "Your data",
    userControlled: "Under your control",
    localMode: "Local mode",
    availableNow: "Available",
    resetPossible: "Reset",
    bankingFuture: "Future banking",
    readOnlyOnly: "Read-only",
    transactions: "Transactions",
    neverByApp: "Never by the app",
    securityIntro:
      "Security must be visible. Here is what the app does and does not do.",
    localStorage: "Local storage",
    activeOnDevice: "Active on this device",
    noTransactions: "No transaction",
    guaranteed: "Guaranteed",
    readOnlyBanking: "Bank connection",
    soon: "Soon",
    resetIntro:
      "Each reset requires confirmation. Once validated, the action is applied immediately.",
    confirmTitle: "Confirmation required",
    confirmText: "This action can erase data. Do you want to continue?",
    yesReset: "Yes, reset",
    cancel: "Cancel",
    resetDone: "Reset completed.",
    goalsResetDone: "Goals reset.",
    financeResetDone: "Financial data reset.",
    settingsResetDone: "Settings reset.",
    allResetDone: "Application reset.",
  },
  ES: {
    subtitle:
      "Idioma, notificaciones, apariencia, comportamiento, seguridad e información de la aplicación.",
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
    trustCenter: "Centro de confianza",
    trustText:
      "OnJarama Path te ayuda a entender tu situación. La app no mueve dinero y no toma decisiones por ti.",
    dataOwnership: "Tus datos",
    userControlled: "Bajo tu control",
    localMode: "Modo local",
    availableNow: "Disponible",
    resetPossible: "Reinicio",
    bankingFuture: "Banco futuro",
    readOnlyOnly: "Solo lectura",
    transactions: "Transacciones",
    neverByApp: "Nunca por la app",
    securityIntro:
      "La seguridad debe ser visible. Esto es lo que la app hace y no hace.",
    localStorage: "Almacenamiento local",
    activeOnDevice: "Activo en este dispositivo",
    noTransactions: "Ninguna transacción",
    guaranteed: "Garantizado",
    readOnlyBanking: "Conexión bancaria",
    soon: "Pronto",
    resetIntro:
      "Cada reinicio requiere confirmación. Una vez validado, la acción se aplica inmediatamente.",
    confirmTitle: "Confirmación requerida",
    confirmText: "Esta acción puede borrar datos. ¿Deseas continuar?",
    yesReset: "Sí, reiniciar",
    cancel: "Cancelar",
    resetDone: "Reinicio realizado.",
    goalsResetDone: "Objetivos reiniciados.",
    financeResetDone: "Datos financieros reiniciados.",
    settingsResetDone: "Ajustes reiniciados.",
    allResetDone: "Aplicación reiniciada.",
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

const successBox = {
  background: "linear-gradient(135deg, rgba(34,197,94,.16), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "18px",
  padding: "14px",
  marginTop: "12px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
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
  fontWeight: "900",
};

const dangerStrongBtn = {
  ...dangerBtn,
  background: "linear-gradient(90deg, #7f1d1d, #3a150f)",
};

const cancelBtn = {
  width: "100%",
  padding: "13px",
  borderRadius: "13px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
  marginTop: "10px",
  fontWeight: "900",
};

const resetIntro = {
  color: "var(--text-muted)",
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
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