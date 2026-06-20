import {
  CheckCircle,
  Cloud,
  Sparkles,
  Trophy,
  Flag,
  BookOpen,
  ShieldCheck,
  Brain,
  Calculator,
  Route,
} from "lucide-react";

const pageText = {
  FR: {
    title: "Patch Notes",
    subtitle: "Historique des améliorations OnJarama Path.",
    current: "Version actuelle",
  },
  EN: {
    title: "Patch Notes",
    subtitle: "OnJarama Path improvement history.",
    current: "Current version",
  },
};

function PatchNotes({ settings }) {
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;

  const notes = [
    {
      version: "V11.1",
      title: "Smart Planning & Simulateur Premium",
      text:
        language === "EN"
          ? "Connect+ Discover, Next Victory, Smart Journey improvements, Premium Simulator and intelligent planning enhancements."
          : "Connect+ Découvre, Prochaine Victoire, amélioration Smart Journey, Simulateur Premium et renforcement du plan intelligent.",
      icon: <Brain />,
      color: "var(--gold)",
      current: true,
    },
    {
      version: "V11.0",
      title: "Navigation Premium",
      text:
        language === "EN"
          ? "Premium navigation and central My Plan experience."
          : "Navigation premium et expérience Mon Plan centrale.",
      icon: <Trophy />,
      color: "var(--gold)",
    },
    {
      version: "V10.3",
      title: "UX Premium Finalization",
      text:
        language === "EN"
          ? "Funding source privacy, progress flag and premium refinements."
          : "Origine des fonds discrète, drapeau de progression et améliorations premium.",
      icon: <Flag />,
      color: "var(--gold)",
    },
    {
      version: "V10.2",
      title: "Cloud Foundation",
      text:
        language === "EN"
          ? "Supabase preparation and cloud architecture."
          : "Préparation Supabase et architecture cloud.",
      icon: <Cloud />,
      color: "var(--blue)",
    },
    {
      version: "V10.1",
      title: "Auth UI Supabase",
      text:
        language === "EN"
          ? "Google and Microsoft sign-in preparation."
          : "Préparation des connexions Google et Microsoft.",
      icon: <CheckCircle />,
      color: "var(--green)",
    },
    {
      version: "V9.0",
      title: "Mon Plan Premium",
      text:
        language === "EN"
          ? "Priority engine and financial roadmap."
          : "Moteur de priorités et feuille de route financière.",
      icon: <ShieldCheck />,
      color: "var(--green)",
    },
    {
      version: "V8.0",
      title: "Guide Foundation",
      text:
        language === "EN"
          ? "Educational onboarding experience."
          : "Première expérience pédagogique utilisateur.",
      icon: <BookOpen />,
      color: "var(--blue)",
    },
    {
      version: "FUTUR",
      title: "V11.2 Smart Allocation Engine",
      text:
        language === "EN"
          ? "Automatic allocation, multi-goal planning and instant impact calculations."
          : "Répartition automatique, multi-objectifs et calcul d'impact instantané.",
      icon: <Calculator />,
      color: "var(--purple)",
    },
    {
      version: "FUTUR",
      title: "V11.3 Cloud Sync",
      text:
        language === "EN"
          ? "Profile, goals and settings synchronization."
          : "Synchronisation profil, objectifs et paramètres.",
      icon: <Cloud />,
      color: "var(--blue)",
    },
    {
      version: "FUTUR",
      title: "V12 Banking Read Only",
      text:
        language === "EN"
          ? "Real account balances without transactions."
          : "Lecture des comptes bancaires sans transaction.",
      icon: <Route />,
      color: "var(--gold)",
    },
  ];

  return (
    <div className="native-page">
      <h1>{p.title}</h1>
      <p style={muted}>{p.subtitle}</p>

      {notes.map((note) => (
        <section
          key={`${note.version}-${note.title}`}
          style={{
            ...card,
            borderColor: note.color,
          }}
        >
          <div style={header}>
            <span style={{ ...iconBox, color: note.color }}>
              {note.icon}
            </span>

            <div>
              <strong style={{ color: note.color }}>
                {note.version}
              </strong>

              <h2>{note.title}</h2>
            </div>
          </div>

          {note.current && (
            <span style={badge}>
              {p.current}
            </span>
          )}

          <p style={muted}>{note.text}</p>
        </section>
      ))}
    </div>
  );
}

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "16px",
};

const header = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
};

const iconBox = {
  width: "42px",
  height: "42px",
  borderRadius: "14px",
  background: "var(--bg-panel)",
  display: "grid",
  placeItems: "center",
};

const badge = {
  display: "inline-block",
  marginTop: "12px",
  border: "1px solid var(--gold)",
  color: "var(--gold)",
  borderRadius: "999px",
  padding: "6px 10px",
  fontSize: "12px",
  fontWeight: "bold",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

export default PatchNotes;
