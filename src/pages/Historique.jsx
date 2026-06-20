import {
  Clock3,
  CreditCard,
  PiggyBank,
  RefreshCcw,
  Settings,
  Sparkles,
  Target,
  Trash2,
  Trophy,
} from "lucide-react";

const pageText = {
  FR: {
    title: "Historique",
    subtitle: "Toutes les actions importantes de votre parcours OnJarama.",
    clear: "Vider l’historique",
    empty: "Aucune activité enregistrée pour le moment.",
    latest: "Activités récentes",
    total: "Total activités",
    victories: "Victoires",
    deposits: "Dépôts",
    goals: "Objectifs",
    finance: "Finance",
    settings: "Réglages",
    unknownDate: "Date inconnue",
  },
  EN: {
    title: "History",
    subtitle: "All important actions from your OnJarama journey.",
    clear: "Clear history",
    empty: "No activity recorded yet.",
    latest: "Recent activities",
    total: "Total activities",
    victories: "Victories",
    deposits: "Deposits",
    goals: "Goals",
    finance: "Finance",
    settings: "Settings",
    unknownDate: "Unknown date",
  },
  ES: {
    title: "Historial",
    subtitle: "Todas las acciones importantes de tu recorrido OnJarama.",
    clear: "Vaciar historial",
    empty: "No hay actividad registrada por ahora.",
    latest: "Actividades recientes",
    total: "Total actividades",
    victories: "Victorias",
    deposits: "Depósitos",
    goals: "Objetivos",
    finance: "Finanzas",
    settings: "Ajustes",
    unknownDate: "Fecha desconocida",
  },
};

function Historique({ activityHistory, clearActivityHistory, settings }) {
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;

  const history = Array.isArray(activityHistory) ? activityHistory : [];

  const deposits = history.filter((item) => item.type === "depot").length;
  const victories = history.filter((item) => item.type === "victoire").length;
  const goals = history.filter((item) => item.type === "objectif").length;

  return (
    <div className="native-page">
      <h1>{p.title}</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={summaryCard}>
        <div style={header}>
          <Clock3 color="var(--gold)" />
          <h2>{p.latest}</h2>
        </div>

        <div style={statsGrid}>
          <Stat label={p.total} value={history.length} color="var(--gold)" />
          <Stat label={p.deposits} value={deposits} color="var(--green)" />
          <Stat label={p.victories} value={victories} color="var(--gold)" />
          <Stat label={p.goals} value={goals} color="var(--blue)" />
        </div>
      </section>

      {history.length > 0 && (
        <button onClick={clearActivityHistory} style={clearBtn}>
          <Trash2 size={17} />
          {p.clear}
        </button>
      )}

      <section style={card}>
        {history.length === 0 && <p style={muted}>{p.empty}</p>}

        {history.map((item) => {
          const meta = getMeta(item.type);

          return (
            <div key={item.id || item.createdAt} style={historyItem(meta.color)}>
              <span style={{ ...iconBox, color: meta.color }}>
                {meta.icon}
              </span>

              <div>
                <strong>{item.title || meta.label}</strong>
                <p style={muted}>{item.message || meta.label}</p>
                <small style={mutedSmall}>
                  {formatDate(item.createdAt, language, p.unknownDate)}
                </small>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ ...statCard, borderColor: color }}>
      <strong style={{ color }}>{value}</strong>
      <small>{label}</small>
    </div>
  );
}

function getMeta(type) {
  const metas = {
    objectif: {
      label: "Objectif",
      color: "var(--blue)",
      icon: <Target size={18} />,
    },
    depot: {
      label: "Dépôt",
      color: "var(--green)",
      icon: <PiggyBank size={18} />,
    },
    victoire: {
      label: "Victoire",
      color: "var(--gold)",
      icon: <Trophy size={18} />,
    },
    finance: {
      label: "Finance",
      color: "var(--red)",
      icon: <CreditCard size={18} />,
    },
    reglages: {
      label: "Réglages",
      color: "var(--purple)",
      icon: <Settings size={18} />,
    },
    paiement: {
      label: "Paiement",
      color: "var(--gold)",
      icon: <RefreshCcw size={18} />,
    },
  };

  return (
    metas[type] || {
      label: "Action",
      color: "var(--blue)",
      icon: <Sparkles size={18} />,
    }
  );
}

function formatDate(value, language, fallback) {
  if (!value) return fallback;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return fallback;

  const locale = language === "EN" ? "en-CA" : language === "ES" ? "es-ES" : "fr-CA";

  return date.toLocaleString(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const summaryCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.14), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "16px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "14px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "10px",
};

const statCard = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "4px",
};

const historyItem = (color) => ({
  background: "var(--bg-panel)",
  border: `1px solid ${color}`,
  borderRadius: "18px",
  padding: "14px",
  marginTop: "12px",
  display: "grid",
  gridTemplateColumns: "38px 1fr",
  gap: "12px",
  alignItems: "flex-start",
});

const iconBox = {
  width: "38px",
  height: "38px",
  borderRadius: "14px",
  background: "var(--bg-card)",
  display: "grid",
  placeItems: "center",
};

const clearBtn = {
  width: "100%",
  marginTop: "16px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--red)",
  background: "rgba(239,68,68,.12)",
  color: "var(--red)",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "12px",
  marginTop: "6px",
  display: "block",
};

export default Historique;