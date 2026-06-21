import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock3,
  CreditCard,
  Edit3,
  Flame,
  Plus,
  RefreshCcw,
  ShieldCheck,
  Trash2,
  Wallet,
  Zap,
} from "lucide-react";
import { cleanMoneyInput, formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    title: "Paiements",
    subtitle: "Suivez vos paiements, retards, échéances et priorités du mois.",
    smartScore: "Score paiements",
    thisWeek: "Cette semaine",
    thisMonth: "Ce mois",
    totalPlanned: "Total prévu",
    totalPaid: "Total payé",
    totalRemaining: "Total restant",
    smartAction: "Action recommandée aujourd'hui",
    noSmartAction: "Aucune action urgente aujourd'hui.",
    addPayment: "Ajouter un paiement",
    scheduledPayments: "Paiements programmés",
    history: "Historique des paiements",
    noHistory: "Aucun paiement appliqué pour le moment.",
    name: "Nom",
    type: "Type",
    amount: "Montant",
    frequency: "Fréquence",
    nextDate: "Prochaine date",
    linkedDebt: "Dette liée",
    active: "Actif",
    inactive: "Inactif",
    save: "Ajouter",
    resetForm: "Réinitialiser",
    weekly: "Hebdomadaire",
    biweekly: "Aux 2 semaines",
    monthly: "Mensuel",
    custom: "Personnalisé",
    debt: "Dette",
    bill: "Facture",
    saving: "Épargne",
    project: "Projet",
    other: "Autre",
    overdue: "Retard",
    dueSoon: "À venir",
    upToDate: "À jour",
    paid: "Payé",
    apply: "Appliquer",
    noPayment: "Aucun paiement programmé.",
    noDebtLinked: "Aucune dette liée",
    afterPayment: "Solde estimé après paiement",
    all: "Tous",
    upcoming: "À venir",
    late: "Retards",
    paidFilter: "Payés",
    today: "Aujourd'hui",
    inDays: "Dans",
    days: "jours",
    paymentIn: "Paiement dans",
    overdueBy: "En retard de",
    plannedToday: "Paiement prévu aujourd’hui.",
    noDate: "Aucune date",
    logement: "Logement",
    transport: "Transport",
    telecom: "Télécommunications",
    insurance: "Assurances",
    subscription: "Abonnements",
    excellent: "Tous les paiements sont sous contrôle.",
    warning: "Quelques paiements demandent votre attention.",
    critical: "Des paiements sont en retard.",
  },
  EN: {
    title: "Payments",
    subtitle: "Track payments, delays, due dates and monthly priorities.",
    smartScore: "Payment score",
    thisWeek: "This week",
    thisMonth: "This month",
    totalPlanned: "Total planned",
    totalPaid: "Total paid",
    totalRemaining: "Total remaining",
    smartAction: "Today's recommended action",
    noSmartAction: "No urgent action today.",
    addPayment: "Add payment",
    scheduledPayments: "Scheduled payments",
    history: "Payment history",
    noHistory: "No applied payment yet.",
    name: "Name",
    type: "Type",
    amount: "Amount",
    frequency: "Frequency",
    nextDate: "Next date",
    linkedDebt: "Linked debt",
    active: "Active",
    inactive: "Inactive",
    save: "Add",
    resetForm: "Reset",
    weekly: "Weekly",
    biweekly: "Biweekly",
    monthly: "Monthly",
    custom: "Custom",
    debt: "Debt",
    bill: "Bill",
    saving: "Savings",
    project: "Project",
    other: "Other",
    overdue: "Overdue",
    dueSoon: "Upcoming",
    upToDate: "Up to date",
    paid: "Paid",
    apply: "Apply",
    noPayment: "No scheduled payment.",
    noDebtLinked: "No linked debt",
    afterPayment: "Estimated balance after payment",
    all: "All",
    upcoming: "Upcoming",
    late: "Overdue",
    paidFilter: "Paid",
    today: "Today",
    inDays: "In",
    days: "days",
    paymentIn: "Payment in",
    overdueBy: "Overdue by",
    plannedToday: "Payment planned today.",
    noDate: "No date",
    logement: "Housing",
    transport: "Transport",
    telecom: "Telecom",
    insurance: "Insurance",
    subscription: "Subscriptions",
    excellent: "All payments are under control.",
    warning: "Some payments need your attention.",
    critical: "Some payments are overdue.",
  },
  ES: {
    title: "Pagos",
    subtitle: "Sigue pagos, atrasos, fechas y prioridades del mes.",
    smartScore: "Puntaje de pagos",
    thisWeek: "Esta semana",
    thisMonth: "Este mes",
    totalPlanned: "Total previsto",
    totalPaid: "Total pagado",
    totalRemaining: "Total restante",
    smartAction: "Acción recomendada hoy",
    noSmartAction: "Ninguna acción urgente hoy.",
    addPayment: "Agregar un pago",
    scheduledPayments: "Pagos programados",
    history: "Historial de pagos",
    noHistory: "Ningún pago aplicado por ahora.",
    name: "Nombre",
    type: "Tipo",
    amount: "Monto",
    frequency: "Frecuencia",
    nextDate: "Próxima fecha",
    linkedDebt: "Deuda vinculada",
    active: "Activo",
    inactive: "Inactivo",
    save: "Agregar",
    resetForm: "Reiniciar",
    weekly: "Semanal",
    biweekly: "Cada 2 semanas",
    monthly: "Mensual",
    custom: "Personalizado",
    debt: "Deuda",
    bill: "Factura",
    saving: "Ahorro",
    project: "Proyecto",
    other: "Otro",
    overdue: "Atraso",
    dueSoon: "Próximo",
    upToDate: "Al día",
    paid: "Pagado",
    apply: "Aplicar",
    noPayment: "No hay pago programado.",
    noDebtLinked: "Sin deuda vinculada",
    afterPayment: "Saldo estimado después del pago",
    all: "Todos",
    upcoming: "Próximos",
    late: "Atrasos",
    paidFilter: "Pagados",
    today: "Hoy",
    inDays: "En",
    days: "días",
    paymentIn: "Pago en",
    overdueBy: "Atrasado por",
    plannedToday: "Pago previsto hoy.",
    noDate: "Sin fecha",
    logement: "Vivienda",
    transport: "Transporte",
    telecom: "Telecomunicaciones",
    insurance: "Seguros",
    subscription: "Suscripciones",
    excellent: "Todos los pagos están bajo control.",
    warning: "Algunos pagos requieren atención.",
    critical: "Hay pagos atrasados.",
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
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;
  const currency = settings?.currency || "CAD";
  const safeFinanceData = financeData || {};
  const debts = Array.isArray(safeFinanceData.debts) ? safeFinanceData.debts : [];

  const [localPayments, setLocalPayments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("onjaramaScheduledPayments")) || [];
    } catch {
      return [];
    }
  });

  const [paymentHistory, setPaymentHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("onjaramaPaymentHistory")) || [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState(emptyPayment);
  const [filter, setFilter] = useState("all");

  const payments = Array.isArray(scheduledPayments) ? scheduledPayments : localPayments;
  const activePayments = payments.filter((payment) => payment.active);

  const enrichedPayments = activePayments.map((payment) => ({
    ...payment,
    status: getPaymentStatus(payment, p),
    category: getPaymentCategory(payment, p),
  }));

  const paymentStats = getPaymentStats(enrichedPayments);
  const smartScore = getPaymentScore(paymentStats);
  const smartMessage =
    smartScore >= 90 ? p.excellent : smartScore >= 70 ? p.warning : p.critical;

  const weekPayments = enrichedPayments
    .filter((payment) => {
      const days = getDaysUntil(payment.nextDate);
      return days !== null && days >= 0 && days <= 7;
    })
    .sort((a, b) => getDaysUntil(a.nextDate) - getDaysUntil(b.nextDate));

  const monthSummary = getMonthSummary({
    payments: enrichedPayments,
    history: paymentHistory,
  });

  const smartAction = getSmartAction(enrichedPayments, p, currency);

  const visiblePayments = payments.filter((payment) => {
    const status = getPaymentStatus(payment, p);

    if (filter === "late") return status.key === "overdue";
    if (filter === "upcoming") return status.key === "dueSoon" || status.key === "upToDate";
    if (filter === "paid") return Boolean(payment.lastPaidAt);

    return true;
  });

  function updatePayments(nextPayments) {
    if (typeof setScheduledPayments === "function") {
      setScheduledPayments(nextPayments);
      return;
    }

    setLocalPayments(nextPayments);
    localStorage.setItem("onjaramaScheduledPayments", JSON.stringify(nextPayments));
  }

  function updateHistory(nextHistory) {
    setPaymentHistory(nextHistory);
    localStorage.setItem("onjaramaPaymentHistory", JSON.stringify(nextHistory));
  }

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

    addActivity?.("paiement", "Paiement programmé", `${newPayment.name} a été ajouté.`);

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
    updatePayments(
      payments.map((payment) =>
        payment.id === id ? { ...payment, active: !payment.active } : payment
      )
    );
  }

  function applyPayment(payment) {
    let updatedDebts = debts;

    if (payment.linkedDebtName) {
      updatedDebts = debts.map((debt) => {
        if (debt.name !== payment.linkedDebtName) return debt;

        return {
          ...debt,
          balance: Math.max(0, Number(debt.balance || 0) - Number(payment.amount || 0)),
        };
      });

      setFinanceData?.({
        ...safeFinanceData,
        debts: updatedDebts,
      });
    }

    const paidAt = new Date().toISOString();
    const nextDate = getNextPaymentDate(payment.nextDate, payment.frequency);

    updatePayments(
      payments.map((item) =>
        item.id === payment.id
          ? {
              ...item,
              nextDate,
              lastPaidAt: paidAt,
            }
          : item
      )
    );

    updateHistory([
      {
        id: `${payment.id}-${Date.now()}`,
        paymentId: payment.id,
        name: payment.name,
        type: payment.type,
        amount: Number(payment.amount || 0),
        linkedDebtName: payment.linkedDebtName || "",
        paidAt,
      },
      ...paymentHistory,
    ]);

    addActivity?.(
      "paiement",
      "Paiement effectué",
      `${formatMoney(payment.amount, currency)} appliqué à ${payment.name}.`
    );
  }

  function getEstimatedDebtBalance(payment) {
    const debt = debts.find((item) => item.name === payment.linkedDebtName);
    if (!debt) return null;

    return Math.max(0, Number(debt.balance || 0) - Number(payment.amount || 0));
  }

  return (
    <div className="native-page">
      <h1>{t.paiements || p.title}</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={scoreCard(smartScore)}>
        <div style={header}>
          <ShieldCheck color={getScoreColor(smartScore)} />
          <div>
            <p style={eyebrow}>{p.smartScore}</p>
            <h2 style={{ color: getScoreColor(smartScore) }}>{smartScore}%</h2>
            <p style={mutedSmall}>{smartMessage}</p>
          </div>
        </div>

        <div style={barBg}>
          <div
            style={{
              ...barFill,
              width: `${smartScore}%`,
              background: getScoreColor(smartScore),
            }}
          />
        </div>
      </section>

      <section style={smartActionCard}>
        <div style={header}>
          <Zap color="var(--gold)" />
          <div>
            <h2>{p.smartAction}</h2>
            <p style={mutedSmall}>{smartAction}</p>
          </div>
        </div>
      </section>

      <section style={smartCard}>
        <div style={header}>
          <Clock3 color="var(--gold)" />
          <h2>{p.thisWeek}</h2>
        </div>

        {weekPayments.length === 0 ? (
          <p style={muted}>{p.noSmartAction}</p>
        ) : (
          <div style={weekList}>
            {weekPayments.map((payment) => (
              <WeekPayment
                key={payment.id}
                payment={payment}
                currency={currency}
                text={p}
              />
            ))}
          </div>
        )}
      </section>

      <section style={card}>
        <div style={header}>
          <Calendar color="var(--green)" />
          <h2>{p.thisMonth}</h2>
        </div>

        <div style={monthGrid}>
          <InfoCard
            icon={<Wallet />}
            title={p.totalPlanned}
            value={formatMoney(monthSummary.totalPlanned, currency)}
            color="var(--gold)"
          />
          <InfoCard
            icon={<CheckCircle />}
            title={p.totalPaid}
            value={formatMoney(monthSummary.totalPaid, currency)}
            color="var(--green)"
          />
          <InfoCard
            icon={<AlertTriangle />}
            title={p.totalRemaining}
            value={formatMoney(monthSummary.totalRemaining, currency)}
            color={monthSummary.totalRemaining > 0 ? "var(--gold)" : "var(--green)"}
          />
        </div>
      </section>

      <section style={smartCard}>
        <div style={header}>
          <Clock3 color="var(--gold)" />
          <h2>{t.paiements || p.title}</h2>
        </div>

        <div style={smartGrid}>
          <SmartStat icon={<AlertTriangle />} label={p.overdue} value={paymentStats.overdue} color="var(--red)" />
          <SmartStat icon={<Calendar />} label={p.dueSoon} value={paymentStats.dueSoon} color="var(--gold)" />
          <SmartStat icon={<CheckCircle />} label={p.upToDate} value={paymentStats.upToDate} color="var(--green)" />
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <Plus color="var(--green)" />
          <h2>{p.addPayment}</h2>
        </div>

        <label>{p.name}</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Loyer, Hydro, Fairstone..."
          style={input}
        />

        <label>{p.type}</label>
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={input}>
          <option value="debt">{p.debt}</option>
          <option value="bill">{p.bill}</option>
          <option value="saving">{p.saving}</option>
          <option value="project">{p.project}</option>
          <option value="other">{p.other}</option>
        </select>

        <label>{p.amount}</label>
        <input
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: cleanMoneyInput(e.target.value) })}
          inputMode="decimal"
          placeholder="100"
          style={input}
        />

        <label>{p.frequency}</label>
        <select value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })} style={input}>
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
          onChange={(e) => setForm({ ...form, linkedDebtName: e.target.value })}
          style={input}
        >
          <option value="">—</option>
          {debts.map((debt) => (
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

        <div style={filterRow}>
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")} label={p.all} />
          <FilterButton active={filter === "upcoming"} onClick={() => setFilter("upcoming")} label={p.upcoming} />
          <FilterButton active={filter === "late"} onClick={() => setFilter("late")} label={p.late} />
          <FilterButton active={filter === "paid"} onClick={() => setFilter("paid")} label={p.paidFilter} />
        </div>

        {visiblePayments.length === 0 && <p style={muted}>{p.noPayment}</p>}

        {visiblePayments.map((payment) => {
          const status = getPaymentStatus(payment, p);
          const category = getPaymentCategory(payment, p);
          const estimatedBalance = getEstimatedDebtBalance(payment);

          return (
            <div key={payment.id} style={{ ...paymentCard, borderColor: status.color }}>
              <div style={paymentHeader}>
                <div>
                  <strong>{category.icon} {payment.name}</strong>
                  <p style={mutedSmall}>
                    {formatMoney(payment.amount, currency)} • {category.label} •{" "}
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

              <p style={mutedSmall}>{p.nextDate} : {payment.nextDate || "—"}</p>

              {status.message && (
                <p style={{ ...mutedSmall, color: status.color, fontWeight: "bold" }}>
                  {status.message}
                </p>
              )}

              <p style={mutedSmall}>
                {payment.linkedDebtName
                  ? `${p.linkedDebt} : ${payment.linkedDebtName}`
                  : p.noDebtLinked}
              </p>

              {estimatedBalance !== null && (
                <p style={mutedSmall}>
                  {p.afterPayment} : <strong>{formatMoney(estimatedBalance, currency)}</strong>
                </p>
              )}

              {payment.lastPaidAt && (
                <p style={mutedSmall}>
                  {p.paid} : {formatDate(payment.lastPaidAt, language)}
                </p>
              )}

              <div style={paymentActions}>
                <button onClick={() => applyPayment(payment)} style={applyBtn}>
                  <Edit3 size={16} /> {p.apply}
                </button>

                <button onClick={() => removePayment(payment.id)} style={trashButton}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </section>

      <section style={card}>
        <div style={header}>
          <CreditCard color="var(--blue)" />
          <h2>{p.history}</h2>
        </div>

        {paymentHistory.length === 0 && <p style={muted}>{p.noHistory}</p>}

        {paymentHistory.slice(0, 12).map((item) => (
          <div key={item.id} style={historyItem}>
            <div>
              <strong>{item.name}</strong>
              <p style={mutedSmall}>{formatDate(item.paidAt, language)}</p>
            </div>

            <strong style={{ color: "var(--green)" }}>
              {formatMoney(item.amount, currency)}
            </strong>
          </div>
        ))}
      </section>
    </div>
  );
}

function getPaymentStats(payments) {
  return payments.reduce(
    (stats, payment) => {
      if (payment.status.key === "overdue") stats.overdue += 1;
      if (payment.status.key === "dueSoon") stats.dueSoon += 1;
      if (payment.status.key === "upToDate") stats.upToDate += 1;
      return stats;
    },
    { overdue: 0, dueSoon: 0, upToDate: 0 }
  );
}

function getPaymentScore(stats) {
  const total = stats.overdue + stats.dueSoon + stats.upToDate;
  if (total === 0) return 100;

  const penalty = stats.overdue * 22 + stats.dueSoon * 7;
  return Math.max(0, Math.min(100, 100 - penalty));
}

function getScoreColor(score) {
  if (score >= 85) return "var(--green)";
  if (score >= 65) return "var(--gold)";
  return "var(--red)";
}

function getMonthSummary({ payments, history }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthPayments = payments.filter((payment) => {
    if (!payment.nextDate) return true;
    const date = new Date(`${payment.nextDate}T12:00:00`);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const totalPlanned = monthPayments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  const totalPaid = history
    .filter((item) => {
      const date = new Date(item.paidAt);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return {
    totalPlanned,
    totalPaid,
    totalRemaining: Math.max(0, totalPlanned - totalPaid),
  };
}

function getSmartAction(payments, p, currency) {
  const overdue = payments.find((payment) => payment.status.key === "overdue");
  if (overdue) return `${p.overdue} : ${overdue.name} — ${formatMoney(overdue.amount, currency)}.`;

  const dueSoon = payments.find((payment) => payment.status.key === "dueSoon");
  if (dueSoon) return `${p.dueSoon} : ${dueSoon.name} — ${formatMoney(dueSoon.amount, currency)}.`;

  return p.noSmartAction;
}

function getPaymentCategory(payment, p) {
  const name = `${payment.name || ""} ${payment.type || ""}`.toLowerCase();

  if (name.includes("loyer") || name.includes("rent") || name.includes("hypothèque")) {
    return { icon: "🏠", label: p.logement };
  }

  if (name.includes("auto") || name.includes("transport") || name.includes("car")) {
    return { icon: "🚗", label: p.transport };
  }

  if (name.includes("phone") || name.includes("internet") || name.includes("télé")) {
    return { icon: "📱", label: p.telecom };
  }

  if (name.includes("assurance") || name.includes("insurance")) {
    return { icon: "🛡️", label: p.insurance };
  }

  if (name.includes("netflix") || name.includes("prime") || name.includes("spotify")) {
    return { icon: "📦", label: p.subscription };
  }

  if (payment.type === "debt") return { icon: "💳", label: p.debt };
  if (payment.type === "saving") return { icon: "💰", label: p.saving };
  if (payment.type === "project") return { icon: "🎯", label: p.project };

  return { icon: "📌", label: p.other };
}

function getPaymentStatus(payment, p = pageText.FR) {
  if (!payment.active) {
    return { key: "inactive", label: p.inactive, color: "var(--red)", message: "" };
  }

  if (!payment.nextDate) {
    return { key: "upToDate", label: p.upToDate, color: "var(--green)", message: p.noDate };
  }

  const days = getDaysUntil(payment.nextDate);

  if (days < 0) {
    const lateDays = Math.abs(days);
    return {
      key: "overdue",
      label: p.overdue,
      color: "var(--red)",
      message: `${p.overdueBy} ${lateDays} ${p.days}.`,
    };
  }

  if (days === 0) {
    return {
      key: "dueSoon",
      label: p.today,
      color: "var(--gold)",
      message: p.plannedToday,
    };
  }

  if (days <= 7) {
    return {
      key: "dueSoon",
      label: p.dueSoon,
      color: "var(--gold)",
      message: `${p.paymentIn} ${days} ${p.days}.`,
    };
  }

  return {
    key: "upToDate",
    label: p.upToDate,
    color: "var(--green)",
    message: `${p.paymentIn} ${days} ${p.days}.`,
  };
}

function getDaysUntil(dateValue) {
  if (!dateValue) return null;

  const today = new Date();
  const dueDate = new Date(`${dateValue}T12:00:00`);

  if (Number.isNaN(dueDate.getTime())) return null;

  today.setHours(12, 0, 0, 0);

  return Math.ceil((dueDate.getTime() - today.getTime()) / 86400000);
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

function formatDate(value, language = "FR") {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString(
    language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
}

function WeekPayment({ payment, currency, text }) {
  const days = getDaysUntil(payment.nextDate);

  return (
    <div style={{ ...weekItem, borderColor: payment.status.color }}>
      <div>
        <strong>{payment.category.icon} {payment.name}</strong>
        <p style={mutedSmall}>
          {days === 0 ? text.today : `${text.inDays} ${days} ${text.days}`}
        </p>
      </div>

      <strong>{formatMoney(payment.amount, currency)}</strong>
    </div>
  );
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

function FilterButton({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...filterButton,
        borderColor: active ? "var(--gold)" : "var(--border)",
        color: active ? "var(--gold)" : "var(--text-main)",
        background: active ? "rgba(212,175,55,.12)" : "var(--bg-panel)",
      }}
    >
      {label}
    </button>
  );
}

const scoreCard = (score) => ({
  background: `linear-gradient(135deg, ${score >= 85 ? "rgba(34,197,94,.16)" : score >= 65 ? "rgba(212,175,55,.16)" : "rgba(239,68,68,.14)"}, var(--bg-card))`,
  border: `1px solid ${getScoreColor(score)}`,
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
});

const smartActionCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.16), rgba(34,197,94,.08), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const smartCard = {
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
  marginBottom: "14px",
};

const eyebrow = {
  color: "var(--gold)",
  fontSize: "12px",
  fontWeight: 900,
  margin: 0,
  textTransform: "uppercase",
};

const barBg = {
  height: "10px",
  background: "var(--bg-panel)",
  borderRadius: "999px",
  overflow: "hidden",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
};

const weekList = {
  display: "grid",
  gap: "10px",
};

const weekItem = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  alignItems: "center",
};

const monthGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "10px",
};

const smartGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px",
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

const infoCard = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
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

const filterRow = {
  display: "flex",
  gap: "8px",
  overflowX: "auto",
  paddingBottom: "4px",
  marginBottom: "10px",
};

const filterButton = {
  border: "1px solid var(--border)",
  borderRadius: "999px",
  padding: "9px 12px",
  whiteSpace: "nowrap",
  fontWeight: 900,
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

const historyItem = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  marginTop: "10px",
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  alignItems: "center",
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