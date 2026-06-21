import { useEffect, useState } from "react";
import {
  Beaker,
  Brain,
  CheckCircle,
  ClipboardList,
  Home,
  Lock,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { getText } from "../data/translations";

const FOUNDER_UNLOCK_KEY = "onjaramaFounderMode";
const FOUNDER_PROFILE_KEY = "onjaramaFounderProfile";

const pageText = {
  FR: {
    title: "Atelier Fondateur",
    subtitle:
      "Espace privé pour idées, réformes, templates personnels et modules expérimentaux.",
    founderProfile: "Profil Fondateur",
    founderActive: "Mode Fondateur actif",
    founderProfileActive: "Paramètres personnels actifs",
    founderProfileInactive: "Paramètres personnels non appliqués",
    applyFounderProfile: "Appliquer mes paramètres fondateur",
    publicMode: "Retour au mode public",
    lockFounderMode: "Verrouiller le mode fondateur",
    privateAccess: "Accès privé",
    privateText:
      "Cet espace est masqué dans l’interface publique. Il sert à préparer les prochaines réformes sans les exposer aux utilisateurs.",
    reform: "Réformes futures",
    reformText: "Banking lecture seule, cloud, PDF, IA avancée et modules premium.",
    personalTemplates: "Templates personnels",
    personalText: "Objectifs privés, projets personnels, maison, voyage et idées longues.",
    lab: "Laboratoire",
    labText: "Tester une idée avant de la transformer en fonctionnalité publique.",
    roadmap: "Roadmap privée",
    roadmapText: "V21 Stable, V22 Banking Preview, V23 Cloud, V24 Export PDF.",
    principles: "Principes fondateurs",
    principle1: "Universel pour le public, personnel seulement dans l’atelier.",
    principle2: "Aucune décision financière automatique à la place de l’utilisateur.",
    principle3: "Lecture seule pour les connexions bancaires futures.",
    principle4: "Progression sans pression, discipline sans culpabilité.",
    housePrivate: "Projet personnel privé",
    houseText: "Les détails très personnels restent ici, jamais dans les templates publics.",
    privateSettings: "Paramètres privés préparés",
    private1: "Maison Guinée privée",
    private2: "Roadmap OnJarama",
    private3: "Banquier intelligent futur",
    private4: "Notes de réforme",
    note: "Note",
    noteText:
      "Le NIP actuel est une protection locale légère. Pour une vraie sécurité, il faudra plus tard un compte fondateur et un rôle serveur.",
  },
  EN: {
    title: "Founder Workshop",
    subtitle:
      "Private space for ideas, reforms, personal templates and experimental modules.",
    founderProfile: "Founder Profile",
    founderActive: "Founder Mode active",
    founderProfileActive: "Personal settings active",
    founderProfileInactive: "Personal settings not applied",
    applyFounderProfile: "Apply my founder settings",
    publicMode: "Return to public mode",
    lockFounderMode: "Lock founder mode",
    privateAccess: "Private access",
    privateText:
      "This area is hidden from the public interface. It prepares future reforms without exposing them to users.",
    reform: "Future reforms",
    reformText: "Read-only banking, cloud, PDF, advanced AI and premium modules.",
    personalTemplates: "Personal templates",
    personalText: "Private goals, personal projects, home, travel and long-term ideas.",
    lab: "Lab",
    labText: "Test an idea before turning it into a public feature.",
    roadmap: "Private roadmap",
    roadmapText: "V21 Stable, V22 Banking Preview, V23 Cloud, V24 PDF Export.",
    principles: "Founder principles",
    principle1: "Universal for the public, personal only in the workshop.",
    principle2: "No automatic financial decision on behalf of the user.",
    principle3: "Read-only for future bank connections.",
    principle4: "Progress without pressure, discipline without guilt.",
    housePrivate: "Private personal project",
    houseText: "Highly personal details stay here, never inside public templates.",
    privateSettings: "Prepared private settings",
    private1: "Private Guinea home",
    private2: "OnJarama roadmap",
    private3: "Future smart banker",
    private4: "Reform notes",
    note: "Note",
    noteText:
      "The current PIN is light local protection. Real security will later require a founder account and server-side role.",
  },
  ES: {
    title: "Taller Fundador",
    subtitle:
      "Espacio privado para ideas, reformas, plantillas personales y módulos experimentales.",
    founderProfile: "Perfil Fundador",
    founderActive: "Modo Fundador activo",
    founderProfileActive: "Ajustes personales activos",
    founderProfileInactive: "Ajustes personales no aplicados",
    applyFounderProfile: "Aplicar mis ajustes fundador",
    publicMode: "Volver al modo público",
    lockFounderMode: "Bloquear modo fundador",
    privateAccess: "Acceso privado",
    privateText:
      "Este espacio está oculto en la interfaz pública. Sirve para preparar reformas futuras sin exponerlas a los usuarios.",
    reform: "Reformas futuras",
    reformText: "Banca solo lectura, cloud, PDF, IA avanzada y módulos premium.",
    personalTemplates: "Plantillas personales",
    personalText: "Objetivos privados, proyectos personales, casa, viaje e ideas largas.",
    lab: "Laboratorio",
    labText: "Probar una idea antes de convertirla en función pública.",
    roadmap: "Roadmap privada",
    roadmapText: "V21 Stable, V22 Banking Preview, V23 Cloud, V24 Export PDF.",
    principles: "Principios fundadores",
    principle1: "Universal para el público, personal solo en el taller.",
    principle2: "Ninguna decisión financiera automática por el usuario.",
    principle3: "Solo lectura para futuras conexiones bancarias.",
    principle4: "Progreso sin presión, disciplina sin culpa.",
    housePrivate: "Proyecto personal privado",
    houseText: "Los detalles muy personales quedan aquí, nunca en plantillas públicas.",
    privateSettings: "Ajustes privados preparados",
    private1: "Casa Guinea privada",
    private2: "Roadmap OnJarama",
    private3: "Banquero inteligente futuro",
    private4: "Notas de reforma",
    note: "Nota",
    noteText:
      "El NIP actual es una protección local ligera. La seguridad real requerirá una cuenta fundador y un rol del servidor.",
  },
};

function AtelierFondateur({ settings, setCurrentPage }) {
  const t = getText(settings);
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;

  const [founderProfileActive, setFounderProfileActive] = useState(() => {
    try {
      return localStorage.getItem(FOUNDER_PROFILE_KEY) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(FOUNDER_UNLOCK_KEY, "true");
  }, []);

  function applyFounderProfile() {
    localStorage.setItem(FOUNDER_UNLOCK_KEY, "true");
    localStorage.setItem(FOUNDER_PROFILE_KEY, "true");
    localStorage.setItem(
      "onjaramaFounderPrivateSettings",
      JSON.stringify({
        founderProfile: true,
        privateHomeProject: true,
        reformNotes: true,
        roadmap: true,
        experimentalModules: true,
        smartBankerFuture: true,
        appliedAt: new Date().toISOString(),
      })
    );
    setFounderProfileActive(true);
  }

  function lockFounderMode() {
    localStorage.removeItem(FOUNDER_UNLOCK_KEY);
    localStorage.removeItem(FOUNDER_PROFILE_KEY);
    setFounderProfileActive(false);
    setCurrentPage?.("profil");
  }

  return (
    <div className="native-page" style={page}>
      <h1>{p.title}</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={founderProfileCard}>
        <div style={header}>
          <Lock color="var(--gold)" />
          <div>
            <h2>{p.founderProfile}</h2>
            <p style={mutedSmall}>
              {founderProfileActive
                ? p.founderProfileActive
                : p.founderProfileInactive}
            </p>
          </div>
        </div>

        <div style={statusPill}>
          <CheckCircle size={18} color="var(--green)" />
          <strong>{p.founderActive}</strong>
        </div>

        <div style={buttonGrid}>
          <button onClick={applyFounderProfile} style={primaryButton}>
            {p.applyFounderProfile}
          </button>

          <button onClick={() => setCurrentPage?.("profil")} style={secondaryButton}>
            {p.publicMode}
          </button>

          <button onClick={lockFounderMode} style={dangerButton}>
            {p.lockFounderMode}
          </button>
        </div>
      </section>

      <section style={heroCard}>
        <div style={header}>
          <ShieldCheck color="var(--gold)" />
          <div>
            <h2>{p.privateAccess}</h2>
            <p style={mutedSmall}>{p.privateText}</p>
          </div>
        </div>
      </section>

      <div style={grid}>
        <FounderTile icon={<Sparkles />} title={p.reform} text={p.reformText} color="var(--gold)" />
        <FounderTile icon={<Target />} title={p.personalTemplates} text={p.personalText} color="var(--green)" />
        <FounderTile icon={<Beaker />} title={p.lab} text={p.labText} color="var(--blue)" />
        <FounderTile icon={<ClipboardList />} title={p.roadmap} text={p.roadmapText} color="var(--purple)" />
      </div>

      <section style={card}>
        <div style={header}>
          <ShieldCheck color="var(--green)" />
          <h2>{p.principles}</h2>
        </div>

        <Principle text={p.principle1} />
        <Principle text={p.principle2} />
        <Principle text={p.principle3} />
        <Principle text={p.principle4} />
      </section>

      <section style={privateProjectCard}>
        <div style={header}>
          <Home color="var(--gold)" />
          <div>
            <h2>{p.housePrivate}</h2>
            <p style={mutedSmall}>{p.houseText}</p>
          </div>
        </div>

        <h3>{p.privateSettings}</h3>
        <Principle text={p.private1} />
        <Principle text={p.private2} />
        <Principle text={p.private3} />
        <Principle text={p.private4} />
      </section>

      <section style={noteCard}>
        <div style={header}>
          <Brain color="var(--blue)" />
          <div>
            <h2>{p.note}</h2>
            <p style={mutedSmall}>{p.noteText}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function FounderTile({ icon, title, text, color }) {
  return (
    <section style={{ ...tile, borderColor: color }}>
      <span style={{ ...tileIcon, color }}>{icon}</span>
      <h2>{title}</h2>
      <p style={mutedSmall}>{text}</p>
    </section>
  );
}

function Principle({ text }) {
  return (
    <div style={principleRow}>
      <CheckCircle size={18} color="var(--green)" />
      <span>{text}</span>
    </div>
  );
}

const page = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const founderProfileCard = {
  background:
    "linear-gradient(135deg, rgba(212,175,55,.20), rgba(139,92,246,.12), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
};

const statusPill = {
  background: "rgba(34,197,94,.12)",
  border: "1px solid var(--green)",
  borderRadius: "999px",
  padding: "9px 12px",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px",
};

const buttonGrid = {
  display: "grid",
  gap: "10px",
};

const primaryButton = {
  border: "none",
  borderRadius: "14px",
  padding: "13px",
  background: "var(--green)",
  color: "white",
  fontWeight: "900",
};

const secondaryButton = {
  border: "1px solid var(--gold)",
  borderRadius: "14px",
  padding: "13px",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  fontWeight: "900",
};

const dangerButton = {
  border: "1px solid var(--red)",
  borderRadius: "14px",
  padding: "13px",
  background: "rgba(239,68,68,.10)",
  color: "var(--red)",
  fontWeight: "900",
};

const heroCard = {
  background:
    "linear-gradient(135deg, rgba(212,175,55,.18), rgba(139,92,246,.10), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "18px",
};

const privateProjectCard = {
  ...card,
  borderColor: "var(--gold)",
  background: "linear-gradient(135deg, rgba(212,175,55,.14), var(--bg-card))",
};

const noteCard = {
  ...card,
  borderColor: "var(--blue)",
  background: "linear-gradient(135deg, rgba(56,189,248,.12), var(--bg-card))",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: "12px",
};

const tile = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "18px",
};

const tileIcon = {
  width: "42px",
  height: "42px",
  borderRadius: "14px",
  background: "var(--bg-panel)",
  display: "grid",
  placeItems: "center",
  marginBottom: "10px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "12px",
};

const principleRow = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  marginTop: "8px",
  display: "flex",
  gap: "9px",
  alignItems: "center",
  fontWeight: "800",
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

export default AtelierFondateur;
