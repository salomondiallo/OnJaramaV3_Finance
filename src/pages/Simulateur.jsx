import { useEffect, useMemo, useState } from "react";
import {
  Banknote,
  Briefcase,
  Calculator,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
  GraduationCap,
  HeartHandshake,
  Home,
  PiggyBank,
  Plane,
  Route,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";

import { cleanMoneyInput, formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";
import { getObjectiveTemplate } from "../data/objectiveTemplates";
import {
  calculateFinancedAmount,
  calculateLoanPayment,
  calculateMortgage,
  estimateDebtPayoff,
} from "../utils/financingCalculator";

const pageText = {
  FR: {
    title: "Simuler un objectif",
    subtitle:
      "Chaque objectif adapte ses critères, son parcours, ses taux et ses recommandations.",
    selectedGoal: "Objectif choisi",
    chooseFromGoals: "Choisir depuis Mes objectifs",
    goalName: "Nom de l’objectif",
    targetAmount: "Montant principal",
    current: "Montant déjà disponible",
    monthly: "Contribution possible par mois",
    savingsTarget: "Montant visé d’épargne",
    savingsCurrent: "Montant déjà épargné",
    savingsMonthly: "Épargne possible par mois",
    projectTarget: "Budget visé du projet",
    projectCurrent: "Capital déjà disponible",
    projectMonthly: "Investissement possible par mois",
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
    remaining: "Reste",
    date: "Date cible estimée",
    existingGoal: "Objectif existant",
    goalFallback: "Objectif",
    activatedTitle: "Objectif activé",
    activatedMessage: "est maintenant actif et relié au parcours",
    criteriaTitle: "Critères adaptés",
    criteriaHint:
      "Les montants, les étapes, les taux et les conseils changent selon le type d’objectif.",
    advice: "Conseil OnJarama",
    acquisitionMode: "Mode d’acquisition",
    cash: "Comptant",
    financing: "Financement",
    mixed: "Mixte",
    interestRate: "Taux d’intérêt annuel (%)",
    loanTerm: "Durée du financement (mois)",
    downPayment: "Mise de fonds",
    financedAmount: "Montant financé",
    monthlyPayment: "Paiement mensuel estimé",
    totalInterest: "Intérêts estimés",
    realCost: "Coût réel estimé",
    mortgageYears: "Amortissement hypothécaire (années)",
    minimumPayment: "Paiement minimum",
    plannedPayment: "Paiement prévu",
    payoffTime: "Temps de remboursement",
    emergencyMonths: "Mois de dépenses à couvrir",
  },
  EN: {
    title: "Simulate a goal",
    subtitle:
      "Each goal adapts its criteria, path, rates and recommendations.",
    selectedGoal: "Selected goal",
    chooseFromGoals: "Choose from My goals",
    goalName: "Goal name",
    targetAmount: "Main amount",
    current: "Amount already available",
    monthly: "Possible monthly contribution",
    savingsTarget: "Savings target amount",
    savingsCurrent: "Amount already saved",
    savingsMonthly: "Possible monthly savings",
    projectTarget: "Target project budget",
    projectCurrent: "Capital already available",
    projectMonthly: "Possible monthly investment",
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
    remaining: "Remaining",
    date: "Estimated target date",
    existingGoal: "Existing goal",
    goalFallback: "Goal",
    activatedTitle: "Goal activated",
    activatedMessage: "is now active and linked to the path",
    criteriaTitle: "Adapted criteria",
    criteriaHint:
      "Amounts, steps, rates and advice change depending on the goal type.",
    advice: "OnJarama advice",
    acquisitionMode: "Acquisition mode",
    cash: "Cash",
    financing: "Financing",
    mixed: "Mixed",
    interestRate: "Annual interest rate (%)",
    loanTerm: "Financing term (months)",
    downPayment: "Down payment",
    financedAmount: "Financed amount",
    monthlyPayment: "Estimated monthly payment",
    totalInterest: "Estimated interest",
    realCost: "Estimated real cost",
    mortgageYears: "Mortgage amortization (years)",
    minimumPayment: "Minimum payment",
    plannedPayment: "Planned payment",
    payoffTime: "Payoff time",
    emergencyMonths: "Months of expenses to cover",
  },
  ES: {
    title: "Simular un objetivo",
    subtitle:
      "Cada objetivo adapta sus criterios, recorrido, tasas y recomendaciones.",
    selectedGoal: "Objetivo elegido",
    chooseFromGoals: "Elegir desde Mis objetivos",
    goalName: "Nombre del objetivo",
    targetAmount: "Monto principal",
    current: "Monto ya disponible",
    monthly: "Contribución posible por mes",
    savingsTarget: "Monto objetivo de ahorro",
    savingsCurrent: "Monto ya ahorrado",
    savingsMonthly: "Ahorro posible por mes",
    projectTarget: "Presupuesto objetivo del proyecto",
    projectCurrent: "Capital ya disponible",
    projectMonthly: "Inversión posible por mes",
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
    remaining: "Restante",
    date: "Fecha objetivo estimada",
    existingGoal: "Objetivo existente",
    goalFallback: "Objetivo",
    activatedTitle: "Objetivo activado",
    activatedMessage: "ahora está activo y vinculado al recorrido",
    criteriaTitle: "Criterios adaptados",
    criteriaHint:
      "Los montos, etapas, tasas y consejos cambian según el tipo de objetivo.",
    advice: "Consejo OnJarama",
    acquisitionMode: "Modo de adquisición",
    cash: "Contado",
    financing: "Financiamiento",
    mixed: "Mixto",
    interestRate: "Tasa anual (%)",
    loanTerm: "Duración del financiamiento (meses)",
    downPayment: "Pago inicial",
    financedAmount: "Monto financiado",
    monthlyPayment: "Pago mensual estimado",
    totalInterest: "Intereses estimados",
    realCost: "Costo real estimado",
    mortgageYears: "Amortización hipotecaria (años)",
    minimumPayment: "Pago mínimo",
    plannedPayment: "Pago previsto",
    payoffTime: "Tiempo de pago",
    emergencyMonths: "Meses de gastos a cubrir",
  },
};

const templateDetails = {
  voyage: {
    subtitle: {
      FR: "Billet, séjour, famille et marge de sécurité.",
      EN: "Ticket, stay, family and safety margin.",
      ES: "Boleto, estadía, familia y margen de seguridad.",
    },
    advice: {
      FR: "Séparez billet, séjour et marge de sécurité pour éviter les surprises.",
      EN: "Separate ticket, stay and safety margin to avoid surprises.",
      ES: "Separa boleto, estadía y margen para evitar sorpresas.",
    },
  },
  maison: {
    subtitle: {
      FR: "Construction, rénovation, terrain, finition ou projet solaire.",
      EN: "Construction, renovation, land, finishing or solar project.",
      ES: "Construcción, renovación, terreno, finalización o proyecto solar.",
    },
    advice: {
      FR: "Découpez la maison en phases : terrain, structure, toiture, énergie, finition.",
      EN: "Break the home project into phases: land, structure, roof, energy, finishing.",
      ES: "Divide la casa en fases: terreno, estructura, techo, energía y finalización.",
    },
  },
  auto: {
    subtitle: {
      FR: "Achat, réparation, remplacement, mise de fonds ou financement.",
      EN: "Purchase, repair, replacement, down payment or financing.",
      ES: "Compra, reparación, reemplazo, pago inicial o financiamiento.",
    },
    advice: {
      FR: "Ajoutez toujours taxes, assurance, inspection et intérêts au coût réel.",
      EN: "Always include taxes, insurance, inspection and interest in the real cost.",
      ES: "Incluye impuestos, seguro, inspección e intereses en el costo real.",
    },
  },
  dette: {
    subtitle: {
      FR: "Carte, prêt personnel, marge ou remboursement prioritaire.",
      EN: "Card, personal loan, credit line or priority repayment.",
      ES: "Tarjeta, préstamo, línea de crédito o pago prioritario.",
    },
    advice: {
      FR: "Priorisez le taux le plus élevé pour réduire le coût total plus vite.",
      EN: "Prioritize the highest rate to reduce total cost faster.",
      ES: "Prioriza la tasa más alta para reducir el costo total más rápido.",
    },
  },
  epargne: {
    subtitle: {
      FR: "Fonds d’urgence, sécurité ou réserve familiale.",
      EN: "Emergency fund, security or family reserve.",
      ES: "Fondo de emergencia, seguridad o reserva familiar.",
    },
    advice: {
      FR: "Visez d’abord 3 mois, puis 6 mois, puis 12 mois de dépenses.",
      EN: "Aim first for 3 months, then 6 months, then 12 months of expenses.",
      ES: "Apunta primero a 3 meses, luego 6 meses, luego 12 meses de gastos.",
    },
  },
  hypotheque: {
    subtitle: {
      FR: "Mise de fonds, taux, amortissement et paiement hypothécaire.",
      EN: "Down payment, rate, amortization and mortgage payment.",
      ES: "Pago inicial, tasa, amortización y pago hipotecario.",
    },
    advice: {
      FR: "Même un petit changement de taux peut changer fortement le coût réel.",
      EN: "Even a small rate change can strongly affect the real cost.",
      ES: "Un pequeño cambio de tasa puede afectar mucho el costo real.",
    },
  },
  etudes: {
    subtitle: {
      FR: "Formation, frais, matériel, livres et inscription.",
      EN: "Training, fees, equipment, books and registration.",
      ES: "Formación, costos, material, libros y inscripción.",
    },
    advice: {
      FR: "Incluez les frais cachés : matériel, transport, livres et marge.",
      EN: "Include hidden costs: equipment, transport, books and margin.",
      ES: "Incluye costos ocultos: material, transporte, libros y margen.",
    },
  },
  mariage: {
    subtitle: {
      FR: "Salle, invités, cérémonie, voyage et marge.",
      EN: "Venue, guests, ceremony, trip and margin.",
      ES: "Sala, invitados, ceremonia, viaje y margen.",
    },
    advice: {
      FR: "Fixez une limite claire par poste pour éviter que le budget explose.",
      EN: "Set a clear limit per category to avoid budget drift.",
      ES: "Define un límite claro por categoría para evitar excesos.",
    },
  },
  business: {
    subtitle: {
      FR: "Capital de départ, équipement, marketing et fonds de roulement.",
      EN: "Startup capital, equipment, marketing and operating fund.",
      ES: "Capital inicial, equipo, marketing y fondo operativo.",
    },
    advice: {
      FR: "Financez d’abord le minimum viable, puis augmentez par étapes.",
      EN: "Fund the minimum viable setup first, then grow step by step.",
      ES: "Financia primero lo mínimo viable y luego crece por etapas.",
    },
  },
};

function normalizeCategory(category) {
  if (category === "project" || category === "projet" || category === "business") {
    return "business";
  }
  if (category === "savings" || category === "ahorro" || category === "epargne") {
    return "epargne";
  }
  if (category === "family" || category === "familia" || category === "famille") {
    return "famille";
  }
  if (category === "car" || category === "auto") return "auto";
  if (category === "home" || category === "house" || category === "maison") return "maison";
  if (category === "travel" || category === "trip" || category === "voyage") return "voyage";
  if (category === "debt" || category === "dette") return "dette";
  if (category === "mortgage" || category === "hypotheque") return "hypotheque";
  if (category === "studies" || category === "etudes") return "etudes";
  if (category === "wedding" || category === "mariage") return "mariage";

  return category || "voyage";
}

function getTemplate(category, language) {
  const safeCategory = normalizeCategory(category);
  const base = getObjectiveTemplate(safeCategory, language);
  const details = templateDetails[safeCategory] || templateDetails.voyage;

  return {
    ...base,
    id: safeCategory,
    title: base.label,
    subtitle: details.subtitle?.[language] || details.subtitle?.FR || "",
    advice: details.advice?.[language] || details.advice?.FR || "",
  };
}

function getFieldLabels(category, p) {
  if (category === "epargne") {
    return {
      target: p.savingsTarget,
      current: p.savingsCurrent,
      monthly: p.savingsMonthly,
    };
  }

  if (category === "business") {
    return {
      target: p.projectTarget,
      current: p.projectCurrent,
      monthly: p.projectMonthly,
    };
  }

  return {
    target: p.targetAmount,
    current: p.current,
    monthly: p.monthly,
  };
}

function Simulateur({
  selectedGoals,
  setSelectedGoals,
  setCurrentPage,
  settings,
  addActivity,
}) {
  const t = getText(settings);
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;
  const currency = settings?.currency || "CAD";
  const goals = Array.isArray(selectedGoals) ? selectedGoals : [];

  const defaultTemplate = getTemplate("voyage", language);

  const [template, setTemplate] = useState(defaultTemplate);
  const [title, setTitle] = useState(defaultTemplate.title);
  const [targetAmount, setTargetAmount] = useState(String(defaultTemplate.defaultAmount));
  const [currentAmount, setCurrentAmount] = useState("0");
  const [monthlyContribution, setMonthlyContribution] = useState(String(defaultTemplate.defaultMonthly));
  const [activatedGoalId, setActivatedGoalId] = useState(null);

  const [acquisitionMode, setAcquisitionMode] = useState("cash");
  const [downPayment, setDownPayment] = useState("0");
  const [interestRate, setInterestRate] = useState("0");
  const [loanTermMonths, setLoanTermMonths] = useState("60");
  const [mortgageYears, setMortgageYears] = useState("25");
  const [minimumPayment, setMinimumPayment] = useState("0");
  const [emergencyMonths, setEmergencyMonths] = useState("3");

  const currentCategory = normalizeCategory(template.id);
  const currentTemplate = getTemplate(currentCategory, language);
  const fieldLabels = getFieldLabels(currentCategory, p);
  const hasFinancing = ["auto", "maison", "hypotheque", "dette"].includes(currentCategory);

  useEffect(() => {
    const rawTemplate = localStorage.getItem("onjaramaGoalToSimulate");
    const legacyGoalId = localStorage.getItem("onjaramaSimulatorGoalId");

    if (rawTemplate) {
      try {
        const parsed = JSON.parse(rawTemplate);
        const category = normalizeCategory(parsed.id || parsed.category);
        const nextTemplate = getTemplate(category, language);

        setTemplate(nextTemplate);
        setTitle(parsed.title || nextTemplate.title);
        setTargetAmount(String(parsed.defaultAmount || nextTemplate.defaultAmount));
        setMonthlyContribution(String(parsed.defaultMonthly || nextTemplate.defaultMonthly));
        setCurrentAmount("0");
        setDownPayment("0");
        setInterestRate(category === "dette" ? "19.99" : "0");
        setActivatedGoalId(null);
        localStorage.removeItem("onjaramaGoalToSimulate");
        return;
      } catch {
        localStorage.removeItem("onjaramaGoalToSimulate");
      }
    }

    if (legacyGoalId) {
      const goal = goals.find((item) => String(item.id) === String(legacyGoalId));

      if (goal) {
        const category = normalizeCategory(goal.category || "voyage");
        const nextTemplate = getTemplate(category, language);

        setTemplate(nextTemplate);
        setTitle(goal.title || p.goalFallback);
        setTargetAmount(String(goal.targetAmount || nextTemplate.defaultAmount));
        setCurrentAmount(String(goal.currentAmount || 0));
        setMonthlyContribution(String(goal.monthlyContribution || nextTemplate.defaultMonthly));
        setActivatedGoalId(null);
      }

      localStorage.removeItem("onjaramaSimulatorGoalId");
    }
  }, [goals, language, p.goalFallback]);

  const target = Number(targetAmount || 0);
  const current = Number(currentAmount || 0);
  const monthly = Number(monthlyContribution || 0);
  const down = Number(downPayment || 0);
  const rate = Number(interestRate || 0);
  const term = Number(loanTermMonths || 0);
  const mortgageTermYears = Number(mortgageYears || 25);
  const plannedDebtPayment = currentCategory === "dette" ? monthly : Number(minimumPayment || monthly || 0);

  const financedAmount = useMemo(() => {
    if (!hasFinancing) return 0;
    if (currentCategory === "dette") return target;
    return calculateFinancedAmount(target, down);
  }, [hasFinancing, currentCategory, target, down]);

  const loanResult = useMemo(() => {
    if (!hasFinancing) {
      return { monthlyPayment: 0, totalPaid: 0, totalInterest: 0 };
    }

    if (currentCategory === "hypotheque" || currentCategory === "maison") {
      return calculateMortgage({
        propertyPrice: target,
        downPayment: down,
        annualRate: rate,
        amortizationYears: mortgageTermYears,
      });
    }

    if (currentCategory === "dette") {
      return estimateDebtPayoff({
        balance: target,
        annualRate: rate,
        monthlyPayment: plannedDebtPayment,
      });
    }

    return calculateLoanPayment({
      principal: financedAmount,
      annualRate: rate,
      months: term,
    });
  }, [
    hasFinancing,
    currentCategory,
    target,
    down,
    rate,
    mortgageTermYears,
    plannedDebtPayment,
    financedAmount,
    term,
  ]);

  const realCost = useMemo(() => {
    if (!hasFinancing) return target;
    if (currentCategory === "dette") return loanResult.totalPaid || target;
    return target + Number(loanResult.totalInterest || 0);
  }, [hasFinancing, currentCategory, target, loanResult]);

  const remaining = Math.max(0, target - current);
  const monthsNeeded = monthly > 0 ? Math.ceil(remaining / monthly) : 0;
  const progress = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  const estimatedDate = useMemo(
    () => estimateDate(monthsNeeded, language),
    [monthsNeeded, language]
  );

  const pathSteps = useMemo(
    () => buildPathSteps(currentCategory, title, language),
    [currentCategory, title, language]
  );

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
      category: currentCategory,
      categoryLabel: currentTemplate.title,
      option: currentTemplate.subtitle,
      targetAmount: target,
      currentAmount: Math.min(current, target),
      targetDate: monthsNeeded > 0 ? getIsoTargetDate(monthsNeeded) : "",
      highlighted: goals.length === 0,
      archived: false,
      status: "active",
      source: "simulation_v15_5_1",
      createdAt: now,
      activatedAt: now,
      monthlyContribution: monthly,
      financing: {
        acquisitionMode,
        downPayment: down,
        interestRate: rate,
        loanTermMonths: term,
        mortgageYears: mortgageTermYears,
        financedAmount,
        monthlyPayment: loanResult.monthlyPayment || 0,
        totalInterest: loanResult.totalInterest || 0,
        totalPaid: loanResult.totalPaid || 0,
        realCost,
        minimumPayment: Number(minimumPayment || 0),
        plannedPayment: plannedDebtPayment,
        emergencyMonths: Number(emergencyMonths || 0),
      },
      simulation: {
        category: currentCategory,
        targetAmount: target,
        currentAmount: current,
        monthlyContribution: monthly,
        remaining,
        monthsNeeded,
        estimatedDate,
        realCost,
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
      p.activatedTitle,
      `${newGoal.title} ${p.activatedMessage}.`
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
          <GoalIcon category={currentCategory} />
          <div>
            <p style={eyebrow}>{p.selectedGoal}</p>
            <h2>{title || p.noGoal}</h2>
            <p style={mutedSmall}>{currentTemplate.subtitle}</p>
          </div>
        </div>

        <button onClick={() => setCurrentPage?.("objectifs")} style={ghostButton}>
          <Target size={17} />
          {p.chooseFromGoals}
        </button>
      </section>

      <section style={criteriaCard}>
        <div style={header}>
          <ShieldCheck color="var(--gold)" />
          <div>
            <h2>{p.criteriaTitle}</h2>
            <p style={mutedSmall}>{p.criteriaHint}</p>
          </div>
        </div>

        <p style={adviceBox}>
          <strong>{p.advice} : </strong>
          {currentTemplate.advice}
        </p>
      </section>

      <section style={card}>
        <div style={header}>
          <Calculator color="var(--blue)" />
          <h2>{p.projection}</h2>
        </div>

        <label>{p.goalName}</label>
        <input value={title} onChange={(event) => setTitle(event.target.value)} style={input} />

        <label>{fieldLabels.target}</label>
        <input
          value={targetAmount}
          onChange={(event) => setTargetAmount(clean(event.target.value))}
          inputMode="decimal"
          style={input}
        />

        <label>{fieldLabels.current}</label>
        <input
          value={currentAmount}
          onChange={(event) => setCurrentAmount(clean(event.target.value))}
          inputMode="decimal"
          style={input}
        />

        <label>{fieldLabels.monthly}</label>
        <input
          value={monthlyContribution}
          onChange={(event) => setMonthlyContribution(clean(event.target.value))}
          inputMode="decimal"
          style={input}
        />

        {currentCategory === "epargne" && (
          <>
            <label>{p.emergencyMonths}</label>
            <select
              value={emergencyMonths}
              onChange={(event) => setEmergencyMonths(event.target.value)}
              style={input}
            >
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="12">12</option>
            </select>
          </>
        )}
      </section>

      {hasFinancing && (
        <section style={financingCard}>
          <div style={header}>
            <Banknote color="var(--gold)" />
            <h2>{p.acquisitionMode}</h2>
          </div>

          {currentCategory !== "dette" && (
            <div style={modeGrid}>
              <button
                onClick={() => setAcquisitionMode("cash")}
                style={acquisitionMode === "cash" ? selectedModeButton : modeButton}
              >
                {p.cash}
              </button>
              <button
                onClick={() => setAcquisitionMode("financing")}
                style={acquisitionMode === "financing" ? selectedModeButton : modeButton}
              >
                {p.financing}
              </button>
              <button
                onClick={() => setAcquisitionMode("mixed")}
                style={acquisitionMode === "mixed" ? selectedModeButton : modeButton}
              >
                {p.mixed}
              </button>
            </div>
          )}

          {currentCategory !== "dette" && acquisitionMode !== "cash" && (
            <>
              <label>{p.downPayment}</label>
              <input
                value={downPayment}
                onChange={(event) => setDownPayment(clean(event.target.value))}
                inputMode="decimal"
                style={input}
              />
            </>
          )}

          <label>{p.interestRate}</label>
          <input
            value={interestRate}
            onChange={(event) => setInterestRate(clean(event.target.value))}
            inputMode="decimal"
            style={input}
          />

          {currentCategory === "dette" ? (
            <>
              <label>{p.minimumPayment}</label>
              <input
                value={minimumPayment}
                onChange={(event) => setMinimumPayment(clean(event.target.value))}
                inputMode="decimal"
                style={input}
              />

              <label>{p.plannedPayment}</label>
              <input
                value={monthlyContribution}
                onChange={(event) => setMonthlyContribution(clean(event.target.value))}
                inputMode="decimal"
                style={input}
              />
            </>
          ) : currentCategory === "maison" || currentCategory === "hypotheque" ? (
            <>
              <label>{p.mortgageYears}</label>
              <select
                value={mortgageYears}
                onChange={(event) => setMortgageYears(event.target.value)}
                style={input}
              >
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>
            </>
          ) : (
            <>
              <label>{p.loanTerm}</label>
              <select
                value={loanTermMonths}
                onChange={(event) => setLoanTermMonths(event.target.value)}
                style={input}
              >
                <option value="36">36</option>
                <option value="48">48</option>
                <option value="60">60</option>
                <option value="72">72</option>
                <option value="84">84</option>
              </select>
            </>
          )}

          <div style={resultGrid}>
            <Result label={p.financedAmount} value={formatMoney(financedAmount, currency)} />
            <Result
              label={currentCategory === "dette" ? p.payoffTime : p.monthlyPayment}
              value={
                currentCategory === "dette"
                  ? `${loanResult.months || "—"} ${p.months}`
                  : formatMoney(loanResult.monthlyPayment || 0, currency)
              }
            />
            <Result label={p.totalInterest} value={formatMoney(loanResult.totalInterest || 0, currency)} />
            <Result label={p.realCost} value={formatMoney(realCost || 0, currency)} />
          </div>
        </section>
      )}

      <section style={resultCard}>
        <div style={header}>
          <TrendingUp color="var(--green)" />
          <div>
            <p style={eyebrow}>{p.result}</p>
            <h2>{p.ready}</h2>
          </div>
        </div>

        <div style={resultGrid}>
          <Result label={fieldLabels.target} value={formatMoney(target, currency)} />
          <Result label={p.remaining} value={formatMoney(remaining, currency)} />
          <Result label={p.timeNeeded} value={`${monthsNeeded || "—"} ${p.months}`} />
          <Result label={p.date} value={estimatedDate} />
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
              <small style={mutedSmall}>
                {formatMoney(scenario.monthly, currency)} / {p.months}
              </small>
              <small style={mutedSmall}>
                {scenario.months} {p.months}
              </small>
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
  if (category === "voyage") return <Plane color="var(--gold)" />;
  if (category === "maison") return <Home color="var(--green)" />;
  if (category === "auto") return <Car color="var(--blue)" />;
  if (category === "dette") return <CreditCard color="var(--red)" />;
  if (category === "epargne") return <PiggyBank color="var(--green)" />;
  if (category === "famille") return <HeartHandshake color="var(--purple)" />;
  if (category === "business") return <Briefcase color="var(--blue)" />;
  if (category === "hypotheque") return <Home color="var(--gold)" />;
  if (category === "etudes") return <GraduationCap color="var(--blue)" />;
  return <Target color="var(--gold)" />;
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
  if (!months || months <= 0) {
    return language === "EN" ? "To define" : language === "ES" ? "Por definir" : "À définir";
  }

  const date = new Date();
  date.setMonth(date.getMonth() + months);

  const locale = language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA";

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
  });
}

function getIsoTargetDate(months) {
  const date = new Date();
  date.setMonth(date.getMonth() + Number(months || 0));
  return date.toISOString().slice(0, 10);
}

function buildPathSteps(category, title, language = "FR") {
  const template = getObjectiveTemplate(category, language);
  const ids = ["start", "second", "third", "fourth", "fifth", "victory"];

  return template.steps.map((label, index) => ({
    id: ids[index] || `step-${index + 1}`,
    label:
      category === "libre" && index === 0 && title
        ? `${title} ${label.toLowerCase()}`
        : label,
    done: false,
  }));
}

const page = { display: "flex", flexDirection: "column", gap: "16px" };

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "18px",
};

const selectedCard = {
  ...card,
  borderColor: "var(--gold)",
  background: "linear-gradient(135deg, rgba(212,175,55,.15), var(--bg-card))",
};

const criteriaCard = {
  ...card,
  borderColor: "var(--gold)",
  background:
    "linear-gradient(135deg, rgba(212,175,55,.12), rgba(56,189,248,.06), var(--bg-card))",
};

const financingCard = {
  ...card,
  borderColor: "var(--gold)",
  background:
    "linear-gradient(135deg, rgba(212,175,55,.13), rgba(239,68,68,.05), var(--bg-card))",
};

const resultCard = {
  ...card,
  borderColor: "var(--green)",
  background: "linear-gradient(135deg, rgba(34,197,94,.14), var(--bg-card))",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "14px",
};

const eyebrow = {
  color: "var(--gold)",
  fontSize: "12px",
  fontWeight: 900,
  margin: 0,
  textTransform: "uppercase",
};

const adviceBox = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  color: "var(--text-main)",
  marginTop: "8px",
};

const input = {
  width: "100%",
  marginTop: "8px",
  marginBottom: "12px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
};

const ghostButton = {
  width: "100%",
  padding: "12px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  fontWeight: 900,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const modeGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "8px",
  marginBottom: "12px",
};

const modeButton = {
  padding: "11px",
  borderRadius: "14px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
  fontWeight: 900,
};

const selectedModeButton = {
  ...modeButton,
  borderColor: "var(--gold)",
  background: "rgba(212,175,55,.13)",
  color: "var(--gold)",
};

const resultGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "10px",
};

const resultItem = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  display: "grid",
  gap: "5px",
};

const progressBg = {
  height: "10px",
  background: "var(--bg-panel)",
  borderRadius: "999px",
  overflow: "hidden",
  marginTop: "14px",
};

const progressFill = {
  height: "100%",
  borderRadius: "999px",
  background: "var(--green)",
};

const activateButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: 900,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const activatedBox = {
  marginTop: "14px",
  background: "rgba(34,197,94,.12)",
  border: "1px solid var(--green)",
  borderRadius: "16px",
  padding: "14px",
  display: "grid",
  gap: "12px",
};

const pathButton = {
  width: "100%",
  padding: "12px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  fontWeight: 900,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const scenarioGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
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

const stepsList = {
  display: "grid",
  gap: "10px",
};

const stepLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const stepNumber = {
  width: "28px",
  height: "28px",
  borderRadius: "999px",
  border: "1px solid var(--gold)",
  color: "var(--gold)",
  display: "grid",
  placeItems: "center",
  fontWeight: 900,
  flex: "0 0 auto",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "5px",
};

export default Simulateur;