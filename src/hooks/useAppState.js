import { useEffect, useState } from "react";

const PRIVACY_CLEAN_VERSION = "OJ_PATH_PRIVACY_CLEAN_V1_1";

const STORAGE_KEYS_TO_CLEAR = [
  "onjaramaFinanceData",
  "onjaramaSelectedGoals",
  "onjaramaSettings",
  "onjaramaSituationDetails",
  "onjaramaScheduledPayments",
  "onjaramaTransactions",
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

const defaultSettings = {
  language: "FR",
  currency: "CAD",
  theme: "sombre",
  notifications: true,

  privacyMode: true,
  demoMode: true,
  showAmounts: false,
  autoHideAmounts: true,
  autoHideDelay: 30,

  tileSize: "compact",
  viewMode: "grid",

  homeCards: {
    debt: true,
    savings: false,
    income: false,
    goals: true,
    advice: true,
    path: false,
  },

  shortcuts: {
    payment: true,
    debt: true,
    goal: true,
    protection: true,
    advice: true,
    project: false,
    travel: false,
    house: false,
    ai: false,
    budget: false,
    savings: false,
  },

  security: {
    pinEnabled: false,
    biometricEnabled: false,
    twoFactorEnabled: false,
    requireUnlock: false,
  },
};

function mergeDefaults(saved, defaults) {
  if (!saved || typeof saved !== "object") return defaults;

  const merged = { ...defaults, ...saved };

  Object.keys(defaults).forEach((key) => {
    if (
      defaults[key] &&
      typeof defaults[key] === "object" &&
      !Array.isArray(defaults[key])
    ) {
      merged[key] = {
        ...defaults[key],
        ...(saved[key] || {}),
      };
    }
  });

  return merged;
}

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? mergeDefaults(JSON.parse(saved), fallback) : fallback;
  } catch {
    return fallback;
  }
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

  useEffect(() => {
    localStorage.setItem("onjaramaFinanceData", JSON.stringify(financeData));
  }, [financeData]);

  useEffect(() => {
    localStorage.setItem("onjaramaSelectedGoals", JSON.stringify(selectedGoals));
  }, [selectedGoals]);

  useEffect(() => {
    localStorage.setItem("onjaramaSettings", JSON.stringify(settings));
  }, [settings]);

  function resetFinanceOnly() {
    setFinanceData(defaultFinanceData);
    localStorage.removeItem("onjaramaSituationDetails");
    localStorage.removeItem("onjaramaScheduledPayments");
    localStorage.removeItem("onjaramaTransactions");
  }

  function resetGoalsOnly() {
    setSelectedGoals(defaultGoals);
  }

  function resetSettingsOnly() {
    setSettings(defaultSettings);
  }

  function resetAll() {
    STORAGE_KEYS_TO_CLEAR.forEach((key) => localStorage.removeItem(key));

    setFinanceData(defaultFinanceData);
    setSelectedGoals(defaultGoals);
    setSettings(defaultSettings);

    localStorage.setItem(PRIVACY_CLEAN_VERSION, "done");
  }

  return {
    financeData,
    setFinanceData,
    selectedGoals,
    setSelectedGoals,
    settings,
    setSettings,
    resetAll,
    resetFinanceOnly,
    resetGoalsOnly,
    resetSettingsOnly,
  };
}

export default useAppState;