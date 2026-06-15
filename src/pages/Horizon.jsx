import { Calendar, Home, Plane, Target, TrendingUp } from "lucide-react";

function Horizon({ selectedGoals }) {
  return (
    <div>
      <h1>Horizon</h1>

      <p style={muted}>
        Visualisez les prochaines grandes étapes de votre parcours.
      </p>

      <section style={heroCard}>
        <TrendingUp color="var(--green)" size={38} />

        <h2>Vision à long terme</h2>

        <p style={muted}>
          Chaque décision financière d’aujourd’hui construit votre avenir.
        </p>
      </section>

      <section style={card}>
        <TimelineItem
          year="2026"
          icon={<Target color="var(--gold)" />}
          title="Réduction des dettes"
          text="Consolider les finances et reprendre le contrôle."
        />

        <TimelineItem
          year="2027"
          icon={<Plane color="var(--blue)" />}
          title="Préparation des projets"
          text="Voyage, retour au pays et épargne."
        />

        <TimelineItem
          year="2028"
          icon={<Home color="var(--green)" />}
          title="Construction et patrimoine"
          text="Maison, terrain ou investissements."
        />

        <TimelineItem
          year="2030+"
          icon={<TrendingUp color="var(--purple)" />}
          title="Liberté financière"
          text="Développement du patrimoine et des revenus."
        />
      </section>

      <section style={goalCard}>
        <Calendar color="var(--gold)" />
        <h2>Objectifs actifs</h2>

        <h1>{selectedGoals.length}</h1>

        <p style={muted}>
          Objectifs actuellement suivis dans votre parcours.
        </p>
      </section>
    </div>
  );
}

function TimelineItem({ year, icon, title, text }) {
  return (
    <div style={timelineItem}>
      <div style={yearBadge}>{year}</div>

      <div style={timelineContent}>
        {icon}
        <strong>{title}</strong>
        <p style={muted}>{text}</p>
      </div>
    </div>
  );
}

const heroCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.18), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "24px",
  padding: "22px",
  marginTop: "20px",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const goalCard = {
  background: "linear-gradient(135deg,#2a210b,var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const timelineItem = {
  display: "flex",
  gap: "14px",
  marginBottom: "18px",
};

const yearBadge = {
  minWidth: "72px",
  height: "34px",
  borderRadius: "999px",
  background: "#07111f",
  border: "1px solid var(--border)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const timelineContent = {
  flex: 1,
  background: "#07111f",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "14px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "6px",
};

export default Horizon;