import {
  CheckCircle,
  Clock3,
  CreditCard,
  Flag,
  PiggyBank,
  Settings,
  Target,
  Trash2,
  Trophy,
} from "lucide-react";

function Historique({ activityHistory, clearActivityHistory }) {
  const items = Array.isArray(activityHistory) ? activityHistory : [];

  return (
    <div className="native-page">
      <h1>Historique</h1>

      <p style={muted}>
        Votre timeline OnJarama Path : chaque action devient une étape de votre
        parcours financier.
      </p>

      <section style={summaryCard}>
        <div style={header}>
          <Clock3 color="var(--gold)" />
          <h2>{items.length} étape{items.length > 1 ? "s" : ""}</h2>
        </div>

        <p style={muted}>
          Du départ aux victoires, OnJarama garde une trace claire de vos
          progrès.
        </p>

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

      {items.length > 0 && (
        <section style={timelineWrap}>
          <div style={timelineStart}>
            <Flag size={18} color="var(--gold)" />
            <strong>Départ</strong>
          </div>

          <div style={timelineLine} />

          {items.map((item, index) => {
            const meta = getTypeMeta(item.type);
            const isLast = index === items.length - 1;

            return (
              <div key={item.id} style={timelineItem}>
                <div style={timelineMarkerWrap}>
                  <span
                    style={{
                      ...timelineMarker,
                      borderColor: meta.color,
                      color: meta.color,
                    }}
                  >
                    {meta.icon}
                  </span>

                  {!isLast && <span style={timelineConnector} />}
                </div>

                <section
                  style={{
                    ...historyCard,
                    borderColor: meta.color,
                  }}
                >
                  <div style={eventHeader}>
                    <span
                      style={{
                        ...typeBadge,
                        borderColor: meta.color,
                        background: meta.background,
                        color: meta.color,
                      }}
                    >
                      {meta.label}
                    </span>

                    <small style={mutedSmall}>{formatDate(item.createdAt)}</small>
                  </div>

                  <strong>{item.title}</strong>
                  <p style={muted}>{item.message}</p>
                </section>
              </div>
            );
          })}

          <div style={timelineEnd}>
            <CheckCircle size={18} color="var(--green)" />
            <strong>Prochaine étape</strong>
          </div>
        </section>
      )}
    </div>
  );
}

function getTypeMeta(type) {
  const metas = {
    objectif: {
      label: "Objectif",
      color: "var(--gold)",
      background: "rgba(212,175,55,.12)",
      icon: <Target size={17} />,
    },
    depot: {
      label: "Dépôt",
      color: "var(--green)",
      background: "rgba(34,197,94,.12)",
      icon: <PiggyBank size={17} />,
    },
    victoire: {
      label: "Victoire",
      color: "var(--gold)",
      background: "rgba(212,175,55,.16)",
      icon: <Trophy size={17} />,
    },
    finance: {
      label: "Finance",
      color: "var(--blue)",
      background: "rgba(56,189,248,.12)",
      icon: <CreditCard size={17} />,
    },
    reglages: {
      label: "Réglages",
      color: "var(--purple)",
      background: "rgba(168,85,247,.12)",
      icon: <Settings size={17} />,
    },
  };

  return (
    metas[type] || {
      label: "Action",
      color: "var(--blue)",
      background: "rgba(56,189,248,.12)",
      icon: <Clock3 size={17} />,
    }
  );
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
  marginTop: "20px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const timelineWrap = {
  position: "relative",
  marginTop: "22px",
  paddingLeft: "2px",
};

const timelineStart = {
  background: "var(--bg-card)",
  border: "1px solid var(--gold)",
  borderRadius: "999px",
  padding: "10px 13px",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  color: "var(--text-main)",
  marginBottom: "14px",
};

const timelineLine = {
  position: "absolute",
  left: "19px",
  top: "52px",
  bottom: "42px",
  width: "2px",
  background:
    "linear-gradient(180deg, var(--gold), rgba(212,175,55,.22), var(--green))",
  borderRadius: "999px",
};

const timelineItem = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "40px 1fr",
  gap: "10px",
  marginTop: "12px",
};

const timelineMarkerWrap = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
};

const timelineMarker = {
  width: "36px",
  height: "36px",
  borderRadius: "999px",
  border: "1px solid var(--border)",
  background: "var(--bg-card)",
  display: "grid",
  placeItems: "center",
  zIndex: 2,
};

const timelineConnector = {
  position: "absolute",
  top: "36px",
  width: "2px",
  height: "calc(100% + 12px)",
  background: "rgba(212,175,55,.22)",
};

const historyCard = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
};

const eventHeader = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  alignItems: "center",
  marginBottom: "10px",
};

const typeBadge = {
  display: "inline-block",
  border: "1px solid var(--gold)",
  borderRadius: "999px",
  padding: "5px 9px",
  fontSize: "12px",
  fontWeight: "bold",
};

const timelineEnd = {
  background: "linear-gradient(135deg, rgba(34,197,94,.14), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "999px",
  padding: "10px 13px",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  color: "var(--text-main)",
  marginTop: "16px",
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
  marginTop: "0",
  whiteSpace: "nowrap",
};

export default Historique;