import {
  Camera,
  CheckCircle,
  Cloud,
  Globe,
  KeyRound,
  LoaderCircle,
  LogOut,
  ShieldCheck,
  Star,
  History,
  Trophy,
  UserCircle,
} from "lucide-react";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    subtitle: "Profil, compte, cloud, sauvegarde et historique.",
    user: "Utilisateur OnJarama",
    beta: "Mode invité local",
    connected: "Compte connecté",
    guest: "Mode invité",
    cloudReady: "Cloud Supabase prêt",
    cloudNotReady: "Cloud non configuré",
    connectionTitle: "Compte & sauvegarde",
    connectionLoading: "Vérification de la session...",
    optionalConnection: "Connexion facultative",
    googleLogin: "Connexion Google",
    microsoftLogin: "Connexion Microsoft",
    signOut: "Déconnexion",
    accountEmail: "E-mail",
    localModeText:
      "Vous utilisez OnJarama Path en mode invité. Les données restent locales sur cet appareil.",
    connectedText:
      "Votre session est active. La synchronisation cloud sera activée progressivement.",
    cloudConfiguredText:
      "Le cloud est prêt. Vous pouvez vous connecter pour préparer la synchronisation future.",
    cloudDisabledText:
      "La connexion sera disponible quand les clés Supabase seront configurées dans Vercel.",
    photoSoon: "Photo bientôt",
    account: "Compte",
    country: "Pays",
    currency: "Devise",
    status: "Statut",
    activeAccount: "Compte actif",
    backup: "Sauvegarde",
    localBackup: "Sauvegarde locale",
    sync: "Synchronisation",
    syncPrepared: "Préparée",
    syncLocal: "Locale",
    stats: "Mes statistiques",
    activeGoals: "Objectifs actifs",
    achievedGoals: "Objectifs atteints",
    discipline: "Discipline",
    disciplineFallback: "Départ",
    sinceStart: "Depuis le départ",
    days: "jours",
    progress: "Progression personnelle",
    victories: "Mes victoires",
    history: "Historique",
    activeHistory: "Objectifs en cours",
    completedHistory: "Objectifs terminés",
    startedOn: "Commencé le",
    completedOn: "Terminé le",
    noActiveHistory: "Aucun objectif actif pour le moment.",
    noVictory: "Aucune victoire enregistrée pour le moment.",
    goalFallback: "Objectif",
    openSettings: "Ouvrir les réglages",
  },
  EN: {
    subtitle: "Profile, account, cloud, backup and history.",
    user: "OnJarama User",
    beta: "Local guest mode",
    connected: "Connected account",
    guest: "Guest mode",
    cloudReady: "Supabase cloud ready",
    cloudNotReady: "Cloud not configured",
    connectionTitle: "Account & backup",
    connectionLoading: "Checking session...",
    optionalConnection: "Optional sign-in",
    googleLogin: "Sign in with Google",
    microsoftLogin: "Sign in with Microsoft",
    signOut: "Sign out",
    accountEmail: "Email",
    localModeText:
      "You are using OnJarama Path in guest mode. Data stays local on this device.",
    connectedText:
      "Your session is active. Cloud synchronization will be enabled progressively.",
    cloudConfiguredText:
      "Cloud is ready. You can sign in to prepare future synchronization.",
    cloudDisabledText:
      "Sign-in will be available when Supabase keys are configured in Vercel.",
    photoSoon: "Photo coming soon",
    account: "Account",
    country: "Country",
    currency: "Currency",
    status: "Status",
    activeAccount: "Active account",
    backup: "Backup",
    localBackup: "Local backup",
    sync: "Synchronization",
    syncPrepared: "Prepared",
    syncLocal: "Local",
    stats: "My statistics",
    activeGoals: "Active goals",
    achievedGoals: "Achieved goals",
    discipline: "Discipline",
    disciplineFallback: "Start",
    sinceStart: "Since start",
    days: "days",
    progress: "Personal progress",
    victories: "My victories",
    history: "History",
    activeHistory: "Active goals",
    completedHistory: "Completed goals",
    startedOn: "Started on",
    completedOn: "Completed on",
    noActiveHistory: "No active goal yet.",
    noVictory: "No victory recorded yet.",
    goalFallback: "Goal",
    openSettings: "Open settings",
  },
  ES: {
    subtitle: "Perfil, cuenta, cloud, copia e historial.",
    user: "Usuario OnJarama",
    beta: "Modo invitado local",
    connected: "Cuenta conectada",
    guest: "Modo invitado",
    cloudReady: "Cloud Supabase listo",
    cloudNotReady: "Cloud no configurado",
    connectionTitle: "Cuenta y copia",
    connectionLoading: "Verificando la sesión...",
    optionalConnection: "Conexión opcional",
    googleLogin: "Conexión Google",
    microsoftLogin: "Conexión Microsoft",
    signOut: "Cerrar sesión",
    accountEmail: "Correo",
    localModeText:
      "Usas OnJarama Path en modo invitado. Los datos permanecen locales en este dispositivo.",
    connectedText:
      "Tu sesión está activa. La sincronización cloud se activará progresivamente.",
    cloudConfiguredText:
      "El cloud está listo. Puedes conectarte para preparar la sincronización futura.",
    cloudDisabledText:
      "La conexión estará disponible cuando las claves Supabase estén configuradas en Vercel.",
    photoSoon: "Foto próximamente",
    account: "Cuenta",
    country: "País",
    currency: "Moneda",
    status: "Estado",
    activeAccount: "Cuenta activa",
    backup: "Copia",
    localBackup: "Copia local",
    sync: "Sincronización",
    syncPrepared: "Preparada",
    syncLocal: "Local",
    stats: "Mis estadísticas",
    activeGoals: "Objetivos activos",
    achievedGoals: "Objetivos logrados",
    discipline: "Disciplina",
    disciplineFallback: "Inicio",
    sinceStart: "Desde el inicio",
    days: "días",
    progress: "Progreso personal",
    victories: "Mis victorias",
    history: "Historial",
    activeHistory: "Objetivos activos",
    completedHistory: "Objetivos terminados",
    startedOn: "Empezado el",
    completedOn: "Terminado el",
    noActiveHistory: "No hay objetivo activo por ahora.",
    noVictory: "No hay victoria registrada por ahora.",
    goalFallback: "Objetivo",
    openSettings: "Abrir ajustes",
  },
};

function Profil({
  settings,
  setCurrentPage,
  selectedGoals,
  disciplineScore,
  auth,
}) {
  const t = getText(settings);
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;

  const goals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived)
    : [];

  const achievedGoals = goals.filter((goal) => isGoalAchieved(goal));
  const activeGoals = goals.filter((goal) => !isGoalAchieved(goal));

  const disciplineValue = disciplineScore?.score || 0;
  const disciplineLabel = disciplineScore?.label || p.disciplineFallback;
  const daysSinceStart = getDaysSinceStart(goals);

  const isConfigured = Boolean(auth?.isConfigured);
  const isConnected = Boolean(auth?.isConnected);
  const loadingAuth = Boolean(auth?.loadingAuth);
  const providerLoading = auth?.providerLoading || null;
  const authError = auth?.authError || "";
  const userEmail = auth?.user?.email || auth?.session?.user?.email || "";

  return (
    <div className="native-page">
      <h1>{t.profil}</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={profileCard}>
        <div style={avatar}>
          <UserCircle size={58} />
        </div>

        <div>
          <h2>{isConnected ? p.connected : p.user}</h2>
          <p style={muted}>{isConnected ? p.connectedText : p.beta}</p>
        </div>

        <button style={photoBtn}>
          <Camera size={17} /> {p.photoSoon}
        </button>
      </section>

      <section style={authCard(isConnected)}>
        <div style={header}>
          <Cloud color={isConnected ? "var(--green)" : "var(--gold)"} />
          <h2>{p.connectionTitle}</h2>
        </div>

        <div style={connectionBadge(isConnected)}>
          {loadingAuth ? (
            <LoaderCircle size={18} />
          ) : isConnected ? (
            <CheckCircle size={18} />
          ) : (
            <KeyRound size={18} />
          )}

          <strong>
            {loadingAuth
              ? p.connectionLoading
              : isConnected
                ? p.connected
                : p.optionalConnection}
          </strong>
        </div>

        <InfoRow label={p.status} value={isConnected ? p.connected : p.guest} />
        <InfoRow
          label="Supabase"
          value={isConfigured ? p.cloudReady : p.cloudNotReady}
        />
        <InfoRow
          label={p.sync}
          value={isConnected ? p.syncPrepared : p.syncLocal}
        />
        <InfoRow label={p.backup} value={p.localBackup} />

        {isConnected && (
          <InfoRow label={p.accountEmail} value={userEmail || p.activeAccount} />
        )}

        <p style={muted}>
          {isConnected
            ? p.connectedText
            : isConfigured
              ? p.cloudConfiguredText
              : p.cloudDisabledText}
        </p>

        {!isConnected && <p style={guestLine}>✓ {p.localModeText}</p>}
        {authError && <p style={errorLine}>⚠️ {authError}</p>}

        {!isConnected ? (
          <div style={authActions}>
            <button
              onClick={auth?.signInWithGoogle}
              disabled={!isConfigured || loadingAuth || Boolean(providerLoading)}
              style={authButtonStyle(
                googleBtn,
                !isConfigured || loadingAuth || Boolean(providerLoading)
              )}
            >
              <Globe size={18} />
              {providerLoading === "google" ? p.connectionLoading : p.googleLogin}
            </button>

            <button
              onClick={auth?.signInWithMicrosoft}
              disabled={!isConfigured || loadingAuth || Boolean(providerLoading)}
              style={authButtonStyle(
                microsoftBtn,
                !isConfigured || loadingAuth || Boolean(providerLoading)
              )}
            >
              <Cloud size={18} />
              {providerLoading === "azure"
                ? p.connectionLoading
                : p.microsoftLogin}
            </button>
          </div>
        ) : (
          <button onClick={auth?.signOut} style={logoutBtn}>
            <LogOut size={18} />
            {p.signOut}
          </button>
        )}
      </section>

      <section style={historyCard}>
        <div style={header}>
          <History color="var(--gold)" />
          <h2>{p.history}</h2>
        </div>

        <h3 style={historyTitle}>{p.activeHistory}</h3>

        {activeGoals.length > 0 ? (
          activeGoals.map((goal) => (
            <HistoryItem
              key={goal.id}
              goal={goal}
              label={p.startedOn}
              date={goal.createdAt}
              color="var(--gold)"
              language={language}
              fallback={p.goalFallback}
            />
          ))
        ) : (
          <p style={muted}>{p.noActiveHistory}</p>
        )}

        <h3 style={historyTitle}>{p.completedHistory}</h3>

        {achievedGoals.length > 0 ? (
          achievedGoals.map((goal) => (
            <HistoryItem
              key={goal.id}
              goal={goal}
              label={p.completedOn}
              date={goal.completedAt || goal.updatedAt || goal.createdAt}
              color="var(--green)"
              language={language}
              fallback={p.goalFallback}
            />
          ))
        ) : (
          <p style={muted}>{p.noVictory}</p>
        )}
      </section>

      <Section icon={<Trophy />} title={p.stats} color="var(--gold)">
        <InfoRow label={p.activeGoals} value={activeGoals.length} />
        <InfoRow label={p.achievedGoals} value={achievedGoals.length} />
        <InfoRow label={p.discipline} value={`${disciplineValue}%`} />
        <InfoRow label={p.sinceStart} value={`${daysSinceStart} ${p.days}`} />
      </Section>

      <section style={card}>
        <div style={header}>
          <Star color="var(--green)" />
          <h2>{p.progress}</h2>
        </div>

        <p style={muted}>{disciplineLabel}</p>

        <div style={progressBar}>
          <div
            style={{
              ...progressFill,
              width: `${disciplineValue}%`,
              background: getDisciplineColor(disciplineValue),
            }}
          />
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <Trophy color="var(--gold)" />
          <h2>{p.victories}</h2>
        </div>

        {achievedGoals.length > 0 ? (
          achievedGoals.map((goal) => (
            <div key={goal.id} style={victoryItem}>
              <CheckCircle size={18} color="var(--green)" />
              <div>
                <strong>{goal.title}</strong>
                <p style={mutedSmall}>
                  {goal.categoryLabel || goal.category || p.goalFallback}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={muted}>{p.noVictory}</p>
        )}
      </section>

      <Section icon={<UserCircle />} title={p.account} color="var(--blue)">
        <InfoRow label={p.country} value="Canada / Guinée" />
        <InfoRow label={p.currency} value={settings.currency} />
      </Section>

      <section style={card}>
        <div style={header}>
          <ShieldCheck color="var(--gold)" />
          <h2>{t.privacy}</h2>
        </div>

        <p style={muted}>{t.privacyText}</p>
      </section>

      <button onClick={() => setCurrentPage("reglages")} style={settingsBtn}>
        {p.openSettings}
      </button>
    </div>
  );
}

function isGoalAchieved(goal) {
  if (Array.isArray(goal?.pathSteps) && goal.pathSteps.length > 0) {
    return goal.pathSteps.every((step) => step.done);
  }

  return (
    Number(goal?.targetAmount || 0) > 0 &&
    Number(goal?.currentAmount || 0) >= Number(goal?.targetAmount || 0)
  );
}

function formatHistoryDate(dateValue, language = "FR") {
  if (!dateValue) return "—";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString(
    language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

function HistoryItem({ goal, label, date, color, language, fallback }) {
  return (
    <div style={{ ...historyItem, borderColor: color }}>
      <CheckCircle size={18} color={color} />
      <div>
        <strong>{goal.title}</strong>
        <p style={mutedSmall}>
          {goal.categoryLabel || goal.option || goal.category || fallback}
        </p>
        <p style={mutedSmall}>
          {label} : {formatHistoryDate(date, language)}
        </p>
      </div>
    </div>
  );
}

function getDaysSinceStart(goals) {
  if (!Array.isArray(goals) || goals.length === 0) return 0;

  const firstGoal = [...goals]
    .filter((goal) => goal.createdAt)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];

  if (!firstGoal?.createdAt) return 0;

  const start = new Date(firstGoal.createdAt);
  const now = new Date();

  if (Number.isNaN(start.getTime())) return 0;

  return Math.max(
    0,
    Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );
}

function getDisciplineColor(score) {
  if (score <= 25) return "var(--red)";
  if (score <= 50) return "var(--gold)";
  if (score <= 75) return "var(--blue)";
  return "var(--green)";
}

function Section({ icon, title, color, children }) {
  return (
    <section style={{ ...card, borderColor: color }}>
      <div style={header}>
        <span style={{ color }}>{icon}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
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

function authButtonStyle(base, disabled) {
  return {
    ...base,
    opacity: disabled ? 0.55 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
  };
}

const historyCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.12), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "18px",
  marginTop: "16px",
};

const historyTitle = {
  margin: "14px 0 8px",
  color: "var(--text-main)",
};

const historyItem = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  marginTop: "8px",
  display: "grid",
  gridTemplateColumns: "24px 1fr",
  gap: "10px",
  alignItems: "start",
};

const profileCard = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "18px",
  marginTop: "18px",
  display: "grid",
  gridTemplateColumns: "72px 1fr",
  gap: "14px",
  alignItems: "center",
};

const connectionBadge = (connected) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  border: `1px solid ${connected ? "var(--green)" : "var(--gold)"}`,
  background: connected ? "rgba(34,197,94,.12)" : "rgba(212,175,55,.12)",
  color: connected ? "var(--green)" : "var(--gold)",
  borderRadius: "999px",
  padding: "8px 11px",
  fontSize: "13px",
  marginBottom: "10px",
});

const guestLine = {
  color: "var(--green)",
  fontSize: "13px",
  fontWeight: "800",
  marginTop: "10px",
};

const errorLine = {
  color: "var(--red)",
  fontSize: "13px",
  fontWeight: "800",
  marginTop: "10px",
};

const authCard = (connected) => ({
  background: connected
    ? "linear-gradient(135deg, rgba(34,197,94,.15), var(--bg-card))"
    : "linear-gradient(135deg, rgba(212,175,55,.14), var(--bg-card))",
  border: `1px solid ${connected ? "var(--green)" : "var(--gold)"}`,
  borderRadius: "22px",
  padding: "18px",
  marginTop: "16px",
});

const avatar = {
  width: "72px",
  height: "72px",
  borderRadius: "22px",
  background: "var(--bg-panel)",
  color: "var(--gold)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const photoBtn = {
  gridColumn: "1 / -1",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
  borderRadius: "14px",
  padding: "12px",
  display: "flex",
  justifyContent: "center",
  gap: "8px",
};

const authActions = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "10px",
  marginTop: "14px",
};

const googleBtn = {
  width: "100%",
  border: "1px solid var(--gold)",
  borderRadius: "14px",
  padding: "14px",
  background: "rgba(212,175,55,.13)",
  color: "var(--gold)",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const microsoftBtn = {
  width: "100%",
  border: "1px solid var(--blue)",
  borderRadius: "14px",
  padding: "14px",
  background: "rgba(56,189,248,.13)",
  color: "var(--blue)",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const logoutBtn = {
  width: "100%",
  border: "1px solid var(--red)",
  borderRadius: "14px",
  padding: "14px",
  marginTop: "14px",
  background: "rgba(239,68,68,.12)",
  color: "var(--red)",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const progressBar = {
  height: "12px",
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "999px",
  marginTop: "14px",
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  borderRadius: "999px",
  transition: "width .35s ease",
};

const victoryItem = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  marginTop: "8px",
  display: "grid",
  gridTemplateColumns: "24px 1fr",
  gap: "10px",
  alignItems: "center",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "18px",
  marginTop: "16px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "12px",
};

const infoRow = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  marginTop: "8px",
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};

const settingsBtn = {
  width: "100%",
  border: "none",
  borderRadius: "14px",
  padding: "14px",
  marginTop: "16px",
  background: "linear-gradient(90deg, var(--purple), var(--blue))",
  color: "white",
  fontWeight: "bold",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "6px",
};

export default Profil;
