import {
  BookOpen,
  Calculator,
  Compass,
  CreditCard,
  PiggyBank,
  Route,
  Target,
  Wallet,
} from "lucide-react";

function Explorer({ setCurrentPage }) {
  const sections = [
    {
      title: "Budget",
      text: "Comprendre revenus, dépenses et marge disponible.",
      icon: <Wallet />,
      color: "var(--green)",
      page: "budget",
    },
    {
      title: "Dettes",
      text: "Prioriser les dettes et réduire les intérêts.",
      icon: <CreditCard />,
      color: "var(--red)",
      page: "dettes",
    },
    {
      title: "Épargne",
      text: "Construire un coussin et préparer les projets.",
      icon: <PiggyBank />,
      color: "var(--gold)",
      page: "epargne",
    },
    {
      title: "Objectifs",
      text: "Créer un plan avec montant, rythme et date.",
      icon: <Target />,
      color: "var(--purple)",
      page: "objectifs",
    },
    {
      title: "Simulateur",
      text: "Tester plusieurs scénarios avant de décider.",
      icon: <Calculator />,
      color: "var(--blue)",
      page: "simulateur",
    },
    {
      title: "Parcours",
      text: "Voir votre chemin financier étape par étape.",
      icon: <Route />,
      color: "var(--green)",
      page: "parcours",
    },
  ];

  return (
    <div>
      <h1>Explorer</h1>
      <p style={muted}>Découvrez les outils OnJarama Path.</p>

      <section style={heroCard}>
        <Compass color="var(--gold)" size={38} />
        <h2>Choisissez un point de départ</h2>
        <p style={muted}>
          Chaque section vous aide à mieux comprendre, organiser et avancer.
        </p>
      </section>

      <div style={grid}>
        {sections.map((item) => (
          <button
            key={item.title}
            onClick={() => setCurrentPage(item.page)}
            style={{ ...tile, borderColor: item.color }}
          >
            <span style={{ color: item.color }}>{item.icon}</span>
            <strong>{item.title}</strong>
            <p style={mutedSmall}>{item.text}</p>
          </button>
        ))}
      </div>

      <section style={card}>
        <BookOpen color="var(--purple)" />
        <h2>Comment utiliser Explorer ?</h2>
        <p style={muted}>
          Commencez par Situation, puis explorez Budget, Dettes, Objectifs et Parcours.
        </p>
      </section>
    </div>
  );
}

const heroCard = {
  background: "linear-gradient(135deg,#2a210b,var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "22px",
  marginTop: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "14px",
  marginTop: "20px",
};

const tile = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "20px",
  padding: "18px",
  color: "white",
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "4px",
};

export default Explorer;