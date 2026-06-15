import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle,
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
  },
  EN: {
    title: "Payments",
    subtitle: "Track scheduled payments and expected withdrawals.",
    scheduledPayments: "Scheduled payments",
    addPayment: "Add payment",
    name: "Name",
    type: "Type",
    amount: "Amount",
    frequency: "Frequency",
    nextDate: "Next date",
    linkedDebt: "Linked debt",
    active: "Active",
    inactive: "Inactive",
    afterPayment: "Estimated balance after payment",
    totalThisMonth: "Total expected this month",
    totalActive: "Active payments",
    noPayment: "No scheduled payment.",
    save: "Add",
    resetForm: "Reset form",
    weekly: "Weekly",
    biweekly: "Every 2 weeks",
    monthly: "Monthly",
    custom: "Custom",
    debt: "Debt",
    bill: "Bill",
    saving: "Savings",
    project: "Project",
    other: "Other",
  },
  ES: {
    title: "Pagos",
    subtitle: "Sigue tus pagos programados y retiros previstos.",
    scheduledPayments: "Pagos programados",
    addPayment: "Agregar pago",
    name: "Nombre",
    type: "Tipo",
    amount: "Monto",
    frequency: "Frecuencia",
    nextDate: "Próxima fecha",
    linkedDebt: "Deuda vinculada",
    active: "Activo",
    inactive: "Inactivo",
    afterPayment: "Saldo estimado después del pago",
    totalThisMonth: "Total previsto este mes",
    totalActive: "Pagos activos",
    noPayment: "No hay pago programado.",
    save: "Agregar",
    resetForm: "Restablecer formulario",
    weekly: "Semanal",
    biweekly: "Cada 2 semanas",
    monthly: "Mensual",
    custom: "Personalizado",
    debt: "Deuda",
    bill: "Factura",
    saving: "Ahorro",
    project: "Proyecto",
    other: "Otro",
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

function Paiements({ financeData, setFinanceData, settings }) {
  const t = getText(settings);
  const p = pageText[settings?.language || "FR"] || pageText.FR;
  const currency = settings?.currency || "CAD";

  const [payments, setPayments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("onjaramaScheduledPayments")) || [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState(emptyPayment);

  useEffect(() => {
    localStorage.setItem("onjaramaScheduledPayments", JSON.stringify(payments));
  }, [payments]);

  const activePayments = payments.filter((payment) => payment.active);

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

    setPayments([
      ...payments,
      {
        ...form,
        id: Date.now(),
        amount: Number(form.amount || 0),
      },
    ]);

    setForm(emptyPayment);
  }

  function removePayment(id) {
    setPayments(payments.filter((payment) => payment.id !== id));
  }

  function togglePayment(id) {
    setPayments(
      payments.map((payment) =>
        payment.id === id
          ? { ...payment, active: !payment.active }
          : payment
      )
    );
  }

  function applyPayment(payment) {
    if (!payment.linkedDebtName) return;

    const updatedDebts = financeData.debts.map((debt) => {
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

  function getEstimatedDebtBalance(payment) {
    const debt = financeData.debts.find(
      (item) => item.name === payment.linkedDebtName
    );

    if (!debt) return null;

    return Math.max(0, Number(debt.balance || 0) - Number(payment.amount || 0));
  }

  return (
    <div>
      <h1>{p.title}</h1>
      <p style={muted}>{p.subtitle}</p>

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

          return (
            <div key={payment.id} style={paymentCard}>
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
                    borderColor: payment.active
                      ? "var(--green)"
                      : "var(--red)",
                    color: payment.active ? "var(--green)" : "var(--red)",
                  }}
                >
                  {payment.active ? p.active : p.inactive}
                </button>
              </div>

              <p style={mutedSmall}>
                {p.nextDate} : {payment.nextDate || "—"}
              </p>

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

              <div style={paymentActions}>
                <button onClick={() => applyPayment(payment)} style={applyBtn}>
                  <Edit3 size={16} /> Appliquer
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

function getFrequencyLabel(frequency, p) {
  if (frequency === "weekly") return p.weekly;
  if (frequency === "biweekly") return p.biweekly;
  if (frequency === "monthly") return p.monthly;
  return p.custom;
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

const grid = {
  gap: "12px",
  marginTop: "18px",
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