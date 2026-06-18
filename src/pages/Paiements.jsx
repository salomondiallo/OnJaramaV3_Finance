import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock3,
  CreditCard,
  Edit3,
  Plus,
  RefreshCcw,
  Trash2,
  Wallet,
} from "lucide-react";
import { cleanMoneyInput, formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    title: "Paiements",
    subtitle: "Suivez vos paiements programmés et vos prélèvements prévus.",
    smartPayments: "Paiements intelligents",
    scheduledPayments: "Paiements programmés",
    addPayment: "Ajouter un paiement",
    name: "Nom",
    type: "Type",
    amount: "Montant",
    frequency: "Fréquence",
    nextDate: "Prochaine date",
    linkedDebt: "Dette liée",
    active: "Actif",
    inactive: "Inactif",
    afterPayment: "Solde estimé après paiement",
    totalThisMonth: "Total prévu ce mois-ci",
    totalActive: "Paiements actifs",
    noPayment: "Aucun paiement programmé.",
    save: "Ajouter",
    resetForm: "Réinitialiser le formulaire",
    weekly: "Hebdomadaire",
    biweekly: "Aux 2 semaines",
    monthly: "Mensuel",
    custom: "Personnalisé",
    debt: "Dette",
    bill: "Facture",
    saving: "Épargne",
    project: "Projet",
    other: "Autre",
    overdue: "En retard",
    dueSoon: "Bientôt dû",
    upToDate: "À jour",
    paid: "Effectué",
    apply: "Appliquer",
  },
};

const emptyPayment = {
  name: "",
  type: "debt",
  amount: "",
  frequency: "biweekly",
  nextDate: "",
  linkedDebtName: "",
  active: true,
};

function Paiements({
  financeData,
  setFinanceData,
  settings,
  scheduledPayments,
  setScheduledPayments,
  addActivity,
}) {
  const t = getText(settings);
  const p = pageText[settings?.language || "FR"] || pageText.FR;
  const currency = settings?.currency || "CAD";

  const [localPayments, setLocalPayments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("onjaramaScheduledPayments")) || [];
    } catch {
      return [];
    }
  });

  const payments = Array.isArray(scheduledPayments)
    ? scheduledPayments
    : localPayments;

  const [form, setForm] = useState(emptyPayment);

  function updatePayments(nextPayments) {
    if (typeof setScheduledPayments === "function") {
      setScheduledPayments(nextPayments);
      return;
    }

    setLocalPayments(nextPayments);
    localStorage.setItem("onjaramaScheduledPayments", JSON.stringify(nextPayments));
  }

  const activePayments = payments.filter((payment) => payment.active);

  const paymentStats = useMemo(() => {
    return activePayments.reduce(
      (stats, payment) => {
        const status = getPaymentStatus(payment);

        if (status.key === "overdue") stats.overdue += 1;
        if (status.key === "dueSoon") stats.dueSoon += 1;
        if (status.key === "upToDate") stats.upToDate += 1;

        return stats;
      },
      {
        overdue: 0,
        dueSoon: 0,
        upToDate: 0,
      }
    );
  }, [activePayments]);

  const monthlyEstimate = useMemo(() => {
    return activePayments.reduce((total, payment) => {
      const amount = Number(payment.amount || 0);

      if (payment.frequency === "weekly") return total + amount * 4;
      if (payment.frequency === "biweekly") return total + amount * 2;
      if (payment.frequency === "monthly") return total + amount;

      return total + amount;
    }, 0);
  }, [activePayments]);

  function addPayment() {
    if (!form.name || !form.amount) return;

    const newPayment = {
      ...form,
      id: Date.now(),
      amount: Number(form.amount || 0),
      createdAt: new Date().toISOString(),
      lastPaidAt: null,
    };

    updatePayments([...payments, newPayment]);

    addActivity?.(
      "paiement",
      "Paiement programmé",
      `${newPayment.name} a été ajouté aux paiements.`
    );

    setForm(emptyPayment);
  }

  function removePayment(id) {
    const payment = payments.find((item) => item.id === id);

    updatePayments(payments.filter((item) => item.id !== id));

    addActivity?.(
      "paiement",
      "Paiement supprimé",
      `${payment?.name || "Un paiement"} a été supprimé.`
    );
  }

  function togglePayment(id) {
    const updatedPayments = payments.map((payment) =>
      payment.id === id ? { ...payment, active: !payment.active } : payment
    );

    updatePayments(updatedPayments);
  }

  function applyPayment(payment) {
    let updatedDebts = financeData.debts;

    if (payment.linkedDebtName) {
      updatedDebts = financeData.debts.map((debt) => {
        if (debt.name !== payment.linkedDebtName) return debt;

        return {
          ...debt,
          balance: Math.max(
            0,
            Number(debt.balance || 0) - Number(payment.amount || 0)
          ),
        };
      });

      setFinanceData({
        ...financeData,
        debts: updatedDebts,
      });
    }

    const nextDate = getNextPaymentDate(payment.nextDate, payment.frequency);

    const updatedPayments = payments.map((item) =>
      item.id === payment.id
        ? {
            ...item,
            nextDate,
            lastPaidAt: new Date().toISOString(),
          }
        : item
    );

    updatePayments(updatedPayments);

    addActivity?.(
      "paiement",
      "Paiement effectué",
      `${formatMoney(payment.amount, currency)} appliqué à ${payment.name}.`
    );
  }

  function getEstimatedDebtBalance(payment) {
    const debt = financeData.debts.find(
      (item) => item.name === payment.linkedDebtName
    );

    if (!debt) return null;

    return Math.max(0, Number(debt.balance || 0) - Number(payment.amount || 0));
  }

  return (
    <div className="native-page">
      <h1>{p.title}</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={smartCard}>
        <div style={header}>
          <Clock3 color="var(--gold)" />
          <h2>{p.smartPayments}</h2>
        </div>

        <div style={smartGrid}>
          <SmartStat
            icon={<AlertTriangle />}
            label={p.overdue}
            value={paymentStats.overdue}
            color="var(--red)"
          />

          <SmartStat
            icon={<Calendar />}
            label={p.dueSoon}
            value={paymentStats.dueSoon}
            color="var(--gold)"
          />

          <SmartStat
            icon={<CheckCircle />}
            label={p.upToDate}
            value={paymentStats.upToDate}
            color="var(--green)"
          />
        </div>
      </section>

      <div className="grid-2" style={grid}>
        <InfoCard
          icon={<Wallet />}
          title={p.totalThisMonth}
          value={formatMoney(monthlyEstimate, currency)}
          color="var(--green)"
        />

        <InfoCard
          icon={<CheckCircle />}
          title={p.totalActive}
          value={activePayments.length}
          color="var(--gold)"
        />
      </div>

      <section style={card}>
        <div style={header}>
          <Plus color="var(--green)" />
          <h2>{p.addPayment}</h2>
        </div>

        <label>{p.name}</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Fairstone, Modulo, Assurance..."
          style={input}
        />

        <label>{p.type}</label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          style={input}
        >
          <option value="debt">{p.debt}</option>
          <option value="bill">{p.bill}</option>
          <option value="saving">{p.saving}</option>
          <option value="project">{p.project}</option>
          <option value="other">{p.other}</option>
        </select>

        <label>{p.amount}</label>
        <input
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: cleanMoneyInput(e.target.value) })
          }
          inputMode="decimal"
          placeholder="227.75"
          style={input}
        />

        <label>{p.frequency}</label>
        <select
          value={form.frequency}
          onChange={(e) => setForm({ ...form, frequency: e.target.value })}
          style={input}
        >
          <option value="weekly">{p.weekly}</option>
          <option value="biweekly">{p.biweekly}</option>
          <option value="monthly">{p.monthly}</option>
          <option value="custom">{p.custom}</option>
        </select>

        <label>{p.nextDate}</label>
        <input
          type="date"
          value={form.nextDate}
          onChange={(e) => setForm({ ...form, nextDate: e.target.value })}
          style={input}
        />

        <label>{p.linkedDebt}</label>
        <select
          value={form.linkedDebtName}
          onChange={(e) =>
            setForm({ ...form, linkedDebtName: e.target.value })
          }
          style={input}
        >
          <option value="">—</option>
          {financeData.debts.map((debt) => (
            <option key={debt.name} value={debt.name}>
              {debt.name}
            </option>
          ))}
        </select>

        <div style={actions}>
          <button onClick={addPayment} style={addButton}>
            {p.save}
          </button>

          <button onClick={() => setForm(emptyPayment)} style={secondaryBtn}>
            <RefreshCcw size={16} /> {p.resetForm}
          </button>
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <Calendar color="var(--gold)" />
          <h2>{p.scheduledPayments}</h2>
        </div>

        {payments.length === 0 && <p style={muted}>{p.noPayment}</p>}

        {payments.map((payment) => {
          const estimatedBalance = getEstimatedDebtBalance(payment);
          const status = getPaymentStatus(payment);

          return (
            <div
              key={payment.id}
              style={{
                ...paymentCard,
                borderColor: status.color,
              }}
            >
              <div style={paymentHeader}>
                <div>
                  <strong>{payment.name}</strong>
                  <p style={mutedSmall}>
                    {formatMoney(payment.amount, currency)} •{" "}
                    {getFrequencyLabel(payment.frequency, p)}
                  </p>
                </div>

                <button
                  onClick={() => togglePayment(payment.id)}
                  style={{
                    ...statusBtn,
                    borderColor: payment.active ? status.color : "var(--red)",
                    color: payment.active ? status.color : "var(--red)",
                  }}
                >
                  {payment.active ? status.label : p.inactive}
                </button>
              </div>

              <p style={mutedSmall}>
                {p.nextDate} : {payment.nextDate || "—"}
              </p>

              {status.message && (
                <p style={{ ...mutedSmall, color: status.color, fontWeight: "bold" }}>
                  {status.message}
                </p>
              )}

              {payment.linkedDebtName && (
                <p style={mutedSmall}>
                  {p.linkedDebt} : {payment.linkedDebtName}
                </p>
              )}

              {estimatedBalance !== null && (
                <p style={mutedSmall}>
                  {p.afterPayment} :{" "}
                  <strong>{formatMoney(estimatedBalance, currency)}</strong>
                </p>
              )}

              {payment.lastPaidAt && (
                <p style={mutedSmall}>
                  {p.paid} : {formatDate(payment.lastPaidAt)}
                </p>
              )}

              <div style={paymentActions}>
                <button onClick={() => applyPayment(payment)} style={applyBtn}>
                  <Edit3 size={16} /> {p.apply}
                </button>

                <button
                  onClick={() => removePayment(payment.id)}
                  style={trashButton}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function getPaymentStatus(payment) {
  if (!payment.active) {
    return {
      key: "inactive",
      label: "Inactif",
      color: "var(--red)",
      message: "",
    };
  }

  if (!payment.nextDate) {
    return {
      key: "upToDate",
      label: "À jour",
      color: "var(--green)",
      message: "Aucune échéance urgente.",
    };
  }

  const today = new Date();
  const dueDate = new Date(`${payment.nextDate}T12:00:00`);

  today.setHours(12, 0, 0, 0);

  const diffDays = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) {
    const lateDays = Math.abs(diffDays);

    return {
      key: "overdue",
      label: "En retard",
      color: "var(--red)",
      message: `En retard de ${lateDays} jour${lateDays > 1 ? "s" : ""}.`,
    };
  }

  if (diffDays === 0) {
    return {
      key: "dueSoon",
      label: "Aujourd’hui",
      color: "var(--gold)",
      message: "Paiement prévu aujourd’hui.",
    };
  }

  if (diffDays <= 3) {
    return {
      key: "dueSoon",
      label: "Bientôt dû",
      color: "var(--gold)",
      message: `Paiement dans ${diffDays} jour${diffDays > 1 ? "s" : ""}.`,
    };
  }

  return {
    key: "upToDate",
    label: "À jour",
    color: "var(--green)",
    message: `Paiement dans ${diffDays} jours.`,
  };
}

function getNextPaymentDate(dateValue, frequency) {
  if (!dateValue || frequency === "custom") return dateValue;

  const date = new Date(`${dateValue}T12:00:00`);

  if (Number.isNaN(date.getTime())) return dateValue;

  if (frequency === "weekly") date.setDate(date.getDate() + 7);
  if (frequency === "biweekly") date.setDate(date.getDate() + 14);
  if (frequency === "monthly") date.setMonth(date.getMonth() + 1);

  return date.toISOString().slice(0, 10);
}

function getFrequencyLabel(frequency, p) {
  if (frequency === "weekly") return p.weekly;
  if (frequency === "biweekly") return p.biweekly;
  if (frequency === "monthly") return p.monthly;
  return p.custom;
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("fr-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function InfoCard({ icon, title, value, color }) {
  return (
    <div style={{ ...infoCard, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <p style={mutedSmall}>{title}</p>
      <strong>{value}</strong>
    </div>
  );
}

function SmartStat({ icon, label, value, color }) {
  return (
    <div style={{ ...smartStat, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <strong>{value}</strong>
      <small style={mutedSmall}>{label}</small>
    </div>
  );
}

const grid = {
  gap: "12px",
  marginTop: "18px",
};

const smartCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.14), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const smartGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px",
  marginTop: "14px",
};

const smartStat = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "5px",
  textAlign: "center",
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
  marginBottom: "14px",
};

const input = {
  display: "block",
  width: "100%",
  marginTop: "8px",
  marginBottom: "12px",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
};

const actions = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "12px",
};

const addButton = {
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
};

const secondaryBtn = {
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
};

const infoCard = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
};

const paymentCard = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
  marginTop: "12px",
};

const paymentHeader = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};

const statusBtn = {
  border: "1px solid var(--border)",
  background: "transparent",
  borderRadius: "999px",
  padding: "7px 10px",
  height: "36px",
};

const paymentActions = {
  display: "grid",
  gridTemplateColumns: "1fr 46px",
  gap: "10px",
  marginTop: "12px",
};

const applyBtn = {
  padding: "12px",
  borderRadius: "13px",
  border: "none",
  background: "linear-gradient(90deg,var(--purple),var(--blue))",
  color: "white",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
};

const trashButton = {
  border: "1px solid var(--red)",
  background: "transparent",
  color: "var(--red)",
  borderRadius: "13px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "5px",
};

export default Paiements;