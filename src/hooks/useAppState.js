import { useEffect, useState } from "react";
import { defaultFinanceData } from "../data/defaultFinanceData";

const defaultSettings = {
  theme: "sombre",
  language: "FR",
  currency: "CAD",
  notifications: true,
};

const emptyFinanceData = {
  overview: {
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlySavings: 0,
  },
  debts: [],
};

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeSettings(settings) {
  const normalized = {
    ...defaultSettings,
    ...settings,
  };

  if (normalized.theme === "doux") {
    normalized.theme = "clair";
  }

  if (!["sombre", "clair"].includes(normalized.theme)) {
    normalized.theme = "sombre";
  }

  return normalized;
}

function normalizeFinanceData(data) {
  return {
    overview: {
      monthlyIncome: Number(data?.overview?.monthlyIncome || 0),
      monthlyExpenses: Number(data?.overview?.monthlyExpenses || 0),
      monthlySavings: Number(data?.overview?.monthlySavings || 0),
    },
    debts: Array.isArray(data?.debts)
      ? data.debts.map((debt) => ({
          name: debt.name || "Dette",
          type: debt.type || "Autre",
          balance: Number(debt.balance || 0),
          interestRate: Number(debt.interestRate || 0),
          minimumPayment: Number(debt.minimumPayment || 0),
        }))
      : [],
  };
}

function useAppState() {
  const [financeData, setFinanceData] = useState(() => {
    const saved = localStorage.getItem("onjaramaFinanceData");

    if (saved) {
      return normalizeFinanceData(safeParse(saved, emptyFinanceData));
    }

    return normalizeFinanceData(defaultFinanceData || emptyFinanceData);
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("onjaramaSettings");
    return normalizeSettings(safeParse(saved, defaultSettings));
  });

  const [selectedGoals, setSelectedGoals] = useState(() => {
    const saved = localStorage.getItem("onjaramaSelectedGoals");
    return safeParse(saved, []);
  });

  useEffect(() => {
    localStorage.setItem(
      "onjaramaFinanceData",
      JSON.stringify(normalizeFinanceData(financeData))
    );
  }, [financeData]);

  useEffect(() => {
    localStorage.setItem(
      "onjaramaSettings",
      JSON.stringify(normalizeSettings(settings))
    );
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("onjaramaSelectedGoals", JSON.stringify(selectedGoals));
  }, [selectedGoals]);

  function resetAll() {
    setFinanceData(emptyFinanceData);
    setSettings(defaultSettings);
    setSelectedGoals([]);

    localStorage.removeItem("onjaramaFinanceData");
    localStorage.removeItem("onjaramaSettings");
    localStorage.removeItem("onjaramaSelectedGoals");
    localStorage.removeItem("onjaramaCurrentPage");
    localStorage.removeItem("onjaramaBottomNav");
  }

  function resetFinanceOnly() {
    setFinanceData(emptyFinanceData);
    localStorage.removeItem("onjaramaFinanceData");
  }

  function resetSettingsOnly() {
    setSettings(defaultSettings);
    localStorage.removeItem("onjaramaSettings");
  }

  function resetGoalsOnly() {
    setSelectedGoals([]);
    localStorage.removeItem("onjaramaSelectedGoals");
  }

  return {
    financeData,
    setFinanceData,
    settings,
    setSettings,
    selectedGoals,
    setSelectedGoals,
    resetAll,
    resetFinanceOnly,
    resetSettingsOnly,
    resetGoalsOnly,
  };
}

export default useAppState;