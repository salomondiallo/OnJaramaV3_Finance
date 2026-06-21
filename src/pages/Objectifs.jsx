import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Car,
  ChevronRight,
  CreditCard,
  HeartHandshake,
  Home,
  Layers,
  TrendingUp,
  Wallet,
  CalendarClock,
  Calculator,
  PiggyBank,
  Plane,
  Plus,
  Route,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { cleanMoneyInput, formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";
import GoalPremiumDashboard from "../components/GoalPremiumDashboard";
import GoalPremiumCard from "../components/GoalPremiumCard";

const pageText = {
  FR: {
    subtitle: "Choisissez une catégorie, puis une sous-catégorie intelligente.",
    smartCategories: "Catégories intelligentes",
    chooseSubcategory: "Choisir une sous-catégorie",
    configure: "Configurer",
    backToGoals: "Retour aux objectifs",
    backToCategories: "Retour aux catégories",
    activeGoals: "Mes objectifs actifs",
    noGoal: "Aucun objectif actif pour le moment.",
    createGoal: "Créer l’objectif",
    mainGoal: "Objectif principal",
    setMain: "Mettre en avant",
    progress: "Progression",
    remainingToGet: "Reste à obtenir",
    details: "Détails",
    targetAmount: "Montant cible",
    currentAmount: "Montant disponible",
    targetDate: "Date cible",
    quickAnalysis: "Analyse rapide",
    remaining: "Reste",
    delete: "Supprimer",
    simulateLater: "Simulation détaillée bientôt disponible",
    achieved: "Objectif atteint",
    congratulations: "Félicitations, tu avances vraiment.",
    almostThere: "🔥 Presque atteint",
    startedToday: "Commencé aujourd’hui",
    startedAgo: "Commencé il y a",
    lastDeposit: "Dernier dépôt",
    smartJourney: "Smart Journey",
    journeyHint:
      "Chaque objectif est maintenant connecté à votre parcours global.",
    seeJourney: "Voir dans mon parcours",
    premiumVersion: "Objectifs Premium V11.0",
    pilotTitle: "Centre de pilotage Objectifs",
    pilotText: "L’application ne liste plus seulement vos objectifs : elle aide à choisir quoi avancer en premier.",
    priorityAuto: "Priorisation automatique",
    ifContinue: "Si je continue ainsi",
    connectedGoals: "Objectifs connectés",
    fundingOrigin: "Origine des fonds",
    discreet: "Visible rapidement, mais discrètement.",
    nextAction: "Prochaine action",
    noMainGoalPilot: "Créez ou mettez en avant un objectif principal.",
    customGoal: "Objectif libre",
    customGoalHint: "Créer un objectif totalement personnalisé.",
    rhythm: "Rythme souhaité",
    priorityLevel: "Priorité",
    monthlyContribution: "Contribution possible par mois",
    motivation: "Motivation personnelle",
    simulateGoal: "Simuler cet objectif",
    planHint: "Configurez votre destination, simulez plusieurs chemins, puis validez le plan de match.",
  },
};

function n(value) {
  return Number(value || 0);
}

const goalTemplates = {
  auto: {
    label: "Auto",
    icon: <Car />,
    color: "var(--blue)",
    subcategories: {
      comptant: {
        label: "Achat comptant",
        fields: [
          ["vehiclePrice", "Prix du véhicule"],
          ["taxes", "Taxes / immatriculation"],
          ["inspection", "Inspection"],
          ["repairs", "Réparations prévues"],
        ],
        calculate: (v) =>
          n(v.vehiclePrice) + n(v.taxes) + n(v.inspection) + n(v.repairs),
      },
      financement: {
        label: "Financement",
        fields: [
          ["vehiclePrice", "Prix du véhicule"],
          ["downPayment", "Mise de fonds"],
          ["insurance", "Assurance estimée"],
          ["fees", "Frais / inspection"],
        ],
        calculate: (v) =>
          Math.max(0, n(v.vehiclePrice) - n(v.downPayment)) +
          n(v.insurance) +
          n(v.fees),
      },
      location: {
        label: "Location",
        fields: [
          ["firstPayment", "Premier paiement"],
          ["deposit", "Dépôt de sécurité"],
          ["insurance", "Assurance"],
          ["fees", "Frais de départ"],
        ],
        calculate: (v) =>
          n(v.firstPayment) + n(v.deposit) + n(v.insurance) + n(v.fees),
      },
      reparation: {
        label: "Réparation",
        fields: [
          ["parts", "Pièces"],
          ["labor", "Main-d’œuvre"],
          ["diagnostic", "Diagnostic"],
          ["extra", "Marge imprévus"],
        ],
        calculate: (v) => n(v.parts) + n(v.labor) + n(v.diagnostic) + n(v.extra),
      },
      remplacement: {
        label: "Remplacement",
        fields: [
          ["newVehicle", "Nouveau véhicule"],
          ["oldVehicleValue", "Valeur estimée ancien véhicule"],
          ["fees", "Frais"],
          ["repairs", "Mise à niveau / réparations"],
        ],
        calculate: (v) =>
          Math.max(0, n(v.newVehicle) - n(v.oldVehicleValue)) +
          n(v.fees) +
          n(v.repairs),
      },
    },
  },

  maison: {
    label: "Maison",
    icon: <Home />,
    color: "var(--green)",
    subcategories: {
      construction: {
        label: "Construction",
        fields: [
          ["land", "Terrain"],
          ["foundation", "Fondation"],
          ["structure", "Structure"],
          ["electricity", "Électricité / plomberie"],
          ["finishing", "Finition"],
          ["extra", "Marge imprévus"],
        ],
        calculate: (v) =>
          n(v.land) +
          n(v.foundation) +
          n(v.structure) +
          n(v.electricity) +
          n(v.finishing) +
          n(v.extra),
      },
      hypotheque: {
        label: "Hypothèque",
        fields: [
          ["downPayment", "Mise de fonds"],
          ["notary", "Notaire"],
          ["inspection", "Inspection"],
          ["taxes", "Taxes / frais"],
        ],
        calculate: (v) =>
          n(v.downPayment) + n(v.notary) + n(v.inspection) + n(v.taxes),
      },
      terrain: {
        label: "Terrain",
        fields: [
          ["landPrice", "Prix du terrain"],
          ["documents", "Documents / notaire"],
          ["survey", "Bornage"],
          ["extra", "Marge imprévus"],
        ],
        calculate: (v) =>
          n(v.landPrice) + n(v.documents) + n(v.survey) + n(v.extra),
      },
      renovation: {
        label: "Rénovation",
        fields: [
          ["materials", "Matériaux"],
          ["labor", "Main-d’œuvre"],
          ["permits", "Permis"],
          ["extra", "Marge imprévus"],
        ],
        calculate: (v) => n(v.materials) + n(v.labor) + n(v.permits) + n(v.extra),
      },
      solaire: {
        label: "Solaire",
        fields: [
          ["panels", "Panneaux"],
          ["batteries", "Batteries"],
          ["inverter", "Onduleur"],
          ["installation", "Installation"],
          ["extra", "Marge imprévus"],
        ],
        calculate: (v) =>
          n(v.panels) +
          n(v.batteries) +
          n(v.inverter) +
          n(v.installation) +
          n(v.extra),
      },
    },
  },

  voyage: {
    label: "Voyage",
    icon: <Plane />,
    color: "var(--gold)",
    subcategories: {
      vacances: {
        label: "Vacances",
        fields: [
          ["ticket", "Billet"],
          ["hotel", "Hébergement"],
          ["activities", "Activités"],
          ["spending", "Argent sur place"],
          ["emergency", "Marge urgence"],
        ],
        calculate: (v) =>
          n(v.ticket) +
          n(v.hotel) +
          n(v.activities) +
          n(v.spending) +
          n(v.emergency),
      },
      guinee: {
        label: "Voyage Guinée",
        fields: [
          ["ticket", "Billet"],
          ["bags", "Bagages"],
          ["family", "Soutien famille"],
          ["projects", "Projets sur place"],
          ["emergency", "Marge urgence"],
        ],
        calculate: (v) =>
          n(v.ticket) + n(v.bags) + n(v.family) + n(v.projects) + n(v.emergency),
      },
      famille: {
        label: "Voyage famille",
        fields: [
          ["tickets", "Billets"],
          ["stay", "Hébergement"],
          ["food", "Nourriture"],
          ["activities", "Activités"],
          ["emergency", "Marge urgence"],
        ],
        calculate: (v) =>
          n(v.tickets) + n(v.stay) + n(v.food) + n(v.activities) + n(v.emergency),
      },
      affaires: {
        label: "Voyage affaires",
        fields: [
          ["ticket", "Billet"],
          ["hotel", "Hôtel"],
          ["transport", "Transport"],
          ["documents", "Documents"],
          ["businessFunds", "Fonds business"],
        ],
        calculate: (v) =>
          n(v.ticket) +
          n(v.hotel) +
          n(v.transport) +
          n(v.documents) +
          n(v.businessFunds),
      },
    },
  },

  dette: {
    label: "Dette / crédit",
    icon: <CreditCard />,
    color: "var(--red)",
    subcategories: {
      carteCredit: {
        label: "Carte de crédit",
        fields: [
          ["balance", "Solde actuel"],
          ["interestRate", "Taux d’intérêt %"],
          ["minimumPayment", "Paiement minimum"],
          ["targetPayment", "Paiement cible"],
        ],
        calculate: (v) => n(v.balance),
      },
      pretPersonnel: {
        label: "Prêt personnel",
        fields: [
          ["balance", "Solde restant"],
          ["interestRate", "Taux d’intérêt %"],
          ["monthlyPayment", "Paiement mensuel"],
          ["extraPayment", "Paiement extra visé"],
        ],
        calculate: (v) => n(v.balance),
      },
      margeCredit: {
        label: "Marge de crédit",
        fields: [
          ["balance", "Solde utilisé"],
          ["limit", "Limite totale"],
          ["interestRate", "Taux d’intérêt %"],
          ["targetPayment", "Paiement cible"],
        ],
        calculate: (v) => n(v.balance),
      },
      hypotheque: {
        label: "Hypothèque",
        fields: [
          ["balance", "Solde hypothécaire"],
          ["interestRate", "Taux d’intérêt %"],
          ["monthlyPayment", "Paiement mensuel"],
          ["extraPayment", "Paiement extra visé"],
        ],
        calculate: (v) => n(v.balance),
      },
    },
  },

  famille: {
    label: "Famille",
    icon: <Users />,
    color: "var(--purple)",
    fields: [
      ["support", "Soutien familial"],
      ["school", "Études / enfants"],
      ["event", "Mariage / événement"],
      ["travel", "Déplacements"],
    ],
    calculate: (v) => n(v.support) + n(v.school) + n(v.event) + n(v.travel),
  },

  liberte: {
    label: "Liberté financière",
    icon: <PiggyBank />,
    color: "var(--green)",
    fields: [
      ["debtZero", "Dette zéro"],
      ["emergencyFund", "Fonds d’urgence"],
      ["investment", "Investissement"],
      ["longTerm", "Épargne long terme"],
    ],
    calculate: (v) =>
      n(v.debtZero) + n(v.emergencyFund) + n(v.investment) + n(v.longTerm),
  },

  business: {
    label: "Projet / business",
    icon: <Briefcase />,
    color: "var(--blue)",
    fields: [
      ["launch", "Lancement"],
      ["equipment", "Matériel"],
      ["marketing", "Marketing"],
      ["training", "Formation"],
      ["cashflow", "Fonds de roulement"],
    ],
    calculate: (v) =>
      n(v.launch) + n(v.equipment) + n(v.marketing) + n(v.training) + n(v.cashflow),
  },


  personnalise: {
    label: "Objectif libre",
    icon: <Target />,
    color: "var(--gold)",
    fields: [
      ["target", "Montant cible"],
    ],
    calculate: (v) => n(v.target),
  },

  securite: {
    label: "Épargne",
    icon: <Trophy />,
    color: "var(--green)",
    fields: [
      ["monthlyExpenses", "Dépenses mensuelles"],
      ["months", "Nombre de mois visés"],
      ["extra", "Marge supplémentaire"],
    ],
    calculate: (v) => n(v.monthlyExpenses) * Math.max(1, n(v.months)) + n(v.extra),
  },
};

function Objectifs({
  selectedGoals,
  setSelectedGoals,
  settings,
  addActivity,
  setCurrentPage,
}) {
  const t = getText(settings);
  const p = pageText.FR;
  const currency = settings?.currency || "CAD";
  const goals = Array.isArray(selectedGoals) ? selectedGoals : [];

  const categories = Object.entries(goalTemplates).map(([id, item]) => ({
    id,
    ...item,
  }));

  const [selectedType, setSelectedType] = useState(null);
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [celebratingGoalId, setCelebratingGoalId] = useState(null);
  const [showCreateGoal, setShowCreateGoal] = useState(goals.length === 0);
  const [form, setForm] = useState({
    title: "",
    currentAmount: "",
    targetDate: "",
    highlighted: false,
    priority: "Moyenne",
    rhythm: "Équilibré",
    motivation: "",
    monthlyContribution: "",
    values: {},
  });

  const selectedCategory = selectedType ? goalTemplates[selectedType] : null;
  const hasSubcategories = Boolean(selectedCategory?.subcategories);

  const selectedTemplate = useMemo(() => {
    if (!selectedCategory) return null;

    if (selectedSubType && selectedCategory.subcategories?.[selectedSubType]) {
      return {
        ...selectedCategory.subcategories[selectedSubType],
        categoryLabel: selectedCategory.label,
        icon: selectedCategory.icon,
        color: selectedCategory.color,
      };
    }

    if (!hasSubcategories) return selectedCategory;

    return null;
  }, [selectedCategory, selectedSubType, hasSubcategories]);

  const targetAmount = useMemo(() => {
    if (!selectedTemplate) return 0;
    return selectedTemplate.calculate(form.values);
  }, [selectedTemplate, form.values]);

  const rankedGoals = useMemo(() => {
    return [...goals]
      .filter((goal) => !goal.archived)
      .map((goal) => {
        const progress = getProgress(goal);
        const remaining = getRemaining(goal);
        const status = getGoalStatus(progress);
        const priority = getGoalPriority(goal, progress, remaining);
        const priorityScore =
          priority.score +
          (goal.highlighted ? 40 : 0) +
          (progress >= 80 && progress < 100 ? 30 : 0) +
          (progress >= 100 ? 20 : 0) +
          (goal.targetDate ? 10 : 0) -
          Math.min(20, Math.round(remaining / 1000));

        return { ...goal, progress, remaining, status, priority, priorityScore };
      })
      .sort((a, b) => b.priorityScore - a.priorityScore);
  }, [goals]);

  const mainGoal = rankedGoals.find((goal) => goal.highlighted) || rankedGoals[0];
  const connectedGoal = rankedGoals.find((goal) => ["maison", "voyage", "business"].includes(goal.category));

  function resetForm() {
    setSelectedType(null);
    setSelectedSubType(null);
    setForm({
      title: "",
      currentAmount: "",
      targetDate: "",
      highlighted: false,
      priority: "Moyenne",
      rhythm: "Équilibré",
      motivation: "",
      monthlyContribution: "",
      values: {},
    });
  }

  function backToSubcategories() {
    setSelectedSubType(null);
    setForm({
      title: selectedCategory?.label || "",
      currentAmount: "",
      targetDate: "",
      highlighted: goals.length === 0,
      priority: "Moyenne",
      rhythm: "Équilibré",
      motivation: "",
      monthlyContribution: "",
      values: {},
    });
  }

  function updateValue(key, value) {
    setForm({
      ...form,
      values: {
        ...form.values,
        [key]: cleanMoneyInput(value),
      },
    });
  }

  function selectCategory(id) {
    const template = goalTemplates[id];

    setSelectedType(id);
    setSelectedSubType(null);

    setForm({
      title: template.label,
      currentAmount: "",
      targetDate: "",
      highlighted: goals.length === 0,
      priority: "Moyenne",
      rhythm: "Équilibré",
      motivation: "",
      monthlyContribution: "",
      values: {},
    });
  }

  function selectSubcategory(id) {
    const subcategory = selectedCategory.subcategories[id];

    setSelectedSubType(id);
    setForm({
      title: `${selectedCategory.label} - ${subcategory.label}`,
      currentAmount: "",
      targetDate: "",
      highlighted: goals.length === 0,
      priority: "Moyenne",
      rhythm: "Équilibré",
      motivation: "",
      monthlyContribution: "",
      values: {},
    });
  }

  function addGoal() {
    if (!selectedType || !selectedTemplate || targetAmount <= 0) return;

    const shouldHighlight = goals.length === 0 || form.highlighted;

    const updatedGoals = goals.map((goal) => ({
      ...goal,
      highlighted: shouldHighlight ? false : goal.highlighted,
    }));

    const newGoal = {
      id: Date.now(),
      title: form.title || selectedTemplate.label,
      category: selectedType,
      subcategory: selectedSubType,
      option: selectedTemplate.label,
      categoryLabel: selectedCategory.label,
      targetAmount,
      currentAmount: Number(form.currentAmount || 0),
      targetDate: form.targetDate,
      highlighted: shouldHighlight,
      archived: false,
      createdAt: new Date().toISOString(),
      lastDeposit: null,
      journeyLinked: true,
      journeyMilestone: "goal_created",
      priorityLevel: form.priority,
      rhythm: form.rhythm,
      motivation: form.motivation,
      monthlyContribution: Number(form.monthlyContribution || 0),
      config: form.values,
    };

    setSelectedGoals([...updatedGoals, newGoal]);

    addActivity?.(
      "objectif",
      "Objectif créé",
      `${newGoal.title} a été ajouté à vos objectifs.`
    );

    addActivity?.(
      "parcours",
      "Smart Journey",
      `${newGoal.title} est maintenant connecté au parcours.`
    );

    if (shouldHighlight) {
      addActivity?.(
        "objectif",
        "Objectif principal",
        `${newGoal.title} est maintenant prioritaire.`
      );
    }

    if (newGoal.currentAmount >= newGoal.targetAmount) {
      celebrateGoal(newGoal.id);
      addActivity?.(
        "victoire",
        "Objectif atteint",
        `${newGoal.title} a atteint 100 %.`
      );
    }

    resetForm();
    setShowCreateGoal(false);
  }

  function removeGoal(id) {
    const goalToRemove = goals.find((goal) => goal.id === id);

    setSelectedGoals(goals.filter((goal) => goal.id !== id));

    addActivity?.(
      "objectif",
      "Objectif supprimé",
      `${goalToRemove?.title || "Un objectif"} a été supprimé.`
    );
  }

  function highlightGoal(id) {
    const selectedGoal = goals.find((goal) => goal.id === id);

    setSelectedGoals(
      goals.map((goal) => ({
        ...goal,
        highlighted: goal.id === id,
      }))
    );

    addActivity?.(
      "objectif",
      "Objectif principal",
      `${selectedGoal?.title || "Un objectif"} est maintenant prioritaire.`
    );

    addActivity?.(
      "parcours",
      "Objectif principal",
      `${selectedGoal?.title || "Un objectif"} devient le repère du Smart Journey.`
    );
  }

  function addDeposit(goalId, amount) {
    const depositAmount = Number(amount || 0);
    if (depositAmount <= 0) return;

    setSelectedGoals(
      goals.map((goal) => {
        if (goal.id !== goalId) return goal;

        const previousAmount = Number(goal.currentAmount || 0);
        const target = Number(goal.targetAmount || 0);
        const nextAmount = Math.min(target, previousAmount + depositAmount);

        addActivity?.(
          "depot",
          "Dépôt ajouté",
          `${formatMoney(depositAmount, currency)} ajoutés à ${goal.title}.`
        );

        addActivity?.(
          "parcours",
          "Progression Smart Journey",
          `${goal.title} avance avec un nouveau dépôt.`
        );

        if (previousAmount < target && nextAmount >= target) {
          celebrateGoal(goal.id);
          addActivity?.(
            "victoire",
            "Objectif atteint",
            `${goal.title} a atteint 100 %.`
          );
        }

        return {
          ...goal,
          currentAmount: nextAmount,
          lastDeposit: {
            amount: depositAmount,
            date: new Date().toISOString(),
          },
          journeyLinked: true,
          journeyMilestone:
            previousAmount < target && nextAmount >= target
              ? "goal_achieved"
              : "deposit_added",
        };
      })
    );
  }

  function openJourney() {
    setCurrentPage?.("parcours");
  }

  function simulateGoal(goalId) {
    localStorage.setItem("onjaramaSimulatorGoalId", String(goalId));
    setCurrentPage?.("simulateur");
  }

  function celebrateGoal(id) {
    setCelebratingGoalId(id);
    window.setTimeout(() => setCelebratingGoalId(null), 1800);
  }

  return (
    <div className="native-page" style={page}>
      <section style={card}>
        <div style={sectionTop}>
          <div style={headerCompact}>
            <Trophy color="var(--gold)" />
            <div>
              <p style={eyebrow}>Priorité V11.4</p>
              <h2>{p.activeGoals}</h2>
            </div>
          </div>

          <button
            onClick={() => {
              setShowCreateGoal(true);
              window.setTimeout(() => {
                document
                  .getElementById("create-goal-panel")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 50);
            }}
            style={compactAddButton}
          >
            <Plus size={17} />
            Ajouter
          </button>
        </div>

        {rankedGoals.length === 0 && (
          <div style={emptyGoalCard}>
            <Target color="var(--gold)" />
            <div>
              <strong>{p.noGoal}</strong>
              <p style={mutedSmall}>Commencez par créer un objectif simple, puis OnJarama le connectera au parcours.</p>
            </div>
          </div>
        )}

        {rankedGoals.map((goal, index) => (
          <div key={goal.id} style={goalActionWrap}>
            <GoalPremiumCard
              goal={goal}
              rank={index + 1}
              template={goalTemplates[goal.category] || goalTemplates.personnalise}
              currency={currency}
              isCelebrating={celebratingGoalId === goal.id}
              onDeposit={addDeposit}
              onHighlight={highlightGoal}
              onRemove={removeGoal}
              onOpenJourney={openJourney}
            />
            <button onClick={() => simulateGoal(goal.id)} style={simulateButton}>
              <Calculator size={17} />
              {p.simulateGoal}
            </button>
          </div>
        ))}
      </section>

      {showCreateGoal && (
        <section
          id="create-goal-panel"
          style={{
            ...heroCard,
            borderColor: selectedCategory?.color || "var(--gold)",
          }}
        >
        <div
          key={`${selectedType || "categories"}-${selectedSubType || "root"}`}
          style={animatedPanel}
        >
          {!selectedCategory && (
            <>
              <div style={header}>
                <Target color="var(--gold)" />
                <div>
                  <p style={eyebrow}>{p.premiumVersion}</p>
                  <h1>{t.objectifs || p.smartCategories}</h1>
                </div>
              </div>

              <p style={muted}>{p.subtitle}</p>

              <div style={categoryGrid}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => selectCategory(category.id)}
                    style={categoryTile}
                  >
                    <span style={{ color: category.color }}>{category.icon}</span>
                    <strong>{category.label}</strong>
                    {category.subcategories && (
                      <small style={mutedSmall}>Sous-catégories</small>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedCategory && hasSubcategories && !selectedTemplate && (
            <>
              <div style={formTop}>
                <button onClick={resetForm} style={backButton}>
                  <ArrowLeft size={17} />
                  {p.backToCategories}
                </button>

                <span style={{ ...miniIcon, color: selectedCategory.color }}>
                  {selectedCategory.icon}
                </span>
              </div>

              <div style={header}>
                <span style={{ color: selectedCategory.color }}>
                  {selectedCategory.icon}
                </span>
                <h1>{selectedCategory.label}</h1>
              </div>

              <p style={muted}>{p.chooseSubcategory}</p>

              <div style={subcategoryGrid}>
                {Object.entries(selectedCategory.subcategories).map(
                  ([id, subcategory]) => (
                    <button
                      key={id}
                      onClick={() => selectSubcategory(id)}
                      style={{
                        ...subcategoryTile,
                        borderColor: selectedCategory.color,
                      }}
                    >
                      <strong>{subcategory.label}</strong>
                      <ChevronRight size={18} />
                    </button>
                  )
                )}
              </div>
            </>
          )}

          {selectedTemplate && (
            <>
              <div style={formTop}>
                <button
                  onClick={hasSubcategories ? backToSubcategories : resetForm}
                  style={backButton}
                >
                  <ArrowLeft size={17} />
                  {hasSubcategories ? p.chooseSubcategory : p.backToGoals}
                </button>

                <span style={{ ...miniIcon, color: selectedTemplate.color }}>
                  {selectedTemplate.icon}
                </span>
              </div>

              <div style={header}>
                <span style={{ color: selectedTemplate.color }}>
                  {selectedTemplate.icon}
                </span>
                <h1>
                  {p.configure} : {selectedTemplate.label}
                </h1>
              </div>

              {selectedTemplate.categoryLabel && (
                <p style={mutedSmall}>{selectedTemplate.categoryLabel}</p>
              )}

              <label>Nom de l’objectif</label>
              <input
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                style={input}
              />

              {selectedTemplate.fields.map(([key, label]) => (
                <div key={key}>
                  <label>{label}</label>
                  <input
                    value={form.values[key] || ""}
                    onChange={(event) => updateValue(key, event.target.value)}
                    placeholder="0"
                    inputMode="decimal"
                    style={input}
                  />
                </div>
              ))}

              <label>{p.currentAmount}</label>
              <input
                value={form.currentAmount}
                onChange={(event) =>
                  setForm({
                    ...form,
                    currentAmount: cleanMoneyInput(event.target.value),
                  })
                }
                placeholder="0"
                inputMode="decimal"
                style={input}
              />

              <label>{p.priorityLevel}</label>
              <select
                value={form.priority}
                onChange={(event) => setForm({ ...form, priority: event.target.value })}
                style={input}
              >
                <option>Douce</option>
                <option>Moyenne</option>
                <option>Haute</option>
                <option>Urgente</option>
              </select>

              <label>{p.rhythm}</label>
              <select
                value={form.rhythm}
                onChange={(event) => setForm({ ...form, rhythm: event.target.value })}
                style={input}
              >
                <option>Tranquille</option>
                <option>Équilibré</option>
                <option>Dynamique</option>
                <option>Féroce</option>
              </select>

              <label>{p.monthlyContribution}</label>
              <input
                value={form.monthlyContribution}
                onChange={(event) =>
                  setForm({
                    ...form,
                    monthlyContribution: cleanMoneyInput(event.target.value),
                  })
                }
                placeholder="0"
                inputMode="decimal"
                style={input}
              />

              <label>{p.motivation}</label>
              <input
                value={form.motivation}
                onChange={(event) => setForm({ ...form, motivation: event.target.value })}
                placeholder="Pourquoi cet objectif compte pour vous ?"
                style={input}
              />

              <label>{p.targetDate}</label>
              <input
                type="date"
                value={form.targetDate}
                onChange={(event) =>
                  setForm({ ...form, targetDate: event.target.value })
                }
                style={input}
              />

              <button
                onClick={() =>
                  setForm({ ...form, highlighted: !form.highlighted })
                }
                style={{
                  ...highlightBtn,
                  borderColor: form.highlighted ? "var(--gold)" : "var(--border)",
                  background: form.highlighted
                    ? "rgba(212,175,55,.14)"
                    : "var(--bg-panel)",
                }}
              >
                <Star size={17} />
                {form.highlighted ? p.mainGoal : p.setMain}
              </button>

              <Preview
                targetAmount={targetAmount}
                currentAmount={form.currentAmount}
                currency={currency}
                text={p}
              />

              <button onClick={addGoal} style={addButton}>
                <Plus size={18} />
                {p.createGoal}
              </button>

              <p style={mutedSmall}>{p.planHint}</p>
            </>
          )}
        </div>
      </section>

      )}


      <section style={journeyNotice}>
        <Route color="var(--gold)" />
        <div>
          <h2>{p.smartJourney}</h2>
          <p style={muted}>{p.journeyHint}</p>
          <button onClick={openJourney} style={journeyButton}>
            <Route size={17} />
            {p.seeJourney}
          </button>
        </div>
      </section>



      {connectedGoal && (
        <section style={connectedCard}>
          <div style={header}>
            <Layers color="var(--green)" />
            <div>
              <p style={eyebrow}>{p.connectedGoals}</p>
              <h2>{connectedGoal.title}</h2>
              <p style={muted}>{p.discreet}</p>
            </div>
          </div>
          <ConnectedGoalMini goal={connectedGoal} currency={currency} />
        </section>
      )}


      <section style={pilotCard}>
        <div style={header}>
          <SparklesIcon />
          <div>
            <p style={eyebrow}>{p.premiumVersion}</p>
            <h2>{p.pilotTitle}</h2>
            <p style={muted}>{p.pilotText}</p>
          </div>
        </div>

        <div style={pilotGrid}>
          <PilotStat
            icon={<Target size={18} />}
            label={p.mainGoal}
            value={mainGoal?.title || p.noMainGoalPilot}
            color="var(--gold)"
          />
          <PilotStat
            icon={<TrendingUp size={18} />}
            label={p.priorityAuto}
            value={mainGoal?.priority?.label || "À définir"}
            color={mainGoal?.priority?.color || "var(--gold)"}
          />
          <PilotStat
            icon={<CalendarClock size={18} />}
            label={p.ifContinue}
            value={mainGoal ? estimateGoalDate(mainGoal) : "—"}
            color="var(--blue)"
          />
          <PilotStat
            icon={<Wallet size={18} />}
            label={p.fundingOrigin}
            value={"Profil financier"}
            color="var(--green)"
          />
        </div>
      </section>


      <GoalPremiumDashboard
        goals={rankedGoals}
        currency={currency}
        templates={goalTemplates}
        onOpenCreate={() => {
          setShowCreateGoal(true);
          window.setTimeout(() => {
            document
              .getElementById("create-goal-panel")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        }}
        onOpenJourney={openJourney}
      />

    </div>
  );
}


function SparklesIcon() {
  return (
    <span style={sparklesIcon}>
      <Trophy size={20} />
    </span>
  );
}

function PilotStat({ icon, label, value, color }) {
  return (
    <div style={{ ...pilotStat, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function ConnectedGoalMini({ goal, currency }) {
  const steps = getConnectedSteps(goal);
  return (
    <div style={connectedList}>
      {steps.map((step, index) => (
        <div key={step.label} style={connectedLine}>
          <span style={connectedDot}>{index + 1}</span>
          <div style={{ flex: 1 }}>
            <strong>{step.label}</strong>
            <p style={mutedSmall}>{step.text}</p>
          </div>
          <small style={{ color: step.done ? "var(--green)" : "var(--text-muted)", fontWeight: 900 }}>
            {step.done ? "✓" : "○"}
          </small>
        </div>
      ))}
      <p style={mutedSmall}>
        Reste global : {formatMoney(goal.remaining || getRemaining(goal), currency)}
      </p>
    </div>
  );
}

function Preview({ targetAmount, currentAmount, currency, text }) {
  const current = Number(currentAmount || 0);
  const remaining = Math.max(0, targetAmount - current);
  const progress =
    targetAmount > 0
      ? Math.min(100, Math.round((current / targetAmount) * 100))
      : 0;

  return (
    <div style={preview}>
      <HeartHandshake color="var(--gold)" />
      <div>
        <strong>{text.quickAnalysis}</strong>
        <p style={mutedSmall}>
          {text.targetAmount} : {formatMoney(targetAmount, currency)}
        </p>
        <p style={mutedSmall}>
          {text.progress} : {progress}%
        </p>
        <p style={mutedSmall}>
          {text.remaining} : {formatMoney(remaining, currency)}
        </p>
      </div>
    </div>
  );
}

function getProgress(goal) {
  const target = Number(goal.targetAmount || 0);
  if (target <= 0) return 0;
  return Math.min(
    100,
    Math.round((Number(goal.currentAmount || 0) / target) * 100)
  );
}

function getRemaining(goal) {
  return Math.max(
    0,
    Number(goal.targetAmount || 0) - Number(goal.currentAmount || 0)
  );
}

function getGoalStatus(progress) {
  if (progress >= 100) return "Atteint";
  if (progress >= 80) return "Presque atteint";
  if (progress >= 30) return "En progression";
  return "Début";
}


function getGoalPriority(goal, progress, remaining) {
  const hasCloseDate = goal.targetDate && daysUntil(goal.targetDate) <= 90;
  const isDebt = goal.category === "dette";
  const nearVictory = progress >= 80 && progress < 100;

  if (isDebt || hasCloseDate || nearVictory) {
    return { label: "Priorité élevée", color: "var(--red)", score: 70 };
  }

  if (goal.highlighted || remaining <= 1500 || progress >= 35) {
    return { label: "Priorité moyenne", color: "var(--gold)", score: 45 };
  }

  return { label: "Priorité douce", color: "var(--green)", score: 20 };
}

function daysUntil(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return 9999;
  return Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function estimateGoalDate(goal) {
  if (goal.targetDate) return goal.targetDate;
  if (goal.progress >= 100) return "Atteint";
  if (goal.progress >= 80) return "Très bientôt";
  if (goal.progress >= 40) return "En bonne voie";
  return "À votre rythme";
}

function getConnectedSteps(goal) {
  if (goal.category === "maison") {
    return [
      { label: "Base", text: goal.option || "Projet maison", done: goal.progress >= 20 },
      { label: "Travaux", text: "Crépi, électricité, solaire ou finition", done: goal.progress >= 50 },
      { label: "Installation", text: "Mobilier, sécurité et confort", done: goal.progress >= 80 },
      { label: "Victoire", text: "Objectif maison complété", done: goal.progress >= 100 },
    ];
  }

  if (goal.category === "voyage") {
    return [
      { label: "Billet", text: "Préparer le transport principal", done: goal.progress >= 25 },
      { label: "Séjour", text: "Prévoir dépenses sur place", done: goal.progress >= 50 },
      { label: "Marge", text: "Garder une sécurité", done: goal.progress >= 75 },
      { label: "Départ", text: "Voyage prêt", done: goal.progress >= 100 },
    ];
  }

  return [
    { label: "Départ", text: "Objectif créé", done: true },
    { label: "Premier cap", text: "25 % atteint", done: goal.progress >= 25 },
    { label: "Milieu", text: "50 % atteint", done: goal.progress >= 50 },
    { label: "Victoire", text: "100 % atteint", done: goal.progress >= 100 },
  ];
}


const sectionTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "14px",
};

const headerCompact = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const compactAddButton = {
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.14)",
  color: "var(--gold)",
  borderRadius: "999px",
  padding: "10px 13px",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "7px",
  whiteSpace: "nowrap",
};

const emptyGoalCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.13), var(--bg-panel))",
  border: "1px dashed var(--gold)",
  borderRadius: "18px",
  padding: "16px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const page = { paddingTop: "0" };


const pilotCard = {
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.22), transparent 34%), linear-gradient(135deg, rgba(15,23,42,.98), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
};

const pilotGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "10px",
  marginTop: "14px",
};

const pilotStat = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "6px",
  minHeight: "92px",
};

const sparklesIcon = {
  width: "42px",
  height: "42px",
  borderRadius: "15px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.14)",
  color: "var(--gold)",
  display: "grid",
  placeItems: "center",
};

const connectedCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.14), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "16px",
};

const connectedList = {
  display: "grid",
  gap: "10px",
};

const connectedLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "11px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const connectedDot = {
  width: "26px",
  height: "26px",
  borderRadius: "999px",
  border: "1px solid var(--gold)",
  color: "var(--gold)",
  display: "grid",
  placeItems: "center",
  fontWeight: 900,
  fontSize: "12px",
};

const journeyNotice = {
  background: "linear-gradient(135deg, rgba(212,175,55,.16), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "18px",
  marginTop: "16px",
  display: "flex",
  gap: "12px",
};

const journeyButton = {
  marginTop: "12px",
  width: "100%",
  padding: "12px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.13)",
  color: "var(--gold)",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const heroCard = {
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.18), transparent 32%), var(--bg-card)",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  overflow: "hidden",
  marginTop: "20px",
};

const animatedPanel = { animation: "fadeIn .22s ease" };

const formTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "14px",
};

const backButton = {
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  borderRadius: "999px",
  padding: "9px 12px",
  display: "flex",
  alignItems: "center",
  gap: "7px",
  fontWeight: "bold",
};

const miniIcon = {
  width: "38px",
  height: "38px",
  borderRadius: "14px",
  background: "var(--bg-panel)",
  display: "grid",
  placeItems: "center",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
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
  color: "var(--gold)",
  fontSize: "12px",
  fontWeight: "900",
  margin: 0,
};

const categoryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "14px",
  marginTop: "22px",
};

const categoryTile = {
  minHeight: "128px",
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "20px",
  padding: "20px",
  color: "var(--text-main)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "12px",
  alignItems: "flex-start",
  textAlign: "left",
  fontSize: "18px",
};

const subcategoryGrid = {
  display: "grid",
  gap: "12px",
  marginTop: "18px",
};

const subcategoryTile = {
  width: "100%",
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "16px",
  color: "var(--text-main)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  textAlign: "left",
  fontSize: "16px",
};

const input = {
  display: "block",
  width: "100%",
  marginTop: "8px",
  marginBottom: "12px",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
};

const highlightBtn = {
  width: "100%",
  padding: "13px",
  borderRadius: "14px",
  border: "1px solid var(--border)",
  color: "var(--text-main)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  marginTop: "8px",
};

const preview = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "14px",
  marginTop: "14px",
  display: "flex",
  gap: "12px",
};

const addButton = {
  width: "100%",
  marginTop: "16px",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const goalActionWrap = {
  marginTop: "14px",
};

const simulateButton = {
  width: "100%",
  marginTop: "8px",
  padding: "13px",
  borderRadius: "14px",
  border: "1px solid var(--blue)",
  background: "rgba(56,189,248,.13)",
  color: "var(--blue)",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
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

export default Objectifs;