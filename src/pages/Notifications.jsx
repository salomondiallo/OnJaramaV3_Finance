import {
  AlertTriangle,
  Bell,
  CheckCheck,
  Clock3,
  CreditCard,
  Flame,
  PiggyBank,
  Target,
  Trash2,
  Trophy,
} from "lucide-react";

function Notifications({
  notifications,
  markNotificationsRead,
  clearNotifications,
  selectedGoals,
  financeData,
}) {
  const storedItems = Array.isArray(notifications) ? notifications : [];
  const smartAlerts = buildSmartAlerts({ selectedGoals, financeData });

  const items = [...smartAlerts, ...storedItems];
  const unreadCount = storedItems.filter((item) => !item.read).length;
  const alertCount = smartAlerts.length;

  return (
    <div className="native-page">
      <h1>Notifications</h1>

      <p style={muted}>
        Les rappels importants de votre parcours OnJarama Path.
      </p>

      <section style={summaryCard}>
        <div style={header}>
          <Bell color="var(--gold)" />
          <h2>
            {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
          </h2>
        </div>

        <p style={muted}>
          {alertCount > 0
            ? `${alertCount} alerte intelligente détectée.`
            : "Aucune alerte intelligente urgente."}
        </p>

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

      {smartAlerts.length > 0 && (
        <section style={smartSection}>
          <div style={header}>
            <Flame color="var(--gold)" />
            <h2>Alertes intelligentes</h2>
          </div>

          {smartAlerts.map((item) => (
            <NotificationCard key={item.id} item={item} smart />
          ))}
        </section>
      )}

      {storedItems.length === 0 && smartAlerts.length === 0 && (
        <section style={card}>
          <p style={muted}>Aucune notification pour le moment.</p>
        </section>
      )}

      {storedItems.length > 0 && (
        <section style={card}>
          <div style={header}>
            <Clock3 color="var(--blue)" />
            <h2>Historique des notifications</h2>
          </div>

          {storedItems.map((item) => (
            <NotificationCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </div>
  );
}

function NotificationCard({ item, smart = false }) {
  const meta = getTypeMeta(item.type);

  return (
    <section
      style={{
        ...notificationCard,
        borderColor: item.read && !smart ? "var(--border)" : meta.color,
        background: smart
          ? meta.background
          : item.read
            ? "var(--bg-card)"
            : "linear-gradient(135deg, rgba(212,175,55,.10), var(--bg-card))",
      }}
    >
      <div style={cardHeader}>
        <span style={{ ...iconBubble, color: meta.color, borderColor: meta.color }}>
          {meta.icon}
        </span>

        <div style={{ flex: 1 }}>
          <strong>{item.title}</strong>
          <p style={muted}>{item.message}</p>
          <small style={mutedSmall}>
            {smart ? "Alerte automatique" : formatDate(item.createdAt)}
          </small>
        </div>
      </div>
    </section>
  );
}

function buildSmartAlerts({ selectedGoals, financeData }) {
  const goals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived)
    : [];

  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];

  const alerts = [];

  const priorityDebt = [...debts]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort((a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0))[0];

  if (priorityDebt) {
    alerts.push({
      id: `smart-debt-${priorityDebt.name || "priority"}`,
      type: "finance",
      title: "Dette prioritaire détectée",
      message: `${priorityDebt.name || "Une dette"} reste prioritaire avec un taux de ${
        priorityDebt.interestRate || 0
      } %.`,
      read: false,
    });
  }

  goals.forEach((goal) => {
    const target = Number(goal.targetAmount || 0);
    const current = Number(goal.currentAmount || 0);

    if (target <= 0) return;

    const progress = Math.min(100, Math.round((current / target) * 100));
    const remaining = Math.max(0, target - current);

    if (progress >= 100) {
      alerts.push({
        id: `smart-victory-${goal.id}`,
        type: "victoire",
        title: "Objectif atteint",
        message: `${goal.title} est complété à 100 %.`,
        read: false,
      });

      return;
    }

    if (progress >= 90) {
      alerts.push({
        id: `smart-90-${goal.id}`,
        type: "objectif",
        title: `${goal.title} atteint ${progress} %`,
        message: `Encore ${Math.round(remaining)} $ pour terminer cet objectif.`,
        read: false,
      });

      return;
    }

    if (progress >= 80) {
      alerts.push({
        id: `smart-80-${goal.id}`,
        type: "objectif",
        title: "Objectif presque atteint",
        message: `${goal.title} est à ${progress} %. Continuez, vous êtes proche.`,
        read: false,
      });
    }

    if (goal.lastDeposit?.date) {
      const lastDepositDate = new Date(goal.lastDeposit.date);
      const today = new Date();

      if (!Number.isNaN(lastDepositDate.getTime())) {
        const daysSinceDeposit = Math.floor(
          (today.getTime() - lastDepositDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysSinceDeposit >= 14 && progress < 100) {
          alerts.push({
            id: `smart-no-deposit-${goal.id}`,
            type: "depot",
            title: "Aucun dépôt récent",
            message: `${goal.title} n’a pas reçu de dépôt depuis ${daysSinceDeposit} jours.`,
            read: false,
          });
        }
      }
    }
  });

  return alerts.slice(0, 8);
}

function getTypeMeta(type) {
  const metas = {
    objectif: {
      color: "var(--gold)",
      background: "linear-gradient(135deg, rgba(212,175,55,.14), var(--bg-card))",
      icon: <Target size={17} />,
    },
    depot: {
      color: "var(--green)",
      background: "linear-gradient(135deg, rgba(34,197,94,.14), var(--bg-card))",
      icon: <PiggyBank size={17} />,
    },
    victoire: {
      color: "var(--gold)",
      background: "linear-gradient(135deg, rgba(212,175,55,.18), var(--bg-card))",
      icon: <Trophy size={17} />,
    },
    finance: {
      color: "var(--red)",
      background: "linear-gradient(135deg, rgba(239,68,68,.13), var(--bg-card))",
      icon: <CreditCard size={17} />,
    },
    alert: {
      color: "var(--red)",
      background: "linear-gradient(135deg, rgba(239,68,68,.13), var(--bg-card))",
      icon: <AlertTriangle size={17} />,
    },
  };

  return (
    metas[type] || {
      color: "var(--blue)",
      background: "linear-gradient(135deg, rgba(56,189,248,.12), var(--bg-card))",
      icon: <Bell size={17} />,
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

const smartSection = {
  background: "var(--bg-card)",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const notificationCard = {
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "14px",
  marginTop: "12px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const cardHeader = {
  display: "flex",
  gap: "12px",
  alignItems: "flex-start",
};

const iconBubble = {
  minWidth: "34px",
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  display: "grid",
  placeItems: "center",
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