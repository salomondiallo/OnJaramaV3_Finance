import {
  AlertTriangle,
  Bot,
  Calendar,
  CheckCircle,
  CreditCard,
  Flame,
  Lightbulb,
  PiggyBank,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    subtitle: "Votre coach financier intelligent.",
    currentAnalysis: "Analyse actuelle",
    financialSnapshot: "Portrait financier",
    income: "Revenus",
    expenses: "Dépenses",
    savings: "Épargne prévue",
    available: "Disponible",
    totalDebt: "Dette totale",
    scheduledPayments: "Paiements programmés",
    transactions: "Transactions",
    netFlow: "Flux net",
    automaticPriority: "Priorité automatique",
    noDebt: "Aucune dette prioritaire détectée.",
    goals: "Objectifs",
    activeGoals: "Objectifs actifs",
    globalProgress: "Progression globale",
    totalTarget: "Montant cible total",
    nextGoal: "Prochain objectif",
    advice: "Conseils OnJarama",
    quickActions: "Actions rapides",
    update: "Mettre à jour",
    viewPath: "Voir le parcours",
    openSimulator: "Ouvrir le simulateur",
    startNumbers: "Commencer par vos chiffres",
    startText:
      "Entrez vos revenus, dépenses, dettes et épargne pour recevoir une analyse personnalisée.",
    pressure: "Budget sous pression",
    pressureText:
      "Vos sorties dépassent votre capacité actuelle. Réduisez une dépense ou ajustez l’épargne prévue.",
    highDebt: "Dette à fort intérêt détectée",
    highDebtText:
      "La priorité devrait être cette dette. Son taux peut ralentir vos autres projets.",
    debtReduction: "Réduction progressive des dettes",
    debtReductionText:
      "Continuez les paiements réguliers et dirigez les montants supplémentaires vers la dette la plus coûteuse.",
    goalsBuilding: "Objectifs en construction",
    goalsBuildingText:
      "Vos objectifs sont actifs. Gardez un rythme régulier et ajustez les dates selon votre capacité réelle.",
    simulatorGoal: "Objectif créé depuis le simulateur",
    simulatorGoalText:
      "Vous avez transformé une simulation en objectif. C’est exactement le bon réflexe : prévoir, nommer, suivre.",
    goodBase: "Bonne base financière",
    goodBaseText:
      "Votre situation semble prête pour créer ou accélérer vos objectifs concrets.",
    tipDebt: "Priorisez toujours les dettes au taux le plus élevé.",
    tipSavings: "Gardez une épargne minimale pour éviter de revenir au crédit.",
    tipWarning:
      "Évitez d’ajouter un nouveau financement tant que la dette prioritaire est élevée.",
  },

  EN: {
    subtitle: "Your smart financial coach.",
    currentAnalysis: "Current analysis",
    financialSnapshot: "Financial snapshot",
    income: "Income",
    expenses: "Expenses",
    savings: "Planned savings",
    available: "Available",
    totalDebt: "Total debt",
    scheduledPayments: "Scheduled payments",
    transactions: "Transactions",
    netFlow: "Net flow",
    automaticPriority: "Automatic priority",
    noDebt: "No priority debt detected.",
    goals: "Goals",
    activeGoals: "Active goals",
    globalProgress: "Global progress",
    totalTarget: "Total target amount",
    nextGoal: "Next goal",
    advice: "OnJarama tips",
    quickActions: "Quick actions",
    update: "Update",
    viewPath: "View path",
    openSimulator: "Open simulator",
    startNumbers: "Start with your numbers",
    startText:
      "Enter your income, expenses, debts and savings to receive a personalized analysis.",
    pressure: "Budget under pressure",
    pressureText:
      "Your outgoing money is above your current capacity. Reduce an expense or adjust planned savings.",
    highDebt: "High-interest debt detected",
    highDebtText:
      "This debt should be the priority. Its rate can slow down your other projects.",
    debtReduction: "Progressive debt reduction",
    debtReductionText:
      "Keep regular payments and direct extra money toward the most expensive debt.",
    goalsBuilding: "Goals in progress",
    goalsBuildingText:
      "Your goals are active. Keep a steady rhythm and adjust dates based on real capacity.",
    simulatorGoal: "Goal created from simulator",
    simulatorGoalText:
      "You turned a simulation into a goal. That is the right reflex: plan, name, track.",
    goodBase: "Good financial base",
    goodBaseText:
      "Your situation seems ready to create or accelerate concrete goals.",
    tipDebt: "Always prioritize debts with the highest interest rate.",
    tipSavings: "Keep minimum savings to avoid going back to credit.",
    tipWarning:
      "Avoid adding new financing while the priority debt remains high.",
  },

  ES: {
    subtitle: "Tu coach financiero inteligente.",
    currentAnalysis: "Análisis actual",
    financialSnapshot: "Resumen financiero",
    income: "Ingresos",
    expenses: "Gastos",
    savings: "Ahorro previsto",
    available: "Disponible",
    totalDebt: "Deuda total",
    scheduledPayments: "Pagos programados",
    transactions: "Transacciones",
    netFlow: "Flujo neto",
    automaticPriority: "Prioridad automática",
    noDebt: "No se detectó deuda prioritaria.",
    goals: "Objetivos",
    activeGoals: "Objetivos activos",
    globalProgress: "Progreso global",
    totalTarget: "Monto objetivo total",
    nextGoal: "Próximo objetivo",
    advice: "Consejos OnJarama",
    quickActions: "Acciones rápidas",
    update: "Actualizar",
    viewPath: "Ver camino",
    openSimulator: "Abrir simulador",
    startNumbers: "Comenzar con tus cifras",
    startText:
      "Ingresa tus ingresos, gastos, deudas y ahorro para recibir un análisis personalizado.",
    pressure: "Presupuesto bajo presión",
    pressureText:
      "Tus salidas superan tu capacidad actual. Reduce un gasto o ajusta el ahorro previsto.",
    highDebt: "Deuda con alto interés detectada",
    highDebtText:
      "Esta deuda debería ser la prioridad. Su tasa puede frenar tus otros proyectos.",
    debtReduction: "Reducción progresiva de deudas",
    debtReductionText:
      "Mantén pagos regulares y dirige el dinero extra hacia la deuda más costosa.",
    goalsBuilding: "Objetivos en construcción",
    goalsBuildingText:
      "Tus objetivos están activos. Mantén un ritmo regular y ajusta las fechas según tu capacidad real.",
    simulatorGoal: "Objetivo creado desde el simulador",
    simulatorGoalText:
      "Convertiste una simulación en objetivo. Es el reflejo correcto: planificar, nombrar, seguir.",
    goodBase: "Buena base financiera",
    goodBaseText:
      "Tu situación parece lista para crear o acelerar objetivos concretos.",
    tipDebt: "Prioriza siempre las deudas con la tasa de interés más alta.",
    tipSavings: "Mantén un ahorro mínimo para evitar volver al crédito.",
    tipWarning:
      "Evita agregar nuevo financiamiento mientras la deuda prioritaria siga alta.",
  },
};

function AssistantIA({ financeData, selectedGoals, settings, setCurrentPage }) {
  const t = getText(settings);
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;
  const currency = settings?.currency || "CAD";

  const payments = getStoredArray("onjaramaScheduledPayments");
  const transactions = getStoredArray("onjaramaTransactions");

  const income = Number(financeData.overview.monthlyIncome || 0);
  const expenses = Number(financeData.overview.monthlyExpenses || 0);
  const savings = Number(financeData.overview.monthlySavings || 0);

  const totalDebt = financeData.debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const available = income - expenses - savings;

  const priorityDebt = [...financeData.debts]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort((a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0))[0];

  const activeGoals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived)
    : [];

  const simulatorGoal = activeGoals.find((goal) => goal.source === "simulateur");

  const totalGoalTarget = activeGoals.reduce(
    (sum, goal) => sum + Number(goal.targetAmount || 0),
    0
  );

  const totalGoalCurrent = activeGoals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount || 0),
    0
  );

  const goalProgress =
    totalGoalTarget > 0
      ? Math.min(100, Math.round((totalGoalCurrent / totalGoalTarget) * 100))
      : 0;

  const highlightedGoal =
    activeGoals.find((goal) => goal.highlighted) || activeGoals[0];

  const activePayments = payments.filter((payment) => payment.active);

  const monthlyPayments = activePayments.reduce((total, payment) => {
    const amount = Number(payment.amount || 0);
    if (payment.frequency === "weekly") return total + amount * 4;
    if (payment.frequency === "biweekly") return total + amount * 2;
    if (payment.frequency === "monthly") return total + amount;
    return total + amount;
  }, 0);

  const transactionTotals = transactions.reduce(
    (acc, transaction) => {
      const amount = Number(transaction.amount || 0);
      if (transaction.type === "income") acc.income += amount;
      if (transaction.type === "expense") acc.expenses += amount;
      if (transaction.type === "savings") acc.savings += amount;
      if (transaction.type === "debt") acc.debt += amount;
      return acc;
    },
    { income: 0, expenses: 0, savings: 0, debt: 0 }
  );

  const transactionNetFlow =
    transactionTotals.income -
    transactionTotals.expenses -
    transactionTotals.savings -
    transactionTotals.debt;

  const mainAdvice = getMainAdvice({
    income,
    available,
    totalDebt,
    priorityDebt,
    activeGoals,
    simulatorGoal,
    monthlyPayments,
    p,
  });

  return (
    <div className="native-page">
      <h1>{t.assistant}</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={heroCard}>
        <Bot size={42} color="var(--purple)" />
        <p style={muted}>{p.currentAnalysis}</p>
        <h2>{mainAdvice.title}</h2>
        <p>{mainAdvice.text}</p>
      </section>

      <section style={card}>
        <div style={header}>
          <TrendingUp color="var(--green)" />
          <h2>{p.financialSnapshot}</h2>
        </div>

        <Info label={p.income} value={formatMoney(income, currency)} />
        <Info label={p.expenses} value={formatMoney(expenses, currency)} />
        <Info label={p.savings} value={formatMoney(savings, currency)} />
        <Info label={p.available} value={formatMoney(available, currency)} />
        <Info label={p.totalDebt} value={formatMoney(totalDebt, currency)} />
      </section>

      <section style={priorityCard}>
        <div style={header}>
          <Flame color="var(--gold)" />
          <h2>{p.automaticPriority}</h2>
        </div>

        {priorityDebt ? (
          <>
            <p>
              <strong>{priorityDebt.name}</strong>
            </p>
            <p style={muted}>
              {priorityDebt.interestRate}% •{" "}
              {formatMoney(priorityDebt.balance, currency)}
            </p>
          </>
        ) : (
          <p style={muted}>{p.noDebt}</p>
        )}
      </section>

      <section style={card}>
        <div style={header}>
          <Target color="var(--gold)" />
          <h2>{p.goals}</h2>
        </div>

        <Info label={p.activeGoals} value={activeGoals.length} />
        <Info label={p.globalProgress} value={`${goalProgress}%`} />
        <Info label={p.totalTarget} value={formatMoney(totalGoalTarget, currency)} />

        {highlightedGoal && (
          <Info label={p.nextGoal} value={highlightedGoal.title} />
        )}
      </section>

      <section style={card}>
        <div style={header}>
          <Calendar color="var(--gold)" />
          <h2>{p.scheduledPayments}</h2>
        </div>

        <Info label={p.scheduledPayments} value={activePayments.length} />
        <Info label={p.expenses} value={formatMoney(monthlyPayments, currency)} />

        {activePayments.slice(0, 3).map((payment) => (
          <Info
            key={payment.id}
            label={payment.name}
            value={formatMoney(payment.amount, currency)}
          />
        ))}
      </section>

      <section style={card}>
        <div style={header}>
          <Wallet color="var(--blue)" />
          <h2>{p.transactions}</h2>
        </div>

        <Info label={p.transactions} value={transactions.length} />
        <Info label={p.netFlow} value={formatMoney(transactionNetFlow, currency)} />
        <Info label={p.income} value={formatMoney(transactionTotals.income, currency)} />
        <Info
          label={p.expenses}
          value={formatMoney(
            transactionTotals.expenses +
              transactionTotals.savings +
              transactionTotals.debt,
            currency
          )}
        />
      </section>

      <section style={card}>
        <div style={header}>
          <Lightbulb color="var(--purple)" />
          <h2>{p.advice}</h2>
        </div>

        <Advice icon={<CheckCircle />} text={p.tipDebt} color="var(--green)" />
        <Advice icon={<PiggyBank />} text={p.tipSavings} color="var(--gold)" />
        <Advice icon={<AlertTriangle />} text={p.tipWarning} color="var(--red)" />
      </section>

      <section style={card}>
        <h2>{p.quickActions}</h2>

        <div style={actions}>
          <button onClick={() => setCurrentPage("situation")} style={greenBtn}>
            {p.update}
          </button>

          <button onClick={() => setCurrentPage("parcours")} style={purpleBtn}>
            {p.viewPath}
          </button>

          <button onClick={() => setCurrentPage("simulateur")} style={blueBtn}>
            {p.openSimulator}
          </button>
        </div>
      </section>
    </div>
  );
}

function getStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function getMainAdvice({
  income,
  available,
  totalDebt,
  priorityDebt,
  activeGoals,
  simulatorGoal,
  monthlyPayments,
  p,
}) {
  if (income <= 0) {
    return {
      title: p.startNumbers,
      text: p.startText,
    };
  }

  if (available - monthlyPayments < 0) {
    return {
      title: p.pressure,
      text: p.pressureText,
    };
  }

  if (priorityDebt && Number(priorityDebt.interestRate || 0) >= 20) {
    return {
      title: p.highDebt,
      text: `${p.highDebtText} ${priorityDebt.name}.`,
    };
  }

  if (totalDebt > 0) {
    return {
      title: p.debtReduction,
      text: p.debtReductionText,
    };
  }

  if (simulatorGoal) {
    return {
      title: p.simulatorGoal,
      text: p.simulatorGoalText,
    };
  }

  if (activeGoals.length > 0) {
    return {
      title: p.goalsBuilding,
      text: p.goalsBuildingText,
    };
  }

  return {
    title: p.goodBase,
    text: p.goodBaseText,
  };
}

function Info({ label, value }) {
  return (
    <div style={row}>
      <span style={muted}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Advice({ icon, text, color }) {
  return (
    <div style={advice}>
      <span style={{ color }}>{icon}</span>
      <p>{text}</p>
    </div>
  );
}

const heroCard = {
  background: "linear-gradient(135deg, rgba(139,92,246,.20), var(--bg-card))",
  border: "1px solid var(--purple)",
  borderRadius: "24px",
  padding: "22px",
  marginTop: "20px",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const priorityCard = {
  background: "linear-gradient(135deg,#2a210b,var(--bg-card))",
  border: "1px solid var(--gold)",
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

const row = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  padding: "12px 0",
  borderBottom: "1px solid var(--border)",
};

const advice = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  marginTop: "10px",
  display: "flex",
  gap: "10px",
  alignItems: "flex-start",
};

const actions = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "10px",
  marginTop: "14px",
};

const greenBtn = {
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
};

const purpleBtn = {
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(90deg,var(--purple),var(--blue))",
  color: "white",
  fontWeight: "bold",
};

const blueBtn = {
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "rgba(56,189,248,.16)",
  color: "var(--blue)",
  fontWeight: "bold",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

export default AssistantIA;