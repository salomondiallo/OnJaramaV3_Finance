import { useEffect, useMemo, useState } from "react";

const PRIVACY_CLEAN_VERSION = "OJ_PATH_PRIVACY_CLEAN_V1_1";

const STORAGE_KEYS_TO_CLEAR = [
  "onjaramaFinanceData",
  "onjaramaSelectedGoals",
  "onjaramaSettings",
  "onjaramaSituationDetails",
  "onjaramaScheduledPayments",
  "onjaramaTransactions",
  "onjaramaActivityHistory",
  "onjaramaNotifications",
  "onjaramaVictorySeenIds",
  "financeData",
  "selectedGoals",
  "settings",
  "debts",
  "goals",
  "payments",
  "transactions",
];

function cleanPersonalDataOnce() {
  const alreadyCleaned = localStorage.getItem(PRIVACY_CLEAN_VERSION);
  if (alreadyCleaned === "done") return;

  STORAGE_KEYS_TO_CLEAR.forEach((key) => localStorage.removeItem(key));
  localStorage.setItem(PRIVACY_CLEAN_VERSION, "done");
}

cleanPersonalDataOnce();

const defaultFinanceData = {
  overview: {
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlySavings: 0,
  },
  debts: [],
};

const defaultGoals = [];
const defaultActivityHistory = [];
const defaultNotifications = [];
const defaultVictorySeenIds = [];
const defaultScheduledPayments = [];

const defaultSettings = {
  language: "FR",
  currency: "CAD",
  theme: "sombre",
  notifications: true,
  privacyMode: true,
  demoMode: false,
  showAmounts: false,
};

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function createLog(type, title, message) {
  return {
    id: Date.now() + Math.random(),
    type,
    title,
    message,
    createdAt: new Date().toISOString(),
    read: false,
  };
}

function hasRecentDate(value, maxDays) {
  if (!value) return false;

  const date = new Date(value);
  const now = new Date();

  if (Number.isNaN(date.getTime())) return false;

  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diffDays >= 0 && diffDays <= maxDays;
}

function isPaymentOverdue(payment) {
  if (!payment?.active || !payment?.nextDate) return false;

  const today = new Date();
  const dueDate = new Date(`${payment.nextDate}T12:00:00`);

  today.setHours(12, 0, 0, 0);

  if (Number.isNaN(dueDate.getTime())) return false;

  return dueDate.getTime() < today.getTime();
}

function getGoalRemaining(goal) {
  return Math.max(
    0,
    Number(goal?.targetAmount || 0) - Number(goal?.currentAmount || 0)
  );
}

function getPriorityDebt(debts) {
  return [...(Array.isArray(debts) ? debts : [])]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort((a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0))[0];
}

function estimateMonths(amount, monthlyAmount) {
  const total = Number(amount || 0);
  const monthly = Number(monthlyAmount || 0);

  if (total <= 0) return 0;
  if (monthly <= 0) return null;

  return Math.max(1, Math.ceil(total / monthly));
}

function formatMonthEstimate(months) {
  if (months === null) return "À définir";
  if (months <= 0) return "Atteint";
  if (months === 1) return "1 mois";
  if (months < 12) return `${months} mois`;

  const years = Math.floor(months / 12);
  const rest = months % 12;

  if (rest === 0) return `${years} an${years > 1 ? "s" : ""}`;
  return `${years} an${years > 1 ? "s" : ""} et ${rest} mois`;
}

function estimateInterestAvoided(debt, monthlyBoost) {
  const balance = Number(debt?.balance || 0);
  const rate = Number(debt?.interestRate || 0) / 100;
  const boost = Number(monthlyBoost || 0);

  if (balance <= 0 || rate <= 0 || boost <= 0) return 0;

  const monthlyRate = rate / 12;
  const roughMonthsSaved = Math.min(12, Math.max(1, Math.round(boost / 75)));
  const avoided = balance * monthlyRate * roughMonthsSaved * 0.55;

  return Math.max(0, Math.round(avoided));
}

function buildSmartAllocation({ financeData, selectedGoals }) {
  const overview = financeData?.overview || {};

  const monthlyIncome = Number(overview.monthlyIncome || 0);
  const monthlyExpenses = Number(overview.monthlyExpenses || 0);
  const monthlySavings = Number(overview.monthlySavings || 0);
  const monthlyAvailable = monthlyIncome - monthlyExpenses - monthlySavings;
  const availableAmount = Math.max(0, Math.round(monthlyAvailable));

  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];
  const goals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived && getGoalRemaining(goal) > 0)
    : [];

  const priorityDebt = getPriorityDebt(debts);
  const highlightedGoal = goals.find((goal) => goal.highlighted) || goals[0];

  const emergencyGoal =
    goals.find((goal) =>
      ["securite", "liberte", "epargne"].includes(goal.category)
    ) || null;

  const travelGoal = goals.find((goal) => goal.category === "voyage") || null;
  const houseGoal = goals.find((goal) => goal.category === "maison") || null;

  const allocations = [];

  function pushAllocation(label, amount, type, targetId, reason, color) {
    const rounded = Math.max(0, Math.round(amount || 0));
    if (rounded <= 0) return;

    allocations.push({
      id: `${type}-${targetId || label}`,
      label,
      amount: rounded,
      type,
      targetId: targetId || null,
      reason,
      color,
    });
  }

  if (availableAmount > 0) {
    let remaining = availableAmount;

    if (priorityDebt) {
      const share = Math.min(
        remaining,
        Math.max(50, Math.round(availableAmount * 0.6))
      );

      pushAllocation(
        priorityDebt.name || "Dette prioritaire",
        share,
        "debt",
        priorityDebt.id || priorityDebt.name,
        "Priorité au taux d’intérêt le plus élevé.",
        "var(--red)"
      );

      remaining -= share;
    }

    if (emergencyGoal && remaining > 0) {
      const share = Math.min(
        remaining,
        Math.max(25, Math.round(availableAmount * 0.2))
      );

      pushAllocation(
        emergencyGoal.title || "Fonds urgence",
        share,
        "goal",
        emergencyGoal.id,
        "Protéger la base avant d’accélérer.",
        "var(--green)"
      );

      remaining -= share;
    }

    if (highlightedGoal && remaining > 0) {
      const share = Math.min(
        remaining,
        Math.max(25, Math.round(availableAmount * 0.15))
      );

      pushAllocation(
        highlightedGoal.title,
        share,
        "goal",
        highlightedGoal.id,
        "Objectif principal à maintenir actif.",
        "var(--gold)"
      );

      remaining -= share;
    }

    const secondaryGoal =
      travelGoal?.id !== highlightedGoal?.id
        ? travelGoal
        : houseGoal?.id !== highlightedGoal?.id
          ? houseGoal
          : goals.find(
              (goal) =>
                goal.id !== highlightedGoal?.id &&
                goal.id !== emergencyGoal?.id
            );

    if (secondaryGoal && remaining > 0) {
      pushAllocation(
        secondaryGoal.title,
        remaining,
        "goal",
        secondaryGoal.id,
        "Avancer un projet secondaire sans disperser le plan.",
        "var(--blue)"
      );
      remaining = 0;
    }

    if (!priorityDebt && !highlightedGoal && !emergencyGoal && remaining > 0) {
      pushAllocation(
        "Marge à organiser",
        remaining,
        "available",
        null,
        "À diriger vers un objectif ou une épargne.",
        "var(--gold)"
      );
    }
  }

  const firstAllocation = allocations[0];
  const firstAmount = Number(firstAllocation?.amount || 0);

  const debtMonthsCurrent = priorityDebt
    ? estimateMonths(priorityDebt.balance, Math.max(1, monthlySavings))
    : null;

  const debtMonthsWithAllocation =
    priorityDebt && firstAmount > 0
      ? estimateMonths(
          priorityDebt.balance,
          Math.max(1, monthlySavings + firstAmount)
        )
      : debtMonthsCurrent;

  const monthsSaved =
    debtMonthsCurrent !== null && debtMonthsWithAllocation !== null
      ? Math.max(0, debtMonthsCurrent - debtMonthsWithAllocation)
      : 0;

  const interestAvoided =
    priorityDebt && firstAmount > 0
      ? estimateInterestAvoided(priorityDebt, firstAmount)
      : 0;

  const horizon = [];

  if (priorityDebt) {
    horizon.push({
      label: "Aujourd’hui",
      title: priorityDebt.name || "Dette prioritaire",
      text: "Réduire la dette au taux le plus élevé.",
      color: "var(--red)",
    });
  }

  if (emergencyGoal) {
    horizon.push({
      label: "Ensuite",
      title: emergencyGoal.title,
      text: "Construire une sécurité minimale.",
      color: "var(--green)",
    });
  }

  if (highlightedGoal) {
    horizon.push({
      label: horizon.length === 0 ? "Aujourd’hui" : "Puis",
      title: highlightedGoal.title,
      text: "Garder l’objectif principal actif.",
      color: "var(--gold)",
    });
  }

  if (travelGoal && travelGoal.id !== highlightedGoal?.id) {
    horizon.push({
      label: "Après",
      title: travelGoal.title,
      text: "Préparer le projet voyage.",
      color: "var(--blue)",
    });
  }

  if (houseGoal && houseGoal.id !== highlightedGoal?.id) {
    horizon.push({
      label: "Long terme",
      title: houseGoal.title,
      text: "Avancer le projet maison.",
      color: "var(--purple)",
    });
  }

  if (horizon.length === 0) {
    horizon.push({
      label: "Aujourd’hui",
      title: "Créer un objectif",
      text: "Ajoutez une destination pour activer la stratégie.",
      color: "var(--gold)",
    });
  }

  return {
    monthlyIncome,
    monthlyExpenses,
    monthlySavings,
    monthlyAvailable,
    availableAmount,
    hasAvailableAmount: availableAmount > 0,
    priorityDebt: priorityDebt || null,
    highlightedGoal: highlightedGoal || null,
    allocations,
    impact: {
      monthsSaved,
      monthsSavedLabel: monthsSaved > 0 ? `${monthsSaved} mois` : "À confirmer",
      interestAvoided,
      interestAvoidedLabel:
        interestAvoided > 0
          ? `${interestAvoided.toLocaleString("fr-CA")} $`
          : "À confirmer",
      currentDebtEstimate: formatMonthEstimate(debtMonthsCurrent),
      improvedDebtEstimate: formatMonthEstimate(debtMonthsWithAllocation),
    },
    horizon: horizon.slice(0, 5),
    recommendation:
      availableAmount > 0
        ? "Répartir la marge disponible selon la priorité actuelle."
        : "Commencer par retrouver une marge positive avant d’accélérer.",
  };
}

function useAppState() {
  const [financeData, setFinanceData] = useState(() =>
    readStorage("onjaramaFinanceData", defaultFinanceData)
  );

  const [selectedGoals, setSelectedGoals] = useState(() =>
    readStorage("onjaramaSelectedGoals", defaultGoals)
  );

  const [settings, setSettings] = useState(() =>
    readStorage("onjaramaSettings", defaultSettings)
  );

  const [activityHistory, setActivityHistory] = useState(() =>
    readStorage("onjaramaActivityHistory", defaultActivityHistory)
  );

  const [notifications, setNotifications] = useState(() =>
    readStorage("onjaramaNotifications", defaultNotifications)
  );

  const [victorySeenIds, setVictorySeenIds] = useState(() =>
    readStorage("onjaramaVictorySeenIds", defaultVictorySeenIds)
  );

  const [scheduledPayments, setScheduledPayments] = useState(() =>
    readStorage("onjaramaScheduledPayments", defaultScheduledPayments)
  );

  const achievedGoals = Array.isArray(selectedGoals)
    ? selectedGoals.filter(
        (goal) =>
          !goal.archived &&
          Number(goal.targetAmount || 0) > 0 &&
          Number(goal.currentAmount || 0) >= Number(goal.targetAmount || 0)
      )
    : [];

  const unseenVictories = achievedGoals.filter(
    (goal) => !victorySeenIds.includes(goal.id)
  );

  const disciplineScore = useMemo(() => {
    const activeGoals = Array.isArray(selectedGoals)
      ? selectedGoals.filter((goal) => !goal.archived)
      : [];

    const hasActiveGoal = activeGoals.length > 0;

    const hasRecentActivity =
      Array.isArray(activityHistory) &&
      activityHistory.some((item) => hasRecentDate(item.createdAt, 7));

    const hasRecentDeposit =
      Array.isArray(activityHistory) &&
      activityHistory.some(
        (item) => item.type === "depot" && hasRecentDate(item.createdAt, 14)
      );

    const hasOverduePayment =
      Array.isArray(scheduledPayments) &&
      scheduledPayments.some((payment) => isPaymentOverdue(payment));

    let score = 0;

    if (hasActiveGoal) score += 25;
    if (hasRecentActivity) score += 25;
    if (!hasOverduePayment) score += 25;
    if (hasRecentDeposit) score += 25;

    return {
      score,
      hasActiveGoal,
      hasRecentActivity,
      hasRecentDeposit,
      hasOverduePayment,
      label:
        score <= 25
          ? "Départ"
          : score <= 50
            ? "En progression"
            : score <= 75
              ? "Bon rythme"
              : "Excellent rythme",
    };
  }, [selectedGoals, activityHistory, scheduledPayments]);

  const smartAllocationEngine = useMemo(
    () =>
      buildSmartAllocation({
        financeData,
        selectedGoals,
      }),
    [financeData, selectedGoals]
  );

  useEffect(() => {
    localStorage.setItem("onjaramaFinanceData", JSON.stringify(financeData));
  }, [financeData]);

  useEffect(() => {
    localStorage.setItem("onjaramaSelectedGoals", JSON.stringify(selectedGoals));
  }, [selectedGoals]);

  useEffect(() => {
    localStorage.setItem("onjaramaSettings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(
      "onjaramaActivityHistory",
      JSON.stringify(activityHistory)
    );
  }, [activityHistory]);

  useEffect(() => {
    localStorage.setItem("onjaramaNotifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("onjaramaVictorySeenIds", JSON.stringify(victorySeenIds));
  }, [victorySeenIds]);

  useEffect(() => {
    localStorage.setItem(
      "onjaramaScheduledPayments",
      JSON.stringify(scheduledPayments)
    );
  }, [scheduledPayments]);

  function addActivity(type, title, message) {
    const log = createLog(type, title, message);

    setActivityHistory((current) => [log, ...current].slice(0, 80));

    if (settings.notifications) {
      setNotifications((current) => [log, ...current].slice(0, 40));
    }

    return log;
  }

  function markNotificationsRead() {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );
  }

  function clearNotifications() {
    setNotifications([]);
  }

  function clearActivityHistory() {
    setActivityHistory([]);
  }

  function markVictoriesSeen(goalIds) {
    if (!Array.isArray(goalIds) || goalIds.length === 0) return;

    setVictorySeenIds((current) => {
      const merged = [...new Set([...current, ...goalIds])];
      return merged.slice(-100);
    });
  }

  function resetFinanceOnly() {
    setFinanceData(defaultFinanceData);
    setScheduledPayments(defaultScheduledPayments);

    localStorage.removeItem("onjaramaSituationDetails");
    localStorage.removeItem("onjaramaScheduledPayments");
    localStorage.removeItem("onjaramaTransactions");

    addActivity(
      "finance",
      "Données financières réinitialisées",
      "La situation financière et les paiements programmés ont été remis à zéro."
    );
  }

  function resetGoalsOnly() {
    setSelectedGoals(defaultGoals);
    setVictorySeenIds(defaultVictorySeenIds);

    addActivity(
      "objectif",
      "Objectifs réinitialisés",
      "Tous les objectifs actifs ont été supprimés."
    );
  }

  function resetSettingsOnly() {
    setSettings(defaultSettings);

    addActivity(
      "reglages",
      "Réglages réinitialisés",
      "Les réglages OnJarama Path sont revenus à leur configuration par défaut."
    );
  }

  function resetAll() {
    STORAGE_KEYS_TO_CLEAR.forEach((key) => {
      localStorage.removeItem(key);
    });

    setFinanceData(defaultFinanceData);
    setSelectedGoals(defaultGoals);
    setSettings(defaultSettings);
    setActivityHistory(defaultActivityHistory);
    setNotifications(defaultNotifications);
    setVictorySeenIds(defaultVictorySeenIds);
    setScheduledPayments(defaultScheduledPayments);

    localStorage.setItem(PRIVACY_CLEAN_VERSION, "done");
    localStorage.setItem("onjaramaCurrentPage", "accueil");
  }

  return {
    financeData,
    setFinanceData,
    selectedGoals,
    setSelectedGoals,
    settings,
    setSettings,
    activityHistory,
    setActivityHistory,
    notifications,
    setNotifications,
    victorySeenIds,
    setVictorySeenIds,
    scheduledPayments,
    setScheduledPayments,
    achievedGoals,
    unseenVictories,
    disciplineScore,
    smartAllocationEngine,
    addActivity,
    markNotificationsRead,
    clearNotifications,
    clearActivityHistory,
    markVictoriesSeen,
    resetAll,
    resetFinanceOnly,
    resetGoalsOnly,
    resetSettingsOnly,
  };
}

export default useAppState;