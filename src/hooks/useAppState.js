import { useEffect, useState } from "react";

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

const defaultSettings = {
  language: "FR",
  currency: "CAD",
  theme: "sombre",
  notifications: true,
  privacyMode: true,
  demoMode: false,
  showAmounts: false,
};

const defaultActivityHistory = [];

const defaultNotifications = [];

const defaultVictorySeenIds = [];

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
    localStorage.setItem(
      "onjaramaNotifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      "onjaramaVictorySeenIds",
      JSON.stringify(victorySeenIds)
    );
  }, [victorySeenIds]);

  function addActivity(type, title, message) {
    const log = createLog(type, title, message);

    setActivityHistory((current) => [log, ...current].slice(0, 60));

    if (settings.notifications) {
      setNotifications((current) => [log, ...current].slice(0, 30));
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
    localStorage.removeItem("onjaramaSituationDetails");
    localStorage.removeItem("onjaramaScheduledPayments");
    localStorage.removeItem("onjaramaTransactions");

    addActivity(
      "finance",
      "Données financières réinitialisées",
      "La situation financière a été remise à zéro."
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
    achievedGoals,
    unseenVictories,
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