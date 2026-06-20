import {
  CheckCircle,
  Cloud,
  Sparkles,
  Trophy,
  Flag,
  BookOpen,
  ShieldCheck,
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
      version: "V10.3",
      title: "UX Premium Finalization",
      text:
        language === "EN"
          ? "Funding source privacy, progress flag, smart shortcuts, improved guide and premium experience refinement."
          : "Origine des fonds discrète, drapeau de progression, raccourcis intelligents, guide enrichi et amélioration générale de l'expérience premium.",
      icon: <Flag />,
      color: "var(--gold)",
      current: true,
    },

    {
      version: "V10.3",
      title: "UX Premium Implementation",
      text:
        language === "EN"
          ? "Mobile/desktop optimization, premium navigation, guide, patch notes and multilingual foundation."
          : "Optimisation mobile/PC, navigation premium, guide utilisateur, patch notes et fondation multilingue.",
      icon: <Sparkles />,
      color: "var(--gold)",
    },

    {
      version: "V10.2",
      title: "Cloud Foundation",
      text:
        language === "EN"
          ? "Supabase preparation, cloud status and future synchronization architecture."
          : "Préparation Supabase, statut cloud et architecture de synchronisation future.",
      icon: <Cloud />,
      color: "var(--blue)",
    },

    {
      version: "V10.1",
      title: "Auth UI Supabase",
      text:
        language === "EN"
          ? "Google and Microsoft sign-in interface prepared."
          : "Interface de connexion Google et Microsoft préparée.",
      icon: <CheckCircle />,
      color: "var(--green)",
    },

    {
      version: "V10.0",
      title: "Navigation Premium",
      text:
        language === "EN"
          ? "Premium navigation, central My Plan button and stronger application structure."
          : "Navigation premium, bouton central Mon Plan et structure renforcée.",
      icon: <Trophy />,
      color: "var(--purple)",
    },

    {
      version: "V9.0",
      title: "Mon Plan Premium",
      text:
        language === "EN"
          ? "Priority engine, goals integration and financial roadmap."
          : "Moteur de priorités, intégration des objectifs et feuille de route financière.",
      icon: <ShieldCheck />,
      color: "var(--green)",
    },

    {
      version: "V8.0",
      title: "Guide & Learning Foundation",
      text:
        language === "EN"
          ? "First educational experience and onboarding structure."
          : "Première expérience pédagogique et structure d'accompagnement utilisateur.",
      icon: <BookOpen />,
      color: "var(--blue)",
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