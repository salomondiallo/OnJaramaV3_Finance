import { useState } from "react";
import {
  Bell,
  Cloud,
  Eye,
  Grid2X2,
  Info,
  Languages,
  LayoutList,
  Lock,
  Palette,
  RefreshCcw,
  Shield,
  SlidersHorizontal,
  UserCircle,
  Wallet,
} from "lucide-react";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    subtitle: "Préférences, affichage, sécurité et sauvegarde.",
    personalization: "Personnalisation",
    homePreview: "Aperçu sécurisé",
    shortcuts: "Raccourcis",
    display: "Affichage",
    security: "Sécurité & accès",
    language: "Langue",
    currency: "Devise",
    appearance: "Apparence",
    notifications: "Notifications",
    synchronization: "Synchronisation",
    backup: "Sauvegarde",
    reset: "Réinitialisation",
    credits: "Crédits",
    privacy: "Confidentialité",
    account: "Profil",
    french: "Français",
    english: "English",
    spanish: "Español",
    dark: "Mode sombre",
    light: "Mode clair",
    on: "ON",
    off: "OFF",
    compact: "Compact",
    standard: "Standard",
    large: "Large",
    grid: "Grille",
    list: "Liste",
    debt: "Dette",
    savings: "Épargne",
    income: "Revenus",
    goals: "Objectifs",
    advice: "Conseils",
    path: "Parcours",
    payment: "Paiement",
    goal: "Objectif",
    protection: "Protection",
    project: "Projet",
    travel: "Voyage",
    house: "Maison",
    ai: "IA",
    budget: "Budget",
    hideAmountsStart: "Masquer les montants au démarrage",
    autoHide: "Masquer automatiquement après 30 secondes",
    demoMode: "Mode Démo",
    privateMode: "Mode Privé",
    pin: "Code PIN",
    biometric: "Biométrie",
    twoFactor: "Vérification 2 étapes",
    soon: "Bientôt",
    syncSoon: "Bientôt disponible.",
    syncText: "Connexion cloud prévue plus tard. Aucune transaction bancaire.",
    backupText: "Sauvegarde locale automatique activée sur cet appareil.",
    privacyText: "Les données restent locales tant que la synchronisation n’est pas activée.",
    resetGoals: "Réinitialiser les objectifs",
    resetFinance: "Réinitialiser les finances",
    resetSettings: "Réinitialiser les réglages",
    resetAll: "Réinitialiser tout",
    creator: "Créateur",
    founder: "Fondateur de l’écosystème OnJarama",
    appVersion: "OnJarama Path • Version 3.1 Beta",
    ecosystem: "OnJarama • OJCS • OJCT",
    openProfile: "Ouvrir le profil",
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
  const p = pageText.FR;
  const [openSection, setOpenSection] = useState("account");

  function updateSetting(name, value) {
    setSettings({ ...settings, [name]: value });
  }

  function updateNested(group, name, value) {
    setSettings({
      ...settings,
      [group]: {
        ...(settings[group] || {}),
        [name]: value,
      },
    });
  }

  function toggle(section) {
    setOpenSection(openSection === section ? null : section);
  }

  return (
    <div>
      <h1>{t.reglages}</h1>
      <p style={muted}>{p.subtitle}</p>

      <Tile open={openSection === "account"} onClick={() => toggle("account")} icon={<UserCircle />} title={p.account} color="var(--blue)">
        <button onClick={() => setCurrentPage("profil")} style={profileBtn}>
          {p.openProfile}
        </button>
      </Tile>

      <Tile open={openSection === "personalization"} onClick={() => toggle("personalization")} icon={<SlidersHorizontal />} title={p.personalization} color="var(--gold)">
        <h3>{p.homePreview}</h3>
        <Toggle label={p.debt} active={settings.homeCards?.debt} onClick={() => updateNested("homeCards", "debt", !settings.homeCards?.debt)} />
        <Toggle label={p.savings} active={settings.homeCards?.savings} onClick={() => updateNested("homeCards", "savings", !settings.homeCards?.savings)} />
        <Toggle label={p.income} active={settings.homeCards?.income} onClick={() => updateNested("homeCards", "income", !settings.homeCards?.income)} />
        <Toggle label={p.goals} active={settings.homeCards?.goals} onClick={() => updateNested("homeCards", "goals", !settings.homeCards?.goals)} />
        <Toggle label={p.advice} active={settings.homeCards?.advice} onClick={() => updateNested("homeCards", "advice", !settings.homeCards?.advice)} />
        <Toggle label={p.path} active={settings.homeCards?.path} onClick={() => updateNested("homeCards", "path", !settings.homeCards?.path)} />

        <h3>{p.shortcuts}</h3>
        <Toggle label={p.payment} active={settings.shortcuts?.payment} onClick={() => updateNested("shortcuts", "payment", !settings.shortcuts?.payment)} />
        <Toggle label={p.debt} active={settings.shortcuts?.debt} onClick={() => updateNested("shortcuts", "debt", !settings.shortcuts?.debt)} />
        <Toggle label={p.goal} active={settings.shortcuts?.goal} onClick={() => updateNested("shortcuts", "goal", !settings.shortcuts?.goal)} />
        <Toggle label={p.protection} active={settings.shortcuts?.protection} onClick={() => updateNested("shortcuts", "protection", !settings.shortcuts?.protection)} />
        <Toggle label={p.advice} active={settings.shortcuts?.advice} onClick={() => updateNested("shortcuts", "advice", !settings.shortcuts?.advice)} />
        <Toggle label={p.project} active={settings.shortcuts?.project} onClick={() => updateNested("shortcuts", "project", !settings.shortcuts?.project)} />
        <Toggle label={p.travel} active={settings.shortcuts?.travel} onClick={() => updateNested("shortcuts", "travel", !settings.shortcuts?.travel)} />
        <Toggle label={p.house} active={settings.shortcuts?.house} onClick={() => updateNested("shortcuts", "house", !settings.shortcuts?.house)} />
        <Toggle label={p.ai} active={settings.shortcuts?.ai} onClick={() => updateNested("shortcuts", "ai", !settings.shortcuts?.ai)} />
      </Tile>

      <Tile open={openSection === "display"} onClick={() => toggle("display")} icon={<Grid2X2 />} title={p.display} color="var(--green)">
        <Option active={settings.tileSize === "compact"} onClick={() => updateSetting("tileSize", "compact")}>{p.compact}</Option>
        <Option active={settings.tileSize === "standard"} onClick={() => updateSetting("tileSize", "standard")}>{p.standard}</Option>
        <Option active={settings.tileSize === "large"} onClick={() => updateSetting("tileSize", "large")}>{p.large}</Option>

        <Option active={settings.viewMode === "grid"} onClick={() => updateSetting("viewMode", "grid")} icon={<Grid2X2 size={16} />}>{p.grid}</Option>
        <Option active={settings.viewMode === "list"} onClick={() => updateSetting("viewMode", "list")} icon={<LayoutList size={16} />}>{p.list}</Option>
      </Tile>

      <Tile open={openSection === "security"} onClick={() => toggle("security")} icon={<Lock />} title={p.security} color="var(--gold)">
        <Toggle label={p.hideAmountsStart} active={settings.privacyMode} onClick={() => updateSetting("privacyMode", !settings.privacyMode)} />
        <Toggle label={p.autoHide} active={settings.autoHideAmounts} onClick={() => updateSetting("autoHideAmounts", !settings.autoHideAmounts)} />
        <Toggle label={p.demoMode} active={settings.demoMode} onClick={() => updateSetting("demoMode", !settings.demoMode)} />
        <Toggle label={p.privateMode} active={settings.privacyMode} onClick={() => updateSetting("privacyMode", !settings.privacyMode)} />
        <Locked label={p.pin} soon={p.soon} />
        <Locked label={p.biometric} soon={p.soon} />
        <Locked label={p.twoFactor} soon={p.soon} />
      </Tile>

      <Tile open={openSection === "language"} onClick={() => toggle("language")} icon={<Languages />} title={p.language} color="var(--green)">
        <Option active={settings.language === "FR"} onClick={() => updateSetting("language", "FR")}>{p.french}</Option>
        <Option active={settings.language === "EN"} onClick={() => updateSetting("language", "EN")}>{p.english}</Option>
        <Option active={settings.language === "ES"} onClick={() => updateSetting("language", "ES")}>{p.spanish}</Option>
      </Tile>

      <Tile open={openSection === "currency"} onClick={() => toggle("currency")} icon={<Wallet />} title={p.currency} color="var(--gold)">
        {["CAD", "USD", "EUR", "GBP", "GNF", "XOF", "XAF", "CHF", "MAD"].map((currency) => (
          <Option key={currency} active={settings.currency === currency} onClick={() => updateSetting("currency", currency)}>
            {currency}
          </Option>
        ))}
      </Tile>

      <Tile open={openSection === "appearance"} onClick={() => toggle("appearance")} icon={<Palette />} title={p.appearance} color="var(--purple)">
        <Option active={settings.theme === "sombre"} onClick={() => updateSetting("theme", "sombre")}>{p.dark}</Option>
        <Option active={settings.theme === "clair"} onClick={() => updateSetting("theme", "clair")}>{p.light}</Option>
      </Tile>

      <Tile open={openSection === "notifications"} onClick={() => toggle("notifications")} icon={<Bell />} title={p.notifications} color="var(--green)">
        <Option active={settings.notifications} onClick={() => updateSetting("notifications", true)}>{p.on}</Option>
        <Option active={!settings.notifications} onClick={() => updateSetting("notifications", false)}>{p.off}</Option>
      </Tile>

      <Tile open={openSection === "sync"} onClick={() => toggle("sync")} icon={<Cloud />} title={p.synchronization} color="var(--blue)">
        <p>{p.syncSoon}</p>
        <p style={muted}>{p.syncText}</p>
      </Tile>

      <Tile open={openSection === "backup"} onClick={() => toggle("backup")} icon={<Shield />} title={p.backup} color="var(--gold)">
        <p>{p.backupText}</p>
      </Tile>

      <Tile open={openSection === "reset"} onClick={() => toggle("reset")} icon={<RefreshCcw />} title={p.reset} color="var(--red)">
        <button onClick={resetGoalsOnly} style={dangerBtn}>{p.resetGoals}</button>
        <button onClick={resetFinanceOnly} style={dangerBtn}>{p.resetFinance}</button>
        <button onClick={resetSettingsOnly} style={dangerBtn}>{p.resetSettings}</button>
        <button onClick={resetAll} style={dangerBtn}>{p.resetAll}</button>
      </Tile>

      <Tile open={openSection === "credits"} onClick={() => toggle("credits")} icon={<Info />} title={p.credits} color="var(--purple)">
        <InfoRow label={p.creator} value="Thierno Diallo" />
        <InfoRow label="OnJarama" value={p.founder} />
        <InfoRow label="Version" value={p.appVersion} />
        <InfoRow label="Écosystème" value={p.ecosystem} />
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

function Option({ active, children, onClick, icon }) {
  return (
    <button onClick={onClick} style={{ ...option, borderColor: active ? "var(--green)" : "var(--border)", background: active ? "rgba(34,197,94,.12)" : "var(--bg-panel)" }}>
      <span>{active ? "✓" : "○"}</span>
      {icon}
      <span>{children}</span>
    </button>
  );
}

function Toggle({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ ...option, borderColor: active ? "var(--green)" : "var(--border)", background: active ? "rgba(34,197,94,.12)" : "var(--bg-panel)" }}>
      <span>{active ? "✓" : "○"}</span>
      <span>{label}</span>
    </button>
  );
}

function Locked({ label, soon }) {
  return (
    <div style={locked}>
      <Eye size={16} />
      <span>{label}</span>
      <strong>{soon}</strong>
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

const locked = {
  width: "100%",
  padding: "12px",
  borderRadius: "13px",
  border: "1px dashed var(--border)",
  color: "var(--text-muted)",
  marginTop: "8px",
  display: "grid",
  gridTemplateColumns: "24px 1fr auto",
  gap: "10px",
  alignItems: "center",
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