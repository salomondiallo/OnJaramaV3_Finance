import {
  BookOpen,
  Brain,
  Calculator,
  CheckCircle,
  Cloud,
  Flag,
  Route,
  ShieldCheck,
  Sparkles,
  Trophy,
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
      version: "V16.0",
      title: "Trust & Security",
      text:
        language === "EN"
          ? "Profile photo, trust score, visible security center, local data reassurance and clearer reset confirmations."
          : "Photo de profil, indice de confiance, centre de sécurité visible, rassurance des données locales et confirmations de réinitialisation.",
      icon: <ShieldCheck />,
      color: "var(--green)",
      current: true,
    },
    {
      version: "V15.6",
      title: "Smart Flip Cards & Path Validation",
      text:
        language === "EN"
          ? "Situation cards now separate results and explanations. Activated goals can be followed through checkable path steps."
          : "Les cartes Situation séparent maintenant résultats et explications. Les objectifs activés peuvent être suivis avec des étapes cochables.",
      icon: <Route />,
      color: "var(--gold)",
    },
    {
      version: "V15.5",
      title: "Smart Objective Templates",
      text:
        language === "EN"
          ? "Goal templates now adapt by type: travel, home, car, debt, mortgage, savings, studies and business."
          : "Les modèles d’objectifs s’adaptent maintenant au type : voyage, maison, auto, dette, hypothèque, épargne, études et entreprise.",
      icon: <Sparkles />,
      color: "var(--gold)",
    },
    {
      version: "V15.0",
      title: "Savings Simulator Integration",
      text:
        language === "EN"
          ? "Savings and project simulations were clarified with target amount, available amount and monthly contribution."
          : "Les simulations épargne et projets ont été clarifiées avec montant visé, montant disponible et contribution mensuelle.",
      icon: <Calculator />,
      color: "var(--blue)",
    },
    {
      version: "V13.5",
      title: "Navigation & Settings Cleanup",
      text:
        language === "EN"
          ? "Navigation, profile, notifications, language and settings were reorganized for a cleaner structure."
          : "Navigation, profil, notifications, langue et paramètres ont été réorganisés pour une structure plus claire.",
      icon: <CheckCircle />,
      color: "var(--green)",
    },
    {
      version: "V11.1",
      title: "Smart Planning & Premium Simulator",
      text:
        language === "EN"
          ? "Premium Simulator and intelligent planning improvements."
          : "Simulateur Premium et renforcement du plan intelligent.",
      icon: <Brain />,
      color: "var(--gold)",
    },
    {
      version: "V10.3",
      title: "Privacy & Progress Flag",
      text:
        language === "EN"
          ? "Discreet funding source display and progress flag improvements."
          : "Origine des fonds discrète et drapeau de progression.",
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
      title: "Banking Read Only",
      text:
        language === "EN"
          ? "Real account balances without transactions."
          : "Lecture des comptes bancaires sans transaction.",
      icon: <ShieldCheck />,
      color: "var(--green)",
    },
    {
      version: "FUTUR",
      title: "Cloud Sync",
      text:
        language === "EN"
          ? "Profile, goals and settings synchronization."
          : "Synchronisation profil, objectifs et paramètres.",
      icon: <Cloud />,
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
            <span style={{ ...iconBox, color: note.color }}>{note.icon}</span>

            <div>
              <strong style={{ color: note.color }}>{note.version}</strong>
              <h2>{note.title}</h2>
            </div>
          </div>

          {note.current && <span style={badge}>{p.current}</span>}

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