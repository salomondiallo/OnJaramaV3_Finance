import { Bell, CheckCheck, Trash2 } from "lucide-react";

function Notifications({
  notifications,
  markNotificationsRead,
  clearNotifications,
}) {
  const items = Array.isArray(notifications) ? notifications : [];
  const unreadCount = items.filter((item) => !item.read).length;

  return (
    <div className="native-page">
      <h1>Notifications</h1>

      <p style={muted}>
        Les rappels importants de votre parcours OnJarama Path.
      </p>

      <section style={card}>
        <div style={header}>
          <Bell color="var(--gold)" />
          <h2>{unreadCount} non lue{unreadCount > 1 ? "s" : ""}</h2>
        </div>

        <div style={actionRow}>
          <button onClick={markNotificationsRead} style={goldButton}>
            <CheckCheck size={17} />
            Marquer comme lu
          </button>

          <button onClick={clearNotifications} style={redButton}>
            <Trash2 size={17} />
            Vider
          </button>
        </div>
      </section>

      {items.length === 0 && (
        <section style={card}>
          <p style={muted}>Aucune notification pour le moment.</p>
        </section>
      )}

      {items.map((item) => (
        <section
          key={item.id}
          style={{
            ...notificationCard,
            borderColor: item.read ? "var(--border)" : "var(--gold)",
          }}
        >
          <strong>{item.title}</strong>
          <p style={muted}>{item.message}</p>
          <small style={mutedSmall}>{formatDate(item.createdAt)}</small>
        </section>
      ))}
    </div>
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

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const notificationCard = {
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

const actionRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "14px",
};

const goldButton = {
  padding: "12px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.14)",
  color: "var(--gold)",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "7px",
};

const redButton = {
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

export default Notifications;