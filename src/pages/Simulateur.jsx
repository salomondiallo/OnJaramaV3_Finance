import { useEffect, useMemo, useState } from "react";
import {
  Calculator,
  CheckCircle,
  Clock,
  CreditCard,
  Home,
  Plane,
  Route,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { cleanMoneyInput, formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    title: "Simuler un objectif",
    subtitle:
      "Calculez le coût, le temps et l’effort avant d’activer un objectif.",
    selectedGoal: "Objectif choisi",
    chooseFromGoals: "Choisir depuis Mes objectifs",
    amount: "Coût estimé",
    current: "Montant déjà disponible",
    monthly: "Contribution possible par mois",
    result: "Résultat de simulation",
    timeNeeded: "Temps estimé",
    months: "mois",
    ready: "Prêt à activer",
    activate: "Activer cet objectif",
    activated: "Objectif activé. Le parcours associé est prêt.",
    goPath: "Voir le parcours",
    scenario: "Scénarios de rythme",
    noGoal: "Aucun objectif choisi.",
    calm: "Tranquille",
    balanced: "Équilibré",
    dynamic: "Dynamique",
    fierce: "Féroce",
    pathPreview: "Parcours associé",
    projection: "Projection",
  },
  EN: {
    title: "Simulate a goal",
    subtitle: "Calculate cost, time and effort before activating a goal.",
    selectedGoal: "Selected goal",
    chooseFromGoals: "Choose from My goals",
    amount: "Estimated cost",
    current: "Amount already available",
    monthly: "Possible monthly contribution",
    result: "Simulation result",
    timeNeeded: "Estimated time",
    months: "months",
    ready: "Ready to activate",
    activate: "Activate this goal",
    activated: "Goal activated. The related path is ready.",
    goPath: "View path",
    scenario: "Rhythm scenarios",
    noGoal: "No goal selected.",
    calm: "Calm",
    balanced: "Balanced",
    dynamic: "Dynamic",
    fierce: "Fierce",
    pathPreview: "Related path",
    projection: "Projection",
  },
  ES: {
    title: "Simular un objetivo",
    subtitle: "Calcula costo, tiempo y esfuerzo antes de activar un objetivo.",
    selectedGoal: "Objetivo elegido",
    chooseFromGoals: "Elegir desde Mis objetivos",
    amount: "Costo estimado",
    current: "Monto ya disponible",
    monthly: "Contribución posible por mes",
    result: "Resultado de simulación",
    timeNeeded: "Tiempo estimado",
    months: "meses",
    ready: "Listo para activar",
    activate: "Activar este objetivo",
    activated: "Objetivo activado. El recorrido asociado está listo.",
    goPath: "Ver recorrido",
    scenario: "Escenarios de ritmo",
    noGoal: "Ningún objetivo elegido.",
    calm: "Tranquilo",
    balanced: "Equilibrado",
    dynamic: "Dinámico",
    fierce: "Feroz",
    pathPreview: "Recorrido asociado",
    projection: "Proyección",
  },
};

const fallbackGoal = {
  id: "voyage",
  title: "Voyage",
  subtitle: "Billet, séjour et marge de sécurité.",
  defaultAmount: 3500,
  defaultMonthly: 500,
};

function Simulateur({ selectedGoals, setSelectedGoals, setCurrentPage, settings, addActivity }) {
  const t = getText(settings);
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;
  const currency = settings?.currency || "CAD";
  const goals = Array.isArray(selectedGoals) ? selectedGoals : [];

  const [template, setTemplate] = useState(fallbackGoal);
  const [title, setTitle] = useState(fallbackGoal.title);
  const [targetAmount, setTargetAmount] = useState(String(fallbackGoal.defaultAmount));
  const [currentAmount, setCurrentAmount] = useState("0");
  const [monthlyContribution, setMonthlyContribution] = useState(
    String(fallbackGoal.defaultMonthly)
  );
  const [activatedGoalId, setActivatedGoalId] = useState(null);

  useEffect(() => {
    const rawTemplate = localStorage.getItem("onjaramaGoalToSimulate");
    const legacyGoalId = localStorage.getItem("onjaramaSimulatorGoalId");

    if (rawTemplate) {
      try {
        const parsed = JSON.parse(rawTemplate);
        const safe = { ...fallbackGoal, ...parsed };
        setTemplate(safe);
        setTitle(safe.title || fallbackGoal.title);
        setTargetAmount(String(safe.defaultAmount || fallbackGoal.defaultAmount));
        setMonthlyContribution(String(safe.defaultMonthly || fallbackGoal.defaultMonthly));
        setCurrentAmount("0");
        localStorage.removeItem("onjaramaGoalToSimulate");
        return;
      } catch {
        localStorage.removeItem("onjaramaGoalToSimulate");
      }
    }

    if (legacyGoalId) {
      const goal = goals.find((item) => String(item.id) === String(legacyGoalId));
      if (goal) {
        setTemplate({
          id: goal.category || "libre",
          title: goal.title,
          subtitle: goal.option || goal.categoryLabel || "Objectif existant",
          defaultAmount: Number(goal.targetAmount || 0),
          defaultMonthly: Number(goal.monthlyContribution || 0) || 250,
        });
        setTitle(goal.title || "Objectif");
        setTargetAmount(String(goal.targetAmount || 0));
        setCurrentAmount(String(goal.currentAmount || 0));
        setMonthlyContribution(String(goal.monthlyContribution || 250));
      }
      localStorage.removeItem("onjaramaSimulatorGoalId");
    }
  }, [goals]);

  const target = Number(targetAmount || 0);
  const current = Number(currentAmount || 0);
  const monthly = Number(monthlyContribution || 0);
  const remaining = Math.max(0, target - current);
  const monthsNeeded = monthly > 0 ? Math.ceil(remaining / monthly) : 0;
  const progress = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  const estimatedDate = useMemo(
    () => estimateDate(monthsNeeded, language),
    [monthsNeeded, language]
  );
  const pathSteps = useMemo(() => buildPathSteps(template.id, title), [template.id, title]);
  const scenarios = useMemo(
    () => [
      buildScenario(p.calm, monthly * 0.75, remaining, language),
      buildScenario(p.balanced, monthly, remaining, language),
      buildScenario(p.dynamic, monthly * 1.25, remaining, language),
      buildScenario(p.fierce, monthly * 1.5, remaining, language),
    ],
    [monthly, remaining, language, p]
  );

  function clean(value) {
    return cleanMoneyInput ? cleanMoneyInput(value) : value.replace(/[^\d.]/g, "");
  }

  function activateGoal() {
    if (target <= 0 || !title.trim()) return;

    const now = new Date().toISOString();
    const newGoal = {
      id: Date.now(),
      title: title.trim(),
      category: template.id || "libre",
      categoryLabel: template.title,
      option: template.subtitle,
      targetAmount: target,
      currentAmount: Math.min(current, target),
      targetDate: monthsNeeded > 0 ? getIsoTargetDate(monthsNeeded) : "",
      highlighted: goals.length === 0,
      archived: false,
      status: "active",
      source: "simulation_v12_2",
      createdAt: now,
      activatedAt: now,
      monthlyContribution: monthly,
      simulation: {
        targetAmount: target,
        currentAmount: current,
        monthlyContribution: monthly,
        remaining,
        monthsNeeded,
        estimatedDate,
        createdAt: now,
      },
      pathSteps,
    };

    setSelectedGoals?.([
      ...goals.map((goal) => ({
        ...goal,
        highlighted: goals.length === 0 ? false : goal.highlighted,
      })),
      newGoal,
    ]);

    setActivatedGoalId(newGoal.id);
    localStorage.setItem("onjaramaPathGoalId", String(newGoal.id));

    addActivity?.(
      "objectif",
      "Objectif activé",
      `${newGoal.title} est maintenant actif et relié au parcours.`
    );
  }

  function goPath() {
    if (activatedGoalId) {
      localStorage.setItem("onjaramaPathGoalId", String(activatedGoalId));
    }
    setCurrentPage?.("parcours");
  }

  return (
    <div className="native-page" style={page}>
      <h1>{t.simulateur || p.title}</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={selectedCard}>
        <div style={header}>
          <GoalIcon category={template.id} />
          <div>
            <p style={eyebrow}>{p.selectedGoal}</p>
            <h2>{title || p.noGoal}</h2>
            <p style={mutedSmall}>{template.subtitle}</p>
          </div>
        </div>

        <button onClick={() => setCurrentPage?.("objectifs")} style={ghostButton}>
          <Target size={17} />
          {p.chooseFromGoals}
        </button>
      </section>

      <section style={card}>
        <div style={header}>
          <Calculator color="var(--blue)" />
          <h2>{p.projection}</h2>
        </div>

        <label>Nom de l’objectif</label>
        <input value={title} onChange={(event) => setTitle(event.target.value)} style={input} />

        <label>{p.amount}</label>
        <input
          value={targetAmount}
          onChange={(event) => setTargetAmount(clean(event.target.value))}
          inputMode="decimal"
          style={input}
        />

        <label>{p.current}</label>
        <input
          value={currentAmount}
          onChange={(event) => setCurrentAmount(clean(event.target.value))}
          inputMode="decimal"
          style={input}
        />

        <label>{p.monthly}</label>
        <input
          value={monthlyContribution}
          onChange={(event) => setMonthlyContribution(clean(event.target.value))}
          inputMode="decimal"
          style={input}
        />
      </section>

      <section style={resultCard}>
        <div style={header}>
          <TrendingUp color="var(--green)" />
          <div>
            <p style={eyebrow}>{p.result}</p>
            <h2>{p.ready}</h2>
          </div>
        </div>

        <div style={resultGrid}>
          <Result label={p.amount} value={formatMoney(target, currency)} />
          <Result label="Reste" value={formatMoney(remaining, currency)} />
          <Result label={p.timeNeeded} value={`${monthsNeeded || "—"} ${p.months}`} />
          <Result label="Date" value={estimatedDate} />
        </div>

        <div style={progressBg}>
          <div style={{ ...progressFill, width: `${progress}%` }} />
        </div>

        {!activatedGoalId ? (
          <button onClick={activateGoal} style={activateButton}>
            <CheckCircle size={18} />
            {p.activate}
          </button>
        ) : (
          <div style={activatedBox}>
            <ShieldCheck color="var(--green)" />
            <strong>{p.activated}</strong>
            <button onClick={goPath} style={pathButton}>
              <Route size={17} />
              {p.goPath}
            </button>
          </div>
        )}
      </section>

      <section style={card}>
        <div style={header}>
          <Clock color="var(--gold)" />
          <h2>{p.scenario}</h2>
        </div>
        <div style={scenarioGrid}>
          {scenarios.map((scenario) => (
            <div key={scenario.label} style={{ ...scenarioCard, borderColor: scenario.color }}>
              <strong style={{ color: scenario.color }}>{scenario.label}</strong>
              <small style={mutedSmall}>{formatMoney(scenario.monthly, currency)} / mois</small>
              <small style={mutedSmall}>{scenario.months} {p.months}</small>
              <small style={mutedSmall}>{scenario.date}</small>
            </div>
          ))}
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <Route color="var(--gold)" />
          <h2>{p.pathPreview}</h2>
        </div>
        <div style={stepsList}>
          {pathSteps.map((step, index) => (
            <div key={step.id} style={stepLine}>
              <span style={stepNumber}>{index + 1}</span>
              <strong>{step.label}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function GoalIcon({ category }) {
  const props = { color: "var(--gold)" };
  if (category === "voyage") return <Plane {...props} />;
  if (category === "maison") return <Home color="var(--green)" />;
  if (category === "dette") return <CreditCard color="var(--red)" />;
  return <Target {...props} />;
}

function Result({ label, value }) {
  return (
    <div style={resultItem}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function buildScenario(label, monthly, remaining, language) {
  const safeMonthly = Math.max(0, Math.round(monthly || 0));
  const months = safeMonthly > 0 ? Math.ceil(Number(remaining || 0) / safeMonthly) : 0;
  const colors = {
    Tranquille: "var(--green)",
    Calm: "var(--green)",
    Tranquilo: "var(--green)",
    Équilibré: "var(--gold)",
    Balanced: "var(--gold)",
    Equilibrado: "var(--gold)",
    Dynamique: "var(--blue)",
    Dynamic: "var(--blue)",
    Dinámico: "var(--blue)",
    Féroce: "var(--red)",
    Fierce: "var(--red)",
    Feroz: "var(--red)",
  };

  return {
    label,
    monthly: safeMonthly,
    months,
    date: estimateDate(months, language),
    color: colors[label] || "var(--gold)",
  };
}

function estimateDate(months, language) {
  if (!months || months <= 0) return "À définir";
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  const locale = language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA";
  return date.toLocaleDateString(locale, { year: "numeric", month: "short" });
}

function getIsoTargetDate(months) {
  const date = new Date();
  date.setMonth(date.getMonth() + Number(months || 0));
  return date.toISOString().slice(0, 10);
}

function buildPathSteps(category, title) {
  if (category === "voyage") {
    return [
      { id: "passport", label: "Passeport / documents", done: false },
      { id: "ticket", label: "Billet", done: false },
      { id: "bags", label: "Bagages", done: false },
      { id: "stay", label: "Séjour et dépenses", done: false },
      { id: "security", label: "Marge de sécurité", done: false },
    ];
  }

  if (category === "maison") {
    return [
      { id: "plan", label: "Plan du projet", done: false },
      { id: "materials", label: "Matériaux", done: false },
      { id: "work", label: "Travaux", done: false },
      { id: "equipment", label: "Équipement", done: false },
      { id: "finish", label: "Finition", done: false },
    ];
  }

  if (category === "dette") {
    return [
      { id: "balance", label: "Solde confirmé", done: false },
      { id: "rate", label: "Taux identifié", done: false },
      { id: "payment", label: "Paiement mensuel fixé", done: false },
      { id: "threshold", label: "Premier palier atteint", done: false },
      { id: "zero", label: "Solde à zéro", done: false },
    ];
  }

  return [
    { id: "start", label: `${title || "Objectif"} défini`, done: false },
    { id: "plan", label: "Plan de financement", done: false },
    { id: "first", label: "Premier palier", done: false },
    { id: "mid", label: "Milieu du parcours", done: false },
    { id: "victory", label: "Objectif atteint", done: false },
  ];
}

const page = { display: "flex", flexDirection: "column", gap: "16px" };
const card = { background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "22px", padding: "18px" };
const selectedCard = { ...card, borderColor: "var(--gold)", background: "linear-gradient(135deg, rgba(212,175,55,.15), var(--bg-card))" };
const resultCard = { ...card, borderColor: "var(--green)", background: "linear-gradient(135deg, rgba(34,197,94,.14), var(--bg-card))" };
const header = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" };
const eyebrow = { color: "var(--gold)", fontSize: "12px", fontWeight: 900, margin: 0, textTransform: "uppercase" };
const input = { width: "100%", marginTop: "8px", marginBottom: "12px", padding: "14px", borderRadius: "14px", border: "1px solid var(--border)", background: "var(--bg-panel)", color: "var(--text-main)" };
const ghostButton = { width: "100%", padding: "12px", borderRadius: "14px", border: "1px solid var(--gold)", background: "rgba(212,175,55,.12)", color: "var(--gold)", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" };
const resultGrid = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "10px" };
const resultItem = { background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: "14px", padding: "12px", display: "grid", gap: "5px" };
const progressBg = { height: "10px", background: "var(--bg-panel)", borderRadius: "999px", overflow: "hidden", marginTop: "14px" };
const progressFill = { height: "100%", borderRadius: "999px", background: "var(--green)" };
const activateButton = { width: "100%", marginTop: "14px", padding: "14px", borderRadius: "14px", border: "none", background: "var(--green)", color: "white", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" };
const activatedBox = { marginTop: "14px", background: "rgba(34,197,94,.12)", border: "1px solid var(--green)", borderRadius: "16px", padding: "14px", display: "grid", gap: "12px" };
const pathButton = { width: "100%", padding: "12px", borderRadius: "14px", border: "1px solid var(--gold)", background: "rgba(212,175,55,.12)", color: "var(--gold)", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" };
const scenarioGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" };
const scenarioCard = { background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: "16px", padding: "12px", display: "grid", gap: "5px" };
const stepsList = { display: "grid", gap: "10px" };
const stepLine = { background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: "14px", padding: "12px", display: "flex", gap: "10px", alignItems: "center" };
const stepNumber = { width: "28px", height: "28px", borderRadius: "999px", border: "1px solid var(--gold)", color: "var(--gold)", display: "grid", placeItems: "center", fontWeight: 900 };
const muted = { color: "var(--text-muted)", marginTop: "8px" };
const mutedSmall = { color: "var(--text-muted)", fontSize: "13px", marginTop: "5px" };

export default Simulateur;
