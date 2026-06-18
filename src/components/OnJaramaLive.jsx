import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Calendar,
  CheckCircle,
  CreditCard,
  Lightbulb,
  Target,
  Trophy,
} from "lucide-react";
import { formatMoney } from "../utils/formatters";

const pageText = {
  FR: {
    adviceDebt: "Priorisez la dette au taux le plus élevé.",
    adviceStart: "Ajoutez vos chiffres pour générer votre priorité.",
    totalDebt: "Dette totale",
    goal: "Objectif actif",
    noGoal: "Créez un objectif pour construire votre parcours.",
    payment: "Paiement prévu",
    noPayment: "Ajoutez un paiement programmé pour mieux prévoir votre semaine.",
    victory: "Objectif atteint",
    simulator: "Simulation transformée en objectif",
  },

  EN: {
    adviceDebt: "Prioritize the debt with the highest rate.",
    adviceStart: "Add your numbers to generate your priority.",
    totalDebt: "Total debt",
    goal: "Active goal",
    noGoal: "Create a goal to build your path.",
    payment: "Scheduled payment",
    noPayment: "Add a scheduled payment to plan your week.",
    victory: "Goal reached",
    simulator: "Simulation turned into a goal",
  },

  ES: {
    adviceDebt: "Prioriza la deuda con la tasa más alta.",
    adviceStart: "Agrega tus datos para generar tu prioridad.",
    totalDebt: "Deuda total",
    goal: "Objetivo activo",
    noGoal: "Crea un objetivo para construir tu camino.",
    payment: "Pago programado",
    noPayment: "Agrega un pago programado para planificar tu semana.",
    victory: "Objetivo alcanzado",
    simulator: "Simulación convertida en objetivo",
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

  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];
  const activeGoals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived)
    : [];

  const activePayment = scheduledPayments.find((payment) => payment.active);

  const priorityDebt = [...debts]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort(
      (a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0)
    )[0];

  const totalDebt = debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const firstGoal =
    activeGoals.find((goal) => goal.highlighted) || activeGoals[0];

  const reachedGoal = activeGoals.find(
    (goal) =>
      Number(goal.targetAmount || 0) > 0 &&
      Number(goal.currentAmount || 0) >= Number(goal.targetAmount || 0)
  );

  const simulatorGoal = activeGoals.find((goal) => goal.source === "simulateur");

  const messages = [
    {
      icon: <Lightbulb size={16} />,
      color: "var(--gold)",
      text: priorityDebt
        ? `${p.adviceDebt} ${priorityDebt.name}.`
        : p.adviceStart,
    },
    {
      icon: <CreditCard size={16} />,
      color: totalDebt > 0 ? "var(--red)" : "var(--green)",
      text: `${p.totalDebt} : ${formatMoney(totalDebt, currency)}.`,
    },
    {
      icon: <Target size={16} />,
      color: "var(--gold)",
      text: firstGoal ? `${p.goal} : ${firstGoal.title}.` : p.noGoal,
    },
    {
      icon: <Calendar size={16} />,
      color: "var(--blue)",
      text: activePayment
        ? `${p.payment} : ${activePayment.name}.`
        : p.noPayment,
    },
  ];

  if (simulatorGoal) {
    messages.unshift({
      icon: <Bell size={16} />,
      color: "var(--blue)",
      text: `${p.simulator} : ${simulatorGoal.title}.`,
    });
  }

  if (reachedGoal) {
    messages.unshift({
      icon: <Trophy size={16} />,
      color: "var(--green)",
      text: `${p.victory} : ${reachedGoal.title}.`,
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [messages.length]);

  const currentMessage = messages[index] || messages[0];

  return (
    <div style={banner}>
      <span style={{ ...iconBox, color: currentMessage.color }}>
        {currentMessage.icon}
      </span>

      <span style={messageText} title={currentMessage.text}>
        {currentMessage.text}
      </span>

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
  height: "44px",
  minHeight: "44px",
  maxHeight: "44px",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "0 12px",
  marginBottom: "10px",
  display: "grid",
  gridTemplateColumns: "22px minmax(0, 1fr) auto",
  alignItems: "center",
  gap: "10px",
  color: "var(--text-main)",
  boxShadow: "0 8px 24px var(--shadow)",
  fontSize: "13px",
  overflow: "hidden",
};

const iconBox = {
  display: "flex",
  alignItems: "center",
};

const messageText = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
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