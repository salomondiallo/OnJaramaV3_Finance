import { Clock3, Trash2 } from "lucide-react";

function Historique({ activityHistory, clearActivityHistory }) {
  const items = Array.isArray(activityHistory) ? activityHistory : [];

  return (
    <div className="native-page">
      <h1>Historique</h1>

      <p style={muted}>
        Votre chronologie OnJarama Path : objectifs, dépôts, victoires et actions importantes.
      </p>

      <section style={card}>
        <div style={header}>
          <Clock3 color="var(--gold)" />
          <h2>{items.length} action{items.length > 1 ? "s" : ""}</h2>
        </div>

        <button onClick={clearActivityHistory} style={redButton}>
          <Trash2 size={17} />
          Vider l’historique
        </button>
      </section>

      {items.length === 0 && (
        <section style={card}>
          <p style={muted}>Aucune action enregistrée pour le moment.</p>
        </section>
      )}

      {items.map((item) => (
        <section key={item.id} style={historyCard}>
          <span style={typeBadge}>{labelType(item.type)}</span>
          <strong>{item.title}</strong>
          <p style={muted}>{item.message}</p>
          <small style={mutedSmall}>{formatDate(item.createdAt)}</small>
        </section>
      ))}
    </div>
  );
}

function labelType(type) {
  const labels = {
    objectif: "Objectif",
    depot: "Dépôt",
    victoire: "Victoire",
    finance: "Finance",
    reglages: "Réglages",
  };

  return labels[type] || "Action";
}

function formatDate(value) {
  if (!value) return "Date inconnue";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date inconnue";

  return date.toLocaleString("fr-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const historyCard = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
  marginTop: "12px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const typeBadge = {
  display: "inline-block",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  borderRadius: "999px",
  padding: "5px 9px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const redButton = {
  width: "100%",
  marginTop: "14px",
  padding: "12px",
  borderRadius: "14px",
  border: "1px solid var(--red)",
  background: "rgba(239,68,68,.12)",
  color: "var(--red)",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "7px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "12px",
  marginTop: "8px",
  display: "block",
};

export default Historique;