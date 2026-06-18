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

  STORAGE_KEYS_TO_CLEAR.forEach((key) => {
    localStorage.removeItem(key);
  });

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