import {
  Calculator,
  Car,
  ChevronRight,
  CreditCard,
  Home,
  PiggyBank,
  Plane,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function Simulateur({
  financeData,
  selectedGoals,
  setSelectedGoals,
  setCurrentPage,
  settings,
}) {
  const goals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived)
    : [];
  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];
  const currency = settings?.currency || "CAD";

  const [monthlyAmount, setMonthlyAmount] = useState("500");
  const [years, setYears] = useState("1");
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    const storedGoalId = localStorage.getItem("onjaramaSimulatorGoalId");
    if (!storedGoalId) return;

    const goal = goals.find((item) => String(item.id) === String(storedGoalId));
    if (!goal) return;

    const remaining = getGoalRemaining(goal);
    const monthlyHint =
      Number(goal.monthlyContribution || 0) ||
      estimateMonthlyNeed(goal) ||
      Math.max(50, Math.ceil(remaining / 12));

    setSelectedGoalId(goal.id);
    setMonthlyAmount(String(monthlyHint));
    setYears("1");
    localStorage.removeItem("onjaramaSimulatorGoalId");
  }, [goals]);

  const selectedGoal = goals.find(
    (goal) => String(goal.id) === String(selectedGoalId)
  );

  const monthly = Number(monthlyAmount || 0);
  const durationYears = Number(years || 0);
  const months = Math.max(1, durationYears * 12);
  const totalSaved = monthly * months;

  const debtTotal = debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const debtReduction = Math.min(totalSaved, debtTotal);
  const selectedRemaining = selectedGoal ? getGoalRemaining(selectedGoal) : 0;
  const selectedCoverage =
    selectedGoal && selectedRemaining > 0
      ? Math.min(100, Math.round((totalSaved / selectedRemaining) * 100))
      : 0;

  const scenarios = useMemo(() => {
    if (!selectedGoal) return [];
    const remaining = getGoalRemaining(selectedGoal);
    return [
      buildScenario("Tranquille", monthly * 0.75, remaining),
      buildScenario("Équilibré", monthly, remaining),
      buildScenario("Dynamique", monthly * 1.25, remaining),
      buildScenario("Féroce", monthly * 1.5, remaining),
    ];
  }, [selectedGoal, monthly]);

  const goalOptions = [
    {
      id: "maison",
      title: "Maison",
      subtitle: "Préparer achat, construction ou rénovation",
      icon: <Home />,
      color: "var(--green)",
    },
    {
      id: "voyage",
      title: "Voyage",
      subtitle: "Préparer un voyage ou un retour au pays",
      icon: <Plane />,
      color: "var(--blue)",
    },
    {
      id: "dette",
      title: "Dette",
      subtitle: "Neutraliser une dette ou un crédit",
      icon: <CreditCard />,
      color: "var(--red)",
    },
    {
      id: "auto",
      title: "Voiture",
      subtitle: "Financer un véhicule ou une réparation",
      icon: <Car />,
      color: "var(--gold)",
    },
    {
      id: "liberte",
      title: "Fonds d’urgence",
      subtitle: "Sécuriser vos imprévus",
      icon: <ShieldCheck />,
      color: "var(--purple)",
    },
    {
      id: "personnalise",
      title: "Objectif libre",
      subtitle: "Créer un objectif personnalisé",
      icon: <Target />,
      color: "var(--gold)",
    },
  ];

  function cleanInput(value) {
    return value.replace(/[^\d]/g, "");
  }

  function money(value) {
    return Number(value || 0).toLocaleString("fr-CA", {
      maximumFractionDigits: 0,
    });
  }

  function selectGoal(goal) {
    const remaining = getGoalRemaining(goal);
    const monthlyHint =
      Number(goal.monthlyContribution || 0) ||
      estimateMonthlyNeed(goal) ||
      Math.max(50, Math.ceil(remaining / 12));

    setSelectedGoalId(goal.id);
    setMonthlyAmount(String(monthlyHint));
    setYears("1");
    setShowGoalPicker(false);
  }

  function saveSimulationToGoal() {
    if (!selectedGoal || totalSaved <= 0) return;

    setSelectedGoals(
      selectedGoals.map((goal) => {
        if (goal.id !== selectedGoal.id) {
          return { ...goal, highlighted: false };
        }

        return {
          ...goal,
          highlighted: true,
          monthlyContribution: monthly,
          simulation: {
            monthlyAmount: monthly,
            years: durationYears,
            months,
            totalSaved,
            coverage: selectedCoverage,
            estimatedEnd: selectedRemaining > 0 ? estimateCompletionDate(selectedRemaining, monthly) : "Atteint",
            createdAt: new Date().toISOString(),
          },
        };
      })
    );

    setConfirmMessage(`Simulation enregistrée pour ${selectedGoal.title}.`);

    window.setTimeout(() => {
      setConfirmMessage("");
    }, 2200);
  }

  function addSimulationToGoal(option) {
    if (totalSaved <= 0) return;

    const shouldHighlight = selectedGoals.length === 0;

    const updatedGoals = selectedGoals.map((goal) => ({
      ...goal,
      highlighted: shouldHighlight ? false : goal.highlighted,
    }));

    const newGoal = {
      id: Date.now(),
      title: option.title,
      category: option.id,
      option: `Simulation : ${money(monthly)} $ / mois pendant ${durationYears} an${durationYears > 1 ? "s" : ""}`,
      targetAmount: totalSaved,
      currentAmount: 0,
      targetDate: "",
      highlighted: shouldHighlight,
      archived: false,
      source: "simulateur",
      monthlyAmount: monthly,
      monthlyContribution: monthly,
      years: durationYears,
      createdAt: new Date().toISOString(),
    };

    setSelectedGoals([...updatedGoals, newGoal]);
    setSelectedGoalId(newGoal.id);
    setShowGoalPicker(false);
    setConfirmMessage(`${option.title} ajouté à vos objectifs.`);

    window.setTimeout(() => {
      setConfirmMessage("");
    }, 2200);
  }

  return (
    <div className="native-page">
      <h1>Simulateur</h1>

      <p style={muted}>
        Testez plusieurs chemins avant de valider votre plan de match.
      </p>

      {selectedGoal && (
        <section style={selectedGoalCard}>
          <div style={header}>
            <Target color="var(--gold)" />
            <div>
              <p style={eyebrow}>Objectif en simulation</p>
              <h2>{selectedGoal.title}</h2>
              <p style={muted}>
                Reste : {money(selectedRemaining)} {currency}
              </p>
            </div>
          </div>

          <div style={miniBarBg}>
            <div
              style={{
                ...miniBarFill,
                width: `${getGoalProgress(selectedGoal)}%`,
                background: "var(--green)",
              }}
            />
          </div>

          <button onClick={() => setShowGoalPicker(true)} style={ghostButton}>
            <RefreshCw size={17} />
            Changer d’objectif
          </button>
        </section>
      )}

      {!selectedGoal && (
        <button onClick={() => setShowGoalPicker(true)} style={addToGoalBtn}>
          <span style={{ color: "var(--gold)" }}>
            <Target />
          </span>

          <div>
            <strong>Choisir un objectif à simuler</strong>
            <small>Objectifs et Simulateur travaillent ensemble.</small>
          </div>

          <ChevronRight />
        </button>
      )}

      <section style={miniIntro}>
        <Mini icon={<Target />} title="Destination" color="var(--green)" />
        <Mini icon={<Calculator />} title="Scénarios" color="var(--blue)" />
        <Mini icon={<ShieldCheck />} title="Plan de match" color="var(--purple)" />
      </section>

      <section style={card}>
        <div style={header}>
          <Calculator color="var(--blue)" />
          <h2>{selectedGoal ? "Simulation de l’objectif" : "Simulation libre"}</h2>
        </div>

        <label>Contribution mensuelle</label>

        <div style={inputWrap}>
          <input
            value={monthlyAmount}
            onChange={(event) => setMonthlyAmount(cleanInput(event.target.value))}
            style={input}
            inputMode="numeric"
          />
          <span style={suffix}>$</span>
        </div>

        <label>Durée de simulation</label>

        <div style={inputWrap}>
          <input
            value={years}
            onChange={(event) => setYears(cleanInput(event.target.value))}
            style={input}
            inputMode="numeric"
          />
          <span style={suffix}>an{durationYears > 1 ? "s" : ""}</span>
        </div>

        <div style={result}>
          <p style={muted}>Capital projeté</p>

          <h1 style={{ color: "var(--green)" }}>
            {money(totalSaved)} $
          </h1>
        </div>

        {selectedGoal && (
          <>
            <Info
              label="Couverture de l’objectif"
              value={`${selectedCoverage}%`}
              color={selectedCoverage >= 100 ? "var(--green)" : "var(--gold)"}
            />
            <Info
              label="Date estimée"
              value={estimateCompletionDate(selectedRemaining, monthly)}
              color="var(--blue)"
            />

            <button onClick={saveSimulationToGoal} style={saveButton}>
              Enregistrer dans le Plan de Match
            </button>
          </>
        )}
      </section>

      {confirmMessage && (
        <section style={confirmBox} className="action-confirm">
          <ShieldCheck color="var(--green)" />
          <strong>{confirmMessage}</strong>
        </section>
      )}

      {selectedGoal && (
        <section style={card}>
          <div style={header}>
            <TrendingUp color="var(--green)" />
            <h2>Comparaison des rythmes</h2>
          </div>

          <div style={scenarioGrid}>
            {scenarios.map((scenario) => (
              <div key={scenario.label} style={{ ...scenarioCard, borderColor: scenario.color }}>
                <strong style={{ color: scenario.color }}>{scenario.label}</strong>
                <small style={muted}>Contribution : {money(scenario.monthly)} $ / mois</small>
                <small style={muted}>Fin estimée : {scenario.end}</small>
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={card}>
        <div style={header}>
          <TrendingUp color="var(--green)" />
          <h2>Projection générale</h2>
        </div>

        <Info label="Épargne totale" value={`${money(totalSaved)} $`} />
        <Info label="Dette actuelle" value={`${money(debtTotal)} $`} />
        <Info
          label="Dette pouvant être remboursée"
          value={`${money(debtReduction)} $`}
        />
      </section>

      <section style={goalCard}>
        <Target color="var(--gold)" />
        <h2>Lecture OnJarama</h2>

        <p style={muted}>
          {selectedGoal
            ? `Avec ${money(monthly)} $ par mois, ${selectedGoal.title} devient un objectif mesurable et comparable.`
            : `Avec ${money(monthly)} $ par mois pendant ${durationYears} an${durationYears > 1 ? "s" : ""}, vous pourriez accumuler environ ${money(totalSaved)} ${currency}.`}
        </p>

        <button onClick={() => setCurrentPage("monplan")} style={planButton}>
          Voir le Plan de Match
        </button>
      </section>

      <button onClick={() => setShowGoalPicker(true)} style={addToGoalBtn}>
        <span style={{ color: "var(--gold)" }}>
          <Target />
        </span>

        <div>
          <strong>Ajouter ou choisir un objectif</strong>
          <small>Transformer cette simulation en destination concrète.</small>
        </div>

        <ChevronRight />
      </button>

      {showGoalPicker && (
        <div style={modalOverlay}>
          <section style={modal}>
            <button
              onClick={() => setShowGoalPicker(false)}
              style={closeBtn}
              aria-label="Fermer"
            >
              <X />
            </button>

            <h2>Choisir un objectif</h2>

            {goals.length > 0 && (
              <>
                <p style={muted}>Objectifs existants</p>
                <div style={goalList}>
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => selectGoal(goal)}
                      style={goalOption}
                    >
                      <span style={{ ...goalIcon, color: "var(--gold)" }}>
                        <Target />
                      </span>

                      <div>
                        <strong>{goal.title}</strong>
                        <small>{money(getGoalRemaining(goal))} $ restants</small>
                      </div>

                      <ChevronRight size={20} />
                    </button>
                  ))}
                </div>
              </>
            )}

            <p style={muted}>Créer depuis la simulation</p>

            <div style={goalList}>
              {goalOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => addSimulationToGoal(option)}
                  style={goalOption}
                >
                  <span style={{ ...goalIcon, color: option.color }}>
                    {option.icon}
                  </span>

                  <div>
                    <strong>{option.title}</strong>
                    <small>{option.subtitle}</small>
                  </div>

                  <ChevronRight size={20} />
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setShowGoalPicker(false);
                setCurrentPage("objectifs");
              }}
              style={viewGoalsBtn}
            >
              Configurer dans Objectifs
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

function Info({ label, value, color = "var(--text-main)" }) {
  return (
    <div style={row}>
      <span style={muted}>{label}</span>
      <strong style={{ color }}>{value}</strong>
    </div>
  );
}

function Mini({ icon, title, color }) {
  return (
    <div style={miniItem}>
      <span style={{ color }}>{icon}</span>
      <strong>{title}</strong>
    </div>
  );
}

function getGoalRemaining(goal) {
  return Math.max(
    0,
    Number(goal?.targetAmount || 0) - Number(goal?.currentAmount || 0)
  );
}

function getGoalProgress(goal) {
  const target = Number(goal?.targetAmount || 0);
  if (target <= 0) return 0;

  return Math.min(
    100,
    Math.round((Number(goal?.currentAmount || 0) / target) * 100)
  );
}

function estimateMonthlyNeed(goal) {
  const remaining = getGoalRemaining(goal);
  if (remaining <= 0) return 0;

  if (!goal.targetDate) return 0;

  const months = monthsUntil(goal.targetDate);
  if (months <= 0) return remaining;

  return Math.ceil(remaining / months);
}

function monthsUntil(dateValue) {
  const target = new Date(dateValue);
  if (Number.isNaN(target.getTime())) return 0;

  const now = new Date();
  const years = target.getFullYear() - now.getFullYear();
  const months = target.getMonth() - now.getMonth();

  return Math.max(1, years * 12 + months + 1);
}

function estimateCompletionDate(remaining, monthly) {
  const amount = Number(remaining || 0);
  const payment = Number(monthly || 0);

  if (amount <= 0) return "Atteint";
  if (payment <= 0) return "À définir";

  const months = Math.ceil(amount / payment);
  const date = new Date();
  date.setMonth(date.getMonth() + months);

  return date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "short",
  });
}

function buildScenario(label, monthly, remaining) {
  const rounded = Math.max(0, Math.round(monthly || 0));
  const colors = {
    Tranquille: "var(--green)",
    Équilibré: "var(--gold)",
    Dynamique: "var(--blue)",
    Féroce: "var(--red)",
  };

  return {
    label,
    monthly: rounded,
    end: estimateCompletionDate(remaining, rounded),
    color: colors[label] || "var(--gold)",
  };
}

const miniIntro = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px",
  marginTop: "18px",
};

const miniItem = {
  display: "grid",
  gap: "8px",
  fontSize: "13px",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const selectedGoalCard = {
  background:
    "linear-gradient(135deg, rgba(212,175,55,.18), rgba(56,189,248,.08), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "14px",
};

const goalCard = {
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

const eyebrow = {
  margin: 0,
  color: "var(--gold)",
  fontSize: "12px",
  fontWeight: "900",
  textTransform: "uppercase",
};

const inputWrap = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  borderRadius: "14px",
  paddingRight: "14px",
  marginTop: "8px",
  marginBottom: "14px",
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "transparent",
  color: "var(--text-main)",
  outline: "none",
};

const suffix = {
  color: "var(--text-main)",
  fontWeight: "bold",
};

const result = {
  marginTop: "10px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  padding: "12px 0",
  borderBottom: "1px solid rgba(255,255,255,.08)",
};

const addToGoalBtn = {
  width: "100%",
  background: "var(--bg-card)",
  border: "1px solid var(--gold)",
  borderRadius: "18px",
  color: "var(--text-main)",
  padding: "16px",
  marginTop: "16px",
  display: "grid",
  gridTemplateColumns: "32px 1fr auto",
  gap: "12px",
  alignItems: "center",
  textAlign: "left",
};

const saveButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "900",
};

const planButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.14)",
  color: "var(--gold)",
  fontWeight: "900",
};

const ghostButton = {
  width: "100%",
  marginTop: "12px",
  padding: "12px",
  borderRadius: "14px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const confirmBox = {
  background: "rgba(34,197,94,.14)",
  border: "1px solid var(--green)",
  borderRadius: "16px",
  padding: "14px",
  marginTop: "14px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const scenarioGrid = {
  display: "grid",
  gap: "10px",
};

const scenarioCard = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "5px",
};

const miniBarBg = {
  height: "10px",
  background: "var(--bg-panel)",
  borderRadius: "999px",
  overflow: "hidden",
};

const miniBarFill = {
  height: "100%",
  borderRadius: "999px",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.55)",
  zIndex: 2000,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
};

const modal = {
  width: "100%",
  maxWidth: "540px",
  maxHeight: "88dvh",
  overflowY: "auto",
  background: "var(--bg-main)",
  borderTop: "1px solid var(--border)",
  borderRadius: "28px 28px 0 0",
  padding: "24px",
  position: "relative",
};

const closeBtn = {
  position: "absolute",
  top: "18px",
  right: "18px",
  width: "42px",
  height: "42px",
  borderRadius: "999px",
  border: "1px solid var(--border)",
  background: "var(--bg-card)",
  color: "var(--text-main)",
  display: "grid",
  placeItems: "center",
};

const goalList = {
  display: "grid",
  gap: "10px",
  marginTop: "12px",
};

const goalOption = {
  width: "100%",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  color: "var(--text-main)",
  padding: "14px",
  display: "grid",
  gridTemplateColumns: "42px 1fr auto",
  gap: "12px",
  alignItems: "center",
  textAlign: "left",
};

const goalIcon = {
  display: "grid",
  placeItems: "center",
};

const viewGoalsBtn = {
  width: "100%",
  marginTop: "18px",
  padding: "14px",
  borderRadius: "16px",
  border: "1px solid var(--blue)",
  background: "rgba(56,189,248,.12)",
  color: "var(--blue)",
  fontWeight: "bold",
};

const muted = {
  color: "var(--text-muted)",
};

export default Simulateur;
