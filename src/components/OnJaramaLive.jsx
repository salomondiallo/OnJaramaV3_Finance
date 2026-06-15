import { useEffect, useMemo, useState } from "react";
import { Calendar, CreditCard, Lightbulb, Target, TrendingUp } from "lucide-react";
import { formatMoney } from "../utils/formatters";

const pageText = {
  FR: {
    adviceDebt: "Conseil : priorisez la dette au taux le plus élevé.",
    adviceStart: "Conseil : ajoutez vos chiffres pour générer votre priorité.",
    totalDebt: "Dette totale actuelle",
    goal: "Objectif actif",
    noGoal: "Créez un objectif pour construire votre parcours.",
    payment: "Paiement prévu",
    noPayment: "Ajoutez un paiement programmé pour mieux prévoir votre semaine.",
  },
  EN: {
    adviceDebt: "Tip: prioritize the debt with the highest rate.",
    adviceStart: "Tip: add your numbers to generate your priority.",
    totalDebt: "Current total debt",
    goal: "Active goal",
    noGoal: "Create a goal to build your path.",
    payment: "Scheduled payment",
    noPayment: "Add a scheduled payment to better plan your week.",
  },
  ES: {
    adviceDebt: "Consejo: prioriza la deuda con la tasa más alta.",
    adviceStart: "Consejo: agrega tus datos para generar tu prioridad.",
    totalDebt: "Deuda total actual",
    goal: "Objetivo activo",
    noGoal: "Crea un objetivo para construir tu camino.",
    payment: "Pago programado",
    noPayment: "Agrega un pago programado para planificar mejor tu semana.",
  },
};

function OnJaramaLive({ financeData, selectedGoals, settings }) {
  const currency = settings?.currency || "CAD";
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;
  const [index, setIndex] = useState(0);

  const scheduledPayments = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("onjaramaScheduledPayments")) || [];
    } catch {
      return [];
    }
  }, []);

  const activePayment = scheduledPayments.find((payment) => payment.active);

  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];

  const priorityDebt = [...debts].sort(
    (a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0)
  )[0];

  const totalDebt = debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const activeGoals = Array.isArray(selectedGoals) ? selectedGoals : [];

  const firstGoal =
    activeGoals.find((goal) => goal.highlighted && !goal.archived) ||
    activeGoals.find((goal) => !goal.archived);

  const messages = [
    {
      icon: <Lightbulb size={16} />,
      text: priorityDebt
        ? `${p.adviceDebt} ${priorityDebt.name} (${priorityDebt.interestRate}%).`
        : p.adviceStart,
    },
    {
      icon: <CreditCard size={16} />,
      text: `${p.totalDebt} : ${formatMoney(totalDebt, currency)}.`,
    },
    {
      icon: <Target size={16} />,
      text: firstGoal ? `${p.goal} : ${firstGoal.title}.` : p.noGoal,
    },
    {
      icon: <Calendar size={16} />,
      text: activePayment
        ? `${p.payment} : ${activePayment.name} — ${formatMoney(
            activePayment.amount,
            currency
          )}.`
        : p.noPayment,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div style={banner}>
      <span style={iconBox}>{messages[index].icon}</span>
      <span>{messages[index].text}</span>
      <span style={dots}>
        {messages.map((_, itemIndex) => (
          <span
            key={itemIndex}
            style={{
              ...dot,
              opacity: itemIndex === index ? 1 : 0.35,
            }}
          />
        ))}
      </span>
    </div>
  );
}

const banner = {
  minHeight: "42px",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "10px 14px",
  marginBottom: "10px",
  display: "grid",
  gridTemplateColumns: "22px 1fr auto",
  alignItems: "center",
  gap: "10px",
  color: "var(--text-main)",
  boxShadow: "0 8px 24px var(--shadow)",
  fontSize: "13px",
};

const iconBox = {
  color: "var(--gold)",
  display: "flex",
  alignItems: "center",
};

const dots = {
  display: "flex",
  gap: "4px",
  alignItems: "center",
};

const dot = {
  width: "5px",
  height: "5px",
  borderRadius: "50%",
  background: "var(--gold)",
};

export default OnJaramaLive;