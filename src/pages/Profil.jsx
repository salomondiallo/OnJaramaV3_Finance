import {
  BookOpen,
  Camera,
  CheckCircle,
  Cloud,
  Contact,
  Globe,
  HelpCircle,
  Info,
  Lightbulb,
  Lock,
  LogOut,
  Mail,
  NotebookText,
  PlayCircle,
  Share2,
  ShieldCheck,
  Star,
  Trophy,
  UserCircle,
} from "lucide-react";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    subtitle: "Compte, sources, guide et informations OnJarama.",
    user: "Utilisateur OnJarama",
    beta: "Version bêta locale",
    connected: "Compte connecté",
    guest: "Mode invité",
    cloudReady: "Cloud Supabase prêt",
    cloudNotReady: "Cloud non configuré",
    googleLogin: "Connexion Google",
    microsoftLogin: "Connexion Microsoft",
    signOut: "Déconnexion",
    accountEmail: "E-mail",
    localModeText:
      "Vous utilisez OnJarama Path en mode invité. Les données restent locales sur cet appareil.",
    connectedText:
      "Votre session est active. La synchronisation cloud sera activée progressivement.",
    photoSoon: "Photo bientôt",
    account: "Compte",
    country: "Pays",
    language: "Langue",
    currency: "Devise",
    app: "Application",
    version: "Version",
    testerMode: "Mode testeur",
    pwa: "PWA activée",
    localBackup: "Sauvegarde locale",
    stats: "Mes statistiques",
    activeGoals: "Objectifs actifs",
    achievedGoals: "Objectifs atteints",
    discipline: "Discipline",
    sinceStart: "Depuis le départ",
    days: "jours",
    progress: "Progression personnelle",
    victories: "Mes victoires",
    noVictory: "Aucune victoire enregistrée pour le moment.",
    ecosystem: "Écosystème OnJarama",
    pathDesc: "Coach financier intelligent",
    ojcsDesc: "Services et connexions",
    ojctDesc: "Technologies et innovation",
    creator: "Créateur",
    founder: "Fondateur de l’écosystème OnJarama",
    proud: "Fièrement développé au Québec ⚜️",
    visionTitle: "Vision",
    vision:
      "Développer des solutions numériques simples, accessibles et utiles pour accompagner les utilisateurs dans leurs projets financiers, professionnels et personnels.",
    financialSources: "Mes sources financières",
    noSource: "Aucune source enregistrée pour le moment.",
    sourceReady: "source enregistrée",
    sourcesReady: "sources enregistrées",
    sourceText:
      "Les sources financières servent à comprendre votre situation. Les montants restent protégés et ne s’affichent pas sur l’accueil.",
    configureSources: "Configurer dans Ma Situation",
    guideHub: "Guide & aide",
    guide: "Guide utilisateur",
    guideText: "Comprendre chaque page et savoir quoi faire étape par étape.",
    tips: "Astuces",
    tipsText: "Conseils rapides pour utiliser OnJarama Path sans se perdre.",
    patchNotes: "Patch Notes",
    patchNotesText: "Voir les nouveautés et les changements de version.",
    achievements: "Réalisations",
    achievementText: "Victoires financières suivies automatiquement.",
    security: "Sécurité",
    securityText: "PIN, biométrie et connexion sécurisée prévus plus tard.",
    about: "À propos",
    aboutText: "OnJarama Path accompagne vos objectifs financiers.",
    share: "Partager / Copier le lien",
    linkCopied: "Lien copié.",
    officialNetworks: "Réseaux officiels",
    website: "Site Web OnJarama",
    youtube: "YouTube",
    instagram: "Instagram",
    facebook: "Facebook",
    tiktok: "TikTok",
    x: "X",
    contact: "Contact",
    support: "Support",
    suggestions: "Suggestions",
    reportIssue: "Signaler un problème",
    privacy: "Confidentialité",
    privacyText:
      "Aucune transaction bancaire n’est possible dans cette version. Les données restent locales tant que la synchronisation n’est pas activée.",
    openSettings: "Ouvrir les réglages",
  },

  EN: {
    subtitle: "Account, sources, guide and OnJarama information.",
    user: "OnJarama User",
    beta: "Local beta version",
    connected: "Connected account",
    guest: "Guest mode",
    cloudReady: "Supabase cloud ready",
    cloudNotReady: "Cloud not configured",
    googleLogin: "Sign in with Google",
    microsoftLogin: "Sign in with Microsoft",
    signOut: "Sign out",
    accountEmail: "Email",
    localModeText:
      "You are using OnJarama Path in guest mode. Data stays local on this device.",
    connectedText:
      "Your session is active. Cloud synchronization will be enabled progressively.",
    photoSoon: "Photo coming soon",
    account: "Account",
    country: "Country",
    language: "Language",
    currency: "Currency",
    app: "Application",
    version: "Version",
    testerMode: "Tester mode",
    pwa: "PWA enabled",
    localBackup: "Local backup",
    stats: "My statistics",
    activeGoals: "Active goals",
    achievedGoals: "Achieved goals",
    discipline: "Discipline",
    sinceStart: "Since start",
    days: "days",
    progress: "Personal progress",
    victories: "My victories",
    noVictory: "No victory recorded yet.",
    ecosystem: "OnJarama Ecosystem",
    pathDesc: "Smart financial coach",
    ojcsDesc: "Services and connections",
    ojctDesc: "Technology and innovation",
    creator: "Creator",
    founder: "Founder of the OnJarama ecosystem",
    proud: "Proudly developed in Quebec ⚜️",
    visionTitle: "Vision",
    vision:
      "Develop simple, accessible and useful digital solutions to support users in their financial, professional and personal projects.",
    financialSources: "My financial sources",
    noSource: "No source recorded yet.",
    sourceReady: "source recorded",
    sourcesReady: "sources recorded",
    sourceText:
      "Financial sources help understand your situation. Amounts stay protected and are not shown on the home screen.",
    configureSources: "Configure in My Situation",
    guideHub: "Guide & help",
    guide: "User guide",
    guideText: "Understand each page and know what to do step by step.",
    tips: "Tips",
    tipsText: "Quick tips to use OnJarama Path without getting lost.",
    patchNotes: "Patch Notes",
    patchNotesText: "See what changed in each version.",
    achievements: "Achievements",
    achievementText: "Financial victories tracked automatically.",
    security: "Security",
    securityText: "PIN, biometrics and secure login planned later.",
    about: "About",
    aboutText: "OnJarama Path supports your financial goals.",
    share: "Share / Copy link",
    linkCopied: "Link copied.",
    officialNetworks: "Official networks",
    website: "OnJarama Website",
    youtube: "YouTube",
    instagram: "Instagram",
    facebook: "Facebook",
    tiktok: "TikTok",
    x: "X",
    contact: "Contact",
    support: "Support",
    suggestions: "Suggestions",
    reportIssue: "Report an issue",
    privacy: "Privacy",
    privacyText:
      "No banking transaction is possible in this version. Data stays local until synchronization is enabled.",
    openSettings: "Open settings",
  },

  ES: {
    subtitle: "Cuenta, fuentes, guía e información OnJarama.",
    user: "Usuario OnJarama",
    beta: "Versión beta local",
    connected: "Cuenta conectada",
    guest: "Modo invitado",
    cloudReady: "Cloud Supabase listo",
    cloudNotReady: "Cloud no configurado",
    googleLogin: "Conexión Google",
    microsoftLogin: "Conexión Microsoft",
    signOut: "Cerrar sesión",
    accountEmail: "Correo",
    localModeText:
      "Usas OnJarama Path en modo invitado. Los datos permanecen locales en este dispositivo.",
    connectedText:
      "Tu sesión está activa. La sincronización cloud se activará progresivamente.",
    photoSoon: "Foto próximamente",
    account: "Cuenta",
    country: "País",
    language: "Idioma",
    currency: "Moneda",
    app: "Aplicación",
    version: "Versión",
    testerMode: "Modo probador",
    pwa: "PWA activada",
    localBackup: "Copia local",
    stats: "Mis estadísticas",
    activeGoals: "Objetivos activos",
    achievedGoals: "Objetivos logrados",
    discipline: "Disciplina",
    sinceStart: "Desde el inicio",
    days: "días",
    progress: "Progreso personal",
    victories: "Mis victorias",
    noVictory: "No hay victoria registrada por ahora.",
    ecosystem: "Ecosistema OnJarama",
    pathDesc: "Coach financiero inteligente",
    ojcsDesc: "Servicios y conexiones",
    ojctDesc: "Tecnología e innovación",
    creator: "Creador",
    founder: "Fundador del ecosistema OnJarama",
    proud: "Desarrollado con orgullo en Quebec ⚜️",
    visionTitle: "Visión",
    vision:
      "Desarrollar soluciones digitales simples, accesibles y útiles para acompañar a los usuarios en sus proyectos financieros, profesionales y personales.",
    financialSources: "Mis fuentes financieras",
    noSource: "No hay fuente registrada por ahora.",
    sourceReady: "fuente registrada",
    sourcesReady: "fuentes registradas",
    sourceText:
      "Las fuentes financieras ayudan a entender tu situación. Los montos permanecen protegidos y no se muestran en el inicio.",
    configureSources: "Configurar en Mi Situación",
    guideHub: "Guía y ayuda",
    guide: "Guía de usuario",
    guideText: "Entender cada página y saber qué hacer paso a paso.",
    tips: "Consejos",
    tipsText: "Consejos rápidos para usar OnJarama Path sin perderse.",
    patchNotes: "Patch Notes",
    patchNotesText: "Ver cambios y novedades por versión.",
    achievements: "Logros",
    achievementText: "Victorias financieras seguidas automáticamente.",
    security: "Seguridad",
    securityText: "PIN, biometría e inicio seguro previstos más adelante.",
    about: "Acerca de",
    aboutText: "OnJarama Path acompaña tus objetivos financieros.",
    share: "Compartir / Copiar enlace",
    linkCopied: "Enlace copiado.",
    officialNetworks: "Redes oficiales",
    website: "Sitio web OnJarama",
    youtube: "YouTube",
    instagram: "Instagram",
    facebook: "Facebook",
    tiktok: "TikTok",
    x: "X",
    contact: "Contacto",
    support: "Soporte",
    suggestions: "Sugerencias",
    reportIssue: "Reportar un problema",
    privacy: "Privacidad",
    privacyText:
      "No es posible realizar transacciones bancarias en esta versión. Los datos permanecen locales hasta activar la sincronización.",
    openSettings: "Abrir ajustes",
  },
};

function Profil({
  settings,
  setCurrentPage,
  selectedGoals,
  disciplineScore,
  auth,
  financeData,
}) {
  const t = getText(settings);
  const p = pageText[settings?.language || "FR"] || pageText.FR;

  const goals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived)
    : [];

  const activeGoalsCount = goals.length;
  const achievedGoals = goals.filter(
    (goal) =>
      Number(goal.targetAmount || 0) > 0 &&
      Number(goal.currentAmount || 0) >= Number(goal.targetAmount || 0)
  );

  const achievedGoalsCount = achievedGoals.length;
  const daysSinceStart = getDaysSinceStart(goals);
  const disciplineValue = disciplineScore?.score || 0;
  const disciplineLabel = disciplineScore?.label || "Départ";

  const isConfigured = Boolean(auth?.isConfigured);
  const isConnected = Boolean(auth?.isConnected);
  const userEmail = auth?.user?.email || "";

  const monthlyIncome = Number(financeData?.overview?.monthlyIncome || 0);
  const sourceCount = getFinancialSourceCount({ monthlyIncome, financeData });

  function shareApp() {
    const link = window.location.origin;

    if (navigator.share) {
      navigator.share({
        title: "OnJarama Path",
        text: "Découvre OnJarama Path, un coach financier intelligent.",
        url: link,
      });
    } else {
      navigator.clipboard.writeText(link);
      alert(p.linkCopied);
    }
  }

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
          <p style={proud}>{p.proud}</p>
        </div>

        <button style={photoBtn}>
          <Camera size={17} /> {p.photoSoon}
        </button>
      </section>

      <section style={sourceCard}>
        <div style={header}>
          <ShieldCheck color={sourceCount > 0 ? "var(--green)" : "var(--gold)"} />
          <h2>{p.financialSources}</h2>
        </div>

        <InfoRow
          label="Statut"
          value={
            sourceCount > 0
              ? `${sourceCount} ${sourceCount > 1 ? p.sourcesReady : p.sourceReady}`
              : p.noSource
          }
        />

        <p style={muted}>{p.sourceText}</p>

        <button onClick={() => setCurrentPage("situation")} style={primaryBtn}>
          {p.configureSources}
        </button>
      </section>

      <section style={authCard(isConnected)}>
        <div style={header}>
          <Cloud color={isConnected ? "var(--green)" : "var(--gold)"} />
          <h2>OnJarama Cloud</h2>
        </div>

        <InfoRow label="Statut" value={isConnected ? p.connected : p.guest} />
        <InfoRow label="Supabase" value={isConfigured ? p.cloudReady : p.cloudNotReady} />

        {isConnected && (
          <InfoRow label={p.accountEmail} value={userEmail || "Compte actif"} />
        )}

        <p style={muted}>{isConnected ? p.connectedText : p.localModeText}</p>

        {!isConnected ? (
          <div style={authActions}>
            <button
              onClick={auth?.signInWithGoogle}
              disabled={!isConfigured}
              style={googleBtn}
            >
              <Globe size={18} />
              {p.googleLogin}
            </button>

            <button
              onClick={auth?.signInWithMicrosoft}
              disabled={!isConfigured}
              style={microsoftBtn}
            >
              <Cloud size={18} />
              {p.microsoftLogin}
            </button>
          </div>
        ) : (
          <button onClick={auth?.signOut} style={logoutBtn}>
            <LogOut size={18} />
            {p.signOut}
          </button>
        )}
      </section>

      <section style={guideCard}>
        <div style={header}>
          <BookOpen color="var(--gold)" />
          <h2>{p.guideHub}</h2>
        </div>

        <div style={guideGrid}>
          <ActionTile
            icon={<BookOpen />}
            title={p.guide}
            text={p.guideText}
            color="var(--gold)"
            onClick={() => setCurrentPage("guide")}
          />
          <ActionTile
            icon={<Lightbulb />}
            title={p.tips}
            text={p.tipsText}
            color="var(--green)"
            onClick={() => setCurrentPage("guide")}
          />
          <ActionTile
            icon={<NotebookText />}
            title={p.patchNotes}
            text={p.patchNotesText}
            color="var(--blue)"
            onClick={() => setCurrentPage("patchnotes")}
          />
        </div>
      </section>

      <Section icon={<Trophy />} title={p.stats} color="var(--gold)">
        <InfoRow label={p.activeGoals} value={activeGoalsCount} />
        <InfoRow label={p.achievedGoals} value={achievedGoalsCount} />
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
                  {goal.categoryLabel || goal.category || "Objectif"}
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
        <InfoRow label={p.language} value={settings.language} />
        <InfoRow label={p.currency} value={settings.currency} />
      </Section>

      <Section icon={<CheckCircle />} title={p.app} color="var(--green)">
        <InfoRow label={p.version} value="V10.7 Core Experience" />
        <InfoRow label={p.testerMode} value="ON" />
        <InfoRow label={p.pwa} value="ON" />
        <InfoRow label={p.localBackup} value="ON" />
      </Section>

      <Section icon={<Globe />} title={p.ecosystem} color="var(--gold)">
        <EcosystemItem name="OnJarama Path" text={p.pathDesc} />
        <EcosystemItem name="OJCS" text={p.ojcsDesc} />
        <EcosystemItem name="OJCT" text={p.ojctDesc} />
      </Section>

      <Section icon={<Star />} title={p.creator} color="var(--purple)">
        <p>
          <strong>Thierno Diallo</strong>
        </p>
        <p style={muted}>{p.founder}</p>
        <p style={proud}>{p.proud}</p>

        <h3>{p.visionTitle}</h3>
        <p style={muted}>{p.vision}</p>
      </Section>

      <Grid>
        <Tile
          icon={<Trophy />}
          title={p.achievements}
          text={p.achievementText}
          color="var(--gold)"
        />
        <Tile
          icon={<Lock />}
          title={p.security}
          text={p.securityText}
          color="var(--purple)"
        />
        <Tile
          icon={<Info />}
          title={p.about}
          text={p.aboutText}
          color="var(--blue)"
        />
      </Grid>

      <section style={card}>
        <div style={header}>
          <Share2 color="var(--green)" />
          <h2>{t.shareApp}</h2>
        </div>

        <button onClick={shareApp} style={primaryBtn}>
          {p.share}
        </button>
      </section>

      <section style={card}>
        <div style={header}>
          <Globe color="var(--blue)" />
          <h2>{p.officialNetworks}</h2>
        </div>

        <Social icon={<Globe />} label={p.website} />
        <Social icon={<PlayCircle />} label={p.youtube} />
        <Social icon={<Contact />} label={p.instagram} />
        <Social icon={<Contact />} label={p.facebook} />
        <Social icon={<Contact />} label={p.tiktok} />
        <Social icon={<Contact />} label={p.x} />
      </section>

      <section style={card}>
        <div style={header}>
          <HelpCircle color="var(--purple)" />
          <h2>{p.contact}</h2>
        </div>

        <Social icon={<Mail />} label={p.support} />
        <Social icon={<Mail />} label={p.suggestions} />
        <Social icon={<Mail />} label={p.reportIssue} />
      </section>

      <section style={card}>
        <div style={header}>
          <ShieldCheck color="var(--gold)" />
          <h2>{p.privacy}</h2>
        </div>

        <p style={muted}>{p.privacyText}</p>
      </section>

      <button onClick={() => setCurrentPage("reglages")} style={settingsBtn}>
        {p.openSettings}
      </button>
    </div>
  );
}

function getFinancialSourceCount({ monthlyIncome, financeData }) {
  const sources = financeData?.fundingSources || financeData?.incomeSources;
  if (Array.isArray(sources)) {
    return sources.filter((source) => source && !source.archived).length;
  }
  return monthlyIncome > 0 ? 1 : 0;
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

function EcosystemItem({ name, text }) {
  return (
    <div style={ecosystemItem}>
      <strong>{name}</strong>
      <p style={mutedSmall}>{text}</p>
    </div>
  );
}

function Grid({ children }) {
  return <div style={grid}>{children}</div>;
}

function Tile({ icon, title, text, color }) {
  return (
    <div style={{ ...tile, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <strong>{title}</strong>
      <p style={mutedSmall}>{text}</p>
    </div>
  );
}

function ActionTile({ icon, title, text, color, onClick }) {
  return (
    <button onClick={onClick} style={{ ...actionTile, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <strong>{title}</strong>
      <small>{text}</small>
    </button>
  );
}

function Social({ icon, label }) {
  return (
    <div style={social}>
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

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

const sourceCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.14), rgba(34,197,94,.08), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "18px",
  marginTop: "16px",
};

const guideCard = {
  background: "linear-gradient(135deg, rgba(56,189,248,.10), var(--bg-card))",
  border: "1px solid var(--blue)",
  borderRadius: "22px",
  padding: "18px",
  marginTop: "16px",
};

const guideGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "10px",
};

const actionTile = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  color: "var(--text-main)",
  textAlign: "left",
  display: "grid",
  gap: "6px",
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

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
  gap: "12px",
  marginTop: "16px",
};

const tile = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "14px",
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

const ecosystemItem = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  marginTop: "8px",
};

const primaryBtn = {
  width: "100%",
  border: "none",
  borderRadius: "14px",
  padding: "14px",
  marginTop: "12px",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
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

const social = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  marginTop: "8px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const proud = {
  color: "var(--gold)",
  fontWeight: "bold",
  marginTop: "8px",
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
