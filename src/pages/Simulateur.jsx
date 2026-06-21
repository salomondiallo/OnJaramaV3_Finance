import { useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  Calculator,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
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

const pageText = {
  FR: {
    title: "Simuler un objectif",
    subtitle:
      "Chaque objectif adapte maintenant ses critères, son parcours et ses recommandations.",
    selectedGoal: "Objectif choisi",
    chooseFromGoals: "Choisir depuis Mes objectifs",
    goalName: "Nom de l’objectif",
    amount: "Montant cible",
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
    remaining: "Reste",
    date: "Date cible estimée",
    existingGoal: "Objectif existant",
    goalFallback: "Objectif",
    activatedTitle: "Objectif activé",
    activatedMessage: "est maintenant actif et relié au parcours",
    criteriaTitle: "Critères adaptés",
    criteriaHint:
      "Les montants, les étapes et les conseils changent selon le type d’objectif choisi.",
    advice: "Conseil OnJarama",
  },
  EN: {
    title: "Simulate a goal",
    subtitle:
      "Each goal now adapts its criteria, path and recommendations.",
    selectedGoal: "Selected goal",
    chooseFromGoals: "Choose from My goals",
    goalName: "Goal name",
    amount: "Target amount",
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
    remaining: "Remaining",
    date: "Estimated target date",
    existingGoal: "Existing goal",
    goalFallback: "Goal",
    activatedTitle: "Goal activated",
    activatedMessage: "is now active and linked to the path",
    criteriaTitle: "Adapted criteria",
    criteriaHint:
      "Amounts, steps and advice change depending on the selected goal type.",
    advice: "OnJarama advice",
  },
  ES: {
    title: "Simular un objetivo",
    subtitle:
      "Cada objetivo ahora adapta sus criterios, recorrido y recomendaciones.",
    selectedGoal: "Objetivo elegido",
    chooseFromGoals: "Elegir desde Mis objetivos",
    goalName: "Nombre del objetivo",
    amount: "Monto objetivo",
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
    remaining: "Restante",
    date: "Fecha objetivo estimada",
    existingGoal: "Objetivo existente",
    goalFallback: "Objetivo",
    activatedTitle: "Objetivo activado",
    activatedMessage: "ahora está activo y vinculado al recorrido",
    criteriaTitle: "Criterios adaptados",
    criteriaHint:
      "Los montos, etapas y consejos cambian según el tipo de objetivo elegido.",
    advice: "Consejo OnJarama",
  },
};

function getCategoryConfig(language = "FR") {
  const configs = {
    FR: {
      voyage: {
        title: "Voyage",
        subtitle: "Billet, séjour, famille et marge de sécurité.",
        amountLabel: "Budget voyage total",
        currentLabel: "Montant déjà mis de côté",
        monthlyLabel: "Montant possible par mois",
        defaultAmount: 3500,
        defaultMonthly: 500,
        advice:
          "Séparez billet, séjour et marge de sécurité pour éviter les surprises avant le départ.",
        steps: [
          "Documents / passeport",
          "Billet estimé",
          "Bagages et achats nécessaires",
          "Budget séjour",
          "Marge de sécurité",
        ],
      },
      maison: {
        title: "Maison",
        subtitle: "Construction, rénovation, terrain ou projet solaire.",
        amountLabel: "Budget maison ou travaux",
        currentLabel: "Montant déjà disponible",
        monthlyLabel: "Contribution possible par mois",
        defaultAmount: 10000,
        defaultMonthly: 700,
        advice:
          "Découpez le projet en phases : sécurité, matériaux, travaux, équipement, finition.",
        steps: ["Plan du projet", "Matériaux", "Main-d’œuvre", "Équipement", "Finition"],
      },
      auto: {
        title: "Auto",
        subtitle: "Achat, réparation, remplacement ou mise de fonds.",
        amountLabel: "Budget auto",
        currentLabel: "Mise de fonds déjà disponible",
        monthlyLabel: "Montant possible par mois",
        defaultAmount: 8000,
        defaultMonthly: 450,
        advice:
          "Incluez toujours taxes, inspection, assurance et imprévus dans le budget auto.",
        steps: ["Budget total", "Inspection / recherche", "Mise de fonds", "Assurance", "Achat ou réparation"],
      },
      dette: {
        title: "Dette",
        subtitle: "Carte, prêt personnel, marge ou remboursement prioritaire.",
        amountLabel: "Solde à rembourser",
        currentLabel: "Montant déjà remboursé",
        monthlyLabel: "Paiement mensuel possible",
        defaultAmount: 5000,
        defaultMonthly: 500,
        advice:
          "Priorisez la dette au taux le plus élevé pour réduire le coût total plus vite.",
        steps: [
          "Solde confirmé",
          "Taux identifié",
          "Paiement mensuel fixé",
          "Premier palier atteint",
          "Solde à zéro",
        ],
      },
      epargne: {
        title: "Épargne",
        subtitle: "Fonds d’urgence, sécurité ou réserve familiale.",
        amountLabel: "Objectif d’épargne",
        currentLabel: "Épargne déjà disponible",
        monthlyLabel: "Épargne possible par mois",
        defaultAmount: 3000,
        defaultMonthly: 250,
        advice:
          "Commencez par un coussin simple, puis augmentez le rythme quand il devient stable.",
        steps: [
          "Compte ou enveloppe séparée",
          "Premier dépôt",
          "25 % atteint",
          "75 % atteint",
          "Coussin complété",
        ],
      },
      famille: {
        title: "Famille",
        subtitle: "Soutien, événement, école ou besoin important.",
        amountLabel: "Budget familial",
        currentLabel: "Montant déjà préparé",
        monthlyLabel: "Contribution possible par mois",
        defaultAmount: 2500,
        defaultMonthly: 300,
        advice:
          "Gardez une marge pour les imprévus familiaux et évitez de mélanger ce budget au courant.",
        steps: ["Besoin défini", "Budget confirmé", "Premier palier", "Préparation", "Objectif réalisé"],
      },
      business: {
        title: "Projet personnel",
        subtitle: "Formation, lancement, matériel, commerce ou projet libre.",
        amountLabel: "Budget du projet",
        currentLabel: "Capital déjà disponible",
        monthlyLabel: "Investissement possible par mois",
        defaultAmount: 4000,
        defaultMonthly: 350,
        advice:
          "Validez d’abord le minimum nécessaire, puis financez le projet par étapes.",
        steps: [
          "Idée clarifiée",
          "Budget minimum validé",
          "Matériel ou formation",
          "Premier lancement",
          "Projet opérationnel",
        ],
      },
      libre: {
        title: "Objectif libre",
        subtitle: "Un objectif totalement personnalisé.",
        amountLabel: "Montant cible",
        currentLabel: "Montant déjà disponible",
        monthlyLabel: "Contribution possible par mois",
        defaultAmount: 1000,
        defaultMonthly: 150,
        advice:
          "Définissez un montant clair, une date réaliste et un premier palier simple.",
        steps: ["Objectif défini", "Plan de financement", "Premier palier", "Milieu du parcours", "Objectif atteint"],
      },
    },
    EN: {
      voyage: {
        title: "Travel",
        subtitle: "Ticket, stay, family and safety margin.",
        amountLabel: "Total travel budget",
        currentLabel: "Amount already saved",
        monthlyLabel: "Possible monthly amount",
        defaultAmount: 3500,
        defaultMonthly: 500,
        advice:
          "Separate ticket, stay and safety margin to avoid surprises before departure.",
        steps: ["Documents / passport", "Estimated ticket", "Bags and essentials", "Stay budget", "Safety margin"],
      },
      maison: {
        title: "Home",
        subtitle: "Construction, renovation, land or solar project.",
        amountLabel: "Home or work budget",
        currentLabel: "Amount already available",
        monthlyLabel: "Possible monthly contribution",
        defaultAmount: 10000,
        defaultMonthly: 700,
        advice:
          "Break the project into phases: safety, materials, work, equipment and finishing.",
        steps: ["Project plan", "Materials", "Labor", "Equipment", "Finishing"],
      },
      auto: {
        title: "Car",
        subtitle: "Purchase, repair, replacement or down payment.",
        amountLabel: "Car budget",
        currentLabel: "Down payment already available",
        monthlyLabel: "Possible monthly amount",
        defaultAmount: 8000,
        defaultMonthly: 450,
        advice:
          "Always include taxes, inspection, insurance and surprises in the car budget.",
        steps: ["Total budget", "Inspection / search", "Down payment", "Insurance", "Purchase or repair"],
      },
      dette: {
        title: "Debt",
        subtitle: "Card, personal loan, credit line or priority repayment.",
        amountLabel: "Balance to repay",
        currentLabel: "Amount already repaid",
        monthlyLabel: "Possible monthly payment",
        defaultAmount: 5000,
        defaultMonthly: 500,
        advice:
          "Prioritize the highest-rate debt to reduce the total cost faster.",
        steps: ["Balance confirmed", "Rate identified", "Monthly payment set", "First milestone reached", "Zero balance"],
      },
      epargne: {
        title: "Savings",
        subtitle: "Emergency fund, security or family reserve.",
        amountLabel: "Savings target",
        currentLabel: "Savings already available",
        monthlyLabel: "Possible monthly savings",
        defaultAmount: 3000,
        defaultMonthly: 250,
        advice:
          "Start with a simple cushion, then increase the rhythm once it feels stable.",
        steps: ["Separate account or envelope", "First deposit", "25% reached", "75% reached", "Cushion completed"],
      },
      famille: {
        title: "Family",
        subtitle: "Support, event, school or important need.",
        amountLabel: "Family budget",
        currentLabel: "Amount already prepared",
        monthlyLabel: "Possible monthly contribution",
        defaultAmount: 2500,
        defaultMonthly: 300,
        advice:
          "Keep a margin for family surprises and avoid mixing this budget with daily spending.",
        steps: ["Need defined", "Budget confirmed", "First milestone", "Preparation", "Goal achieved"],
      },
      business: {
        title: "Personal project",
        subtitle: "Training, launch, equipment, business or open project.",
        amountLabel: "Project budget",
        currentLabel: "Capital already available",
        monthlyLabel: "Possible monthly investment",
        defaultAmount: 4000,
        defaultMonthly: 350,
        advice:
          "Validate the minimum needed first, then fund the project step by step.",
        steps: ["Idea clarified", "Minimum budget validated", "Equipment or training", "First launch", "Project operating"],
      },
      libre: {
        title: "Custom goal",
        subtitle: "A fully personalized goal.",
        amountLabel: "Target amount",
        currentLabel: "Amount already available",
        monthlyLabel: "Possible monthly contribution",
        defaultAmount: 1000,
        defaultMonthly: 150,
        advice:
          "Define a clear amount, a realistic date and a simple first milestone.",
        steps: ["Goal defined", "Funding plan", "First milestone", "Mid-path", "Goal reached"],
      },
    },
    ES: {
      voyage: {
        title: "Viaje",
        subtitle: "Boleto, estadía, familia y margen de seguridad.",
        amountLabel: "Presupuesto total del viaje",
        currentLabel: "Monto ya ahorrado",
        monthlyLabel: "Monto posible por mes",
        defaultAmount: 3500,
        defaultMonthly: 500,
        advice:
          "Separa boleto, estadía y margen de seguridad para evitar sorpresas antes de salir.",
        steps: ["Documentos / pasaporte", "Boleto estimado", "Equipaje y compras", "Presupuesto de estadía", "Margen de seguridad"],
      },
      maison: {
        title: "Casa",
        subtitle: "Construcción, renovación, terreno o proyecto solar.",
        amountLabel: "Presupuesto de casa o trabajos",
        currentLabel: "Monto ya disponible",
        monthlyLabel: "Contribución posible por mes",
        defaultAmount: 10000,
        defaultMonthly: 700,
        advice:
          "Divide el proyecto en fases: seguridad, materiales, trabajos, equipo y finalización.",
        steps: ["Plan del proyecto", "Materiales", "Mano de obra", "Equipamiento", "Finalización"],
      },
      auto: {
        title: "Auto",
        subtitle: "Compra, reparación, reemplazo o pago inicial.",
        amountLabel: "Presupuesto auto",
        currentLabel: "Pago inicial ya disponible",
        monthlyLabel: "Monto posible por mes",
        defaultAmount: 8000,
        defaultMonthly: 450,
        advice:
          "Incluye siempre impuestos, inspección, seguro e imprevistos en el presupuesto auto.",
        steps: ["Presupuesto total", "Inspección / búsqueda", "Pago inicial", "Seguro", "Compra o reparación"],
      },
      dette: {
        title: "Deuda",
        subtitle: "Tarjeta, préstamo personal, línea de crédito o pago prioritario.",
        amountLabel: "Saldo a pagar",
        currentLabel: "Monto ya pagado",
        monthlyLabel: "Pago mensual posible",
        defaultAmount: 5000,
        defaultMonthly: 500,
        advice:
          "Prioriza la deuda con la tasa más alta para reducir el costo total más rápido.",
        steps: ["Saldo confirmado", "Tasa identificada", "Pago mensual fijado", "Primer hito alcanzado", "Saldo en cero"],
      },
      epargne: {
        title: "Ahorro",
        subtitle: "Fondo de emergencia, seguridad o reserva familiar.",
        amountLabel: "Objetivo de ahorro",
        currentLabel: "Ahorro ya disponible",
        monthlyLabel: "Ahorro posible por mes",
        defaultAmount: 3000,
        defaultMonthly: 250,
        advice:
          "Comienza con un colchón simple y aumenta el ritmo cuando sea estable.",
        steps: ["Cuenta o sobre separado", "Primer depósito", "25% alcanzado", "75% alcanzado", "Colchón completado"],
      },
      famille: {
        title: "Familia",
        subtitle: "Apoyo, evento, escuela o necesidad importante.",
        amountLabel: "Presupuesto familiar",
        currentLabel: "Monto ya preparado",
        monthlyLabel: "Contribución posible por mes",
        defaultAmount: 2500,
        defaultMonthly: 300,
        advice:
          "Guarda un margen para imprevistos familiares y evita mezclar este presupuesto con gastos diarios.",
        steps: ["Necesidad definida", "Presupuesto confirmado", "Primer hito", "Preparación", "Objetivo realizado"],
      },
      business: {
        title: "Proyecto personal",
        subtitle: "Formación, lanzamiento, material, comercio o proyecto libre.",
        amountLabel: "Presupuesto del proyecto",
        currentLabel: "Capital ya disponible",
        monthlyLabel: "Inversión posible por mes",
        defaultAmount: 4000,
        defaultMonthly: 350,
        advice:
          "Valida primero el mínimo necesario y financia el proyecto por etapas.",
        steps: ["Idea aclarada", "Presupuesto mínimo validado", "Material o formación", "Primer lanzamiento", "Proyecto operativo"],
      },
      libre: {
        title: "Objetivo libre",
        subtitle: "Un objetivo totalmente personalizado.",
        amountLabel: "Monto objetivo",
        currentLabel: "Monto ya disponible",
        monthlyLabel: "Contribución posible por mes",
        defaultAmount: 1000,
        defaultMonthly: 150,
        advice:
          "Define un monto claro, una fecha realista y un primer hito simple.",
        steps: ["Objetivo definido", "Plan de financiación", "Primer hito", "Mitad del recorrido", "Objetivo alcanzado"],
      },
    },
  };

  return configs[language] || configs.FR;
}

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

  return category || "libre";
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
  const categoryConfig = getCategoryConfig(language);

  const defaultTemplate = {
    id: "voyage",
    ...categoryConfig.voyage,
  };

  const [template, setTemplate] = useState(defaultTemplate);
  const [title, setTitle] = useState(defaultTemplate.title);
  const [targetAmount, setTargetAmount] = useState(
    String(defaultTemplate.defaultAmount)
  );
  const [currentAmount, setCurrentAmount] = useState("0");
  const [monthlyContribution, setMonthlyContribution] = useState(
    String(defaultTemplate.defaultMonthly)
  );
  const [activatedGoalId, setActivatedGoalId] = useState(null);

  const currentCategory = normalizeCategory(template.id);
  const currentConfig = categoryConfig[currentCategory] || categoryConfig.libre;

  useEffect(() => {
    const rawTemplate = localStorage.getItem("onjaramaGoalToSimulate");
    const legacyGoalId = localStorage.getItem("onjaramaSimulatorGoalId");

    if (rawTemplate) {
      try {
        const parsed = JSON.parse(rawTemplate);
        const category = normalizeCategory(parsed.id || parsed.category);
        const config = categoryConfig[category] || categoryConfig.libre;
        const safe = {
          id: category,
          ...config,
          ...parsed,
          title: parsed.title || config.title,
          subtitle: parsed.subtitle || config.subtitle,
          defaultAmount: Number(parsed.defaultAmount || config.defaultAmount),
          defaultMonthly: Number(parsed.defaultMonthly || config.defaultMonthly),
        };

        setTemplate(safe);
        setTitle(safe.title || config.title);
        setTargetAmount(String(safe.defaultAmount || config.defaultAmount));
        setMonthlyContribution(String(safe.defaultMonthly || config.defaultMonthly));
        setCurrentAmount("0");
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
        const category = normalizeCategory(goal.category || "libre");
        const config = categoryConfig[category] || categoryConfig.libre;

        setTemplate({
          id: category,
          ...config,
          title: goal.categoryLabel || config.title,
          subtitle: goal.option || config.subtitle || p.existingGoal,
          defaultAmount: Number(goal.targetAmount || config.defaultAmount),
          defaultMonthly:
            Number(goal.monthlyContribution || 0) || config.defaultMonthly,
        });
        setTitle(goal.title || p.goalFallback);
        setTargetAmount(String(goal.targetAmount || config.defaultAmount));
        setCurrentAmount(String(goal.currentAmount || 0));
        setMonthlyContribution(
          String(goal.monthlyContribution || config.defaultMonthly)
        );
        setActivatedGoalId(null);
      }

      localStorage.removeItem("onjaramaSimulatorGoalId");
    }
  }, [goals, language]);

  const target = Number(targetAmount || 0);
  const current = Number(currentAmount || 0);
  const monthly = Number(monthlyContribution || 0);
  const remaining = Math.max(0, target - current);
  const monthsNeeded = monthly > 0 ? Math.ceil(remaining / monthly) : 0;
  const progress =
    target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

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
      categoryLabel: currentConfig.title,
      option: currentConfig.subtitle,
      targetAmount: target,
      currentAmount: Math.min(current, target),
      targetDate: monthsNeeded > 0 ? getIsoTargetDate(monthsNeeded) : "",
      highlighted: goals.length === 0,
      archived: false,
      status: "active",
      source: "simulation_v15_1",
      createdAt: now,
      activatedAt: now,
      monthlyContribution: monthly,
      simulation: {
        category: currentCategory,
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
            <p style={mutedSmall}>{currentConfig.subtitle}</p>
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
          {currentConfig.advice}
        </p>
      </section>

      <section style={card}>
        <div style={header}>
          <Calculator color="var(--blue)" />
          <h2>{p.projection}</h2>
        </div>

        <label>{p.goalName}</label>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          style={input}
        />

        <label>{currentConfig.amountLabel}</label>
        <input
          value={targetAmount}
          onChange={(event) => setTargetAmount(clean(event.target.value))}
          inputMode="decimal"
          style={input}
        />

        <label>{currentConfig.currentLabel}</label>
        <input
          value={currentAmount}
          onChange={(event) => setCurrentAmount(clean(event.target.value))}
          inputMode="decimal"
          style={input}
        />

        <label>{currentConfig.monthlyLabel}</label>
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
          <Result label={currentConfig.amountLabel} value={formatMoney(target, currency)} />
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
            <div
              key={scenario.label}
              style={{ ...scenarioCard, borderColor: scenario.color }}
            >
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
  const months =
    safeMonthly > 0 ? Math.ceil(Number(remaining || 0) / safeMonthly) : 0;

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
    return language === "EN"
      ? "To define"
      : language === "ES"
        ? "Por definir"
        : "À définir";
  }

  const date = new Date();
  date.setMonth(date.getMonth() + months);

  const locale =
    language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA";

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
  const config = getCategoryConfig(language)[category] || getCategoryConfig(language).libre;

  const ids = ["start", "second", "third", "fourth", "victory"];

  return config.steps.map((label, index) => ({
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
