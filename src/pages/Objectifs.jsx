import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Car,
  ChevronRight,
  CreditCard,
  HeartHandshake,
  Home,
  PiggyBank,
  Plane,
  Plus,
  RotateCcw,
  Sparkles,
  Star,
  Target,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";
import { cleanMoneyInput, formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";

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
    flip: "Retourner",
    delete: "Supprimer",
    simulateLater: "Simulation détaillée bientôt disponible",
    achieved: "Objectif atteint",
    congratulations: "Félicitations, tu avances vraiment.",
    almostThere: "🔥 Presque atteint",
    startedToday: "Commencé aujourd’hui",
    startedAgo: "Commencé il y a",
    lastDeposit: "Dernier dépôt",
  },
};

function n(value) {
  return Number(value || 0);
}

function getStartedLabel(createdAt, text) {
  if (!createdAt) return text.startedToday;

  const start = new Date(createdAt);
  const now = new Date();

  if (Number.isNaN(start.getTime())) return text.startedToday;

  const diffMs = now.getTime() - start.getTime();
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (days === 0) return text.startedToday;
  if (days === 1) return `${text.startedAgo} 1 jour`;

  return `${text.startedAgo} ${days} jours`;
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
}) {
  const t = getText(settings);
  const p = pageText.FR;
  const currency = settings?.currency || "CAD";

  const categories = Object.entries(goalTemplates).map(([id, item]) => ({
    id,
    ...item,
  }));

  const [selectedType, setSelectedType] = useState(null);
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [flippedId, setFlippedId] = useState(null);
  const [celebratingGoalId, setCelebratingGoalId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    currentAmount: "",
    targetDate: "",
    highlighted: false,
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

    if (!hasSubcategories) {
      return selectedCategory;
    }

    return null;
  }, [selectedCategory, selectedSubType, hasSubcategories]);

  const targetAmount = useMemo(() => {
    if (!selectedTemplate) return 0;
    return selectedTemplate.calculate(form.values);
  }, [selectedTemplate, form.values]);

  function resetForm() {
    setSelectedType(null);
    setSelectedSubType(null);
    setForm({
      title: "",
      currentAmount: "",
      targetDate: "",
      highlighted: false,
      values: {},
    });
  }

  function backToSubcategories() {
    setSelectedSubType(null);
    setForm({
      title: selectedCategory?.label || "",
      currentAmount: "",
      targetDate: "",
      highlighted: selectedGoals.length === 0,
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
      highlighted: selectedGoals.length === 0,
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
      highlighted: selectedGoals.length === 0,
      values: {},
    });
  }

  function addGoal() {
    if (!selectedType || !selectedTemplate || targetAmount <= 0) return;

    const shouldHighlight = selectedGoals.length === 0 || form.highlighted;

    const updatedGoals = selectedGoals.map((goal) => ({
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
      config: form.values,
    };

    setSelectedGoals([...updatedGoals, newGoal]);

    addActivity?.(
      "objectif",
      "Objectif créé",
      `${newGoal.title} a été ajouté à vos objectifs.`
    );

    if (shouldHighlight) {
      addActivity?.(
        "objectif",
        "Objectif principal",
        `${newGoal.title} est maintenant prioritaire.`
      );
    }

    if (newGoal.currentAmount >= newGoal.targetAmount) {
      setCelebratingGoalId(newGoal.id);
      setTimeout(() => setCelebratingGoalId(null), 1800);

      addActivity?.(
        "victoire",
        "Objectif atteint",
        `${newGoal.title} a atteint 100 %.`
      );
    }

    resetForm();
  }

  function removeGoal(id) {
    const goalToRemove = selectedGoals.find((goal) => goal.id === id);

    setSelectedGoals(selectedGoals.filter((goal) => goal.id !== id));

    addActivity?.(
      "objectif",
      "Objectif supprimé",
      `${goalToRemove?.title || "Un objectif"} a été supprimé.`
    );
  }

  function highlightGoal(id) {
    const selectedGoal = selectedGoals.find((goal) => goal.id === id);

    setSelectedGoals(
      selectedGoals.map((goal) => ({
        ...goal,
        highlighted: goal.id === id,
      }))
    );

    addActivity?.(
      "objectif",
      "Objectif principal",
      `${selectedGoal?.title || "Un objectif"} est maintenant prioritaire.`
    );
  }

  function addDeposit(goalId, amount) {
    setSelectedGoals(
      selectedGoals.map((goal) => {
        if (goal.id !== goalId) return goal;

        const previousAmount = Number(goal.currentAmount || 0);
        const target = Number(goal.targetAmount || 0);
        const nextAmount = Math.min(target, previousAmount + amount);

        addActivity?.(
          "depot",
          "Dépôt ajouté",
          `${formatMoney(amount, currency)} ajoutés à ${goal.title}.`
        );

        if (previousAmount < target && nextAmount >= target) {
          setCelebratingGoalId(goal.id);
          setTimeout(() => setCelebratingGoalId(null), 1800);

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
            amount,
            date: new Date().toISOString(),
          },
        };
      })
    );
  }

  return (
    <div className="native-page" style={page}>
      <section
        style={{
          ...heroCard,
          borderColor: selectedCategory?.color || "var(--border)",
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
                <h1>{t.objectifs || p.smartCategories}</h1>
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

              <p style={mutedSmall}>{p.simulateLater}</p>
            </>
          )}
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <Calendar color="var(--purple)" />
          <h2>{p.activeGoals}</h2>
        </div>

        {selectedGoals.length === 0 && <p style={muted}>{p.noGoal}</p>}

        {selectedGoals.map((goal) => {
          const category = goalTemplates[goal.category] || goalTemplates.securite;

          const progress =
            goal.targetAmount > 0
              ? Math.min(
                  100,
                  Math.round((goal.currentAmount / goal.targetAmount) * 100)
                )
              : 0;

          const remaining = Math.max(
            0,
            Number(goal.targetAmount || 0) - Number(goal.currentAmount || 0)
          );

          const isFlipped = flippedId === goal.id;
          const isCelebrating = celebratingGoalId === goal.id;
          const isAchieved = progress >= 100;
          const isAlmostThere = progress >= 80 && progress < 100;

          return (
            <div
              key={goal.id}
              style={{
                ...goalCard,
                ...(isCelebrating ? celebrationCard : {}),
                borderColor: isAchieved ? "var(--gold)" : category.color,
                background: isFlipped
                  ? "linear-gradient(135deg, rgba(212,175,55,.10), var(--bg-panel))"
                  : isAchieved
                    ? "linear-gradient(135deg, rgba(212,175,55,.13), var(--bg-panel))"
                    : "var(--bg-panel)",
              }}
            >
              {!isFlipped ? (
                <>
                  <div style={goalHeader}>
                    <span
                      style={{
                        color: isAchieved ? "var(--gold)" : category.color,
                      }}
                    >
                      {isAchieved ? <Trophy /> : category.icon}
                    </span>

                    <div>
                      <strong>
                        {goal.highlighted ? "⭐ " : ""}
                        {goal.title}
                      </strong>
                      <p style={mutedSmall}>
                        {goal.categoryLabel || category.label}
                        {goal.option ? ` • ${goal.option}` : ""}
                      </p>
                    </div>

                    <button
                      onClick={() => setFlippedId(goal.id)}
                      style={ghostButton}
                      aria-label={p.flip}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  <div style={badgeRow}>
                    <span style={disciplineBadge}>
                      {getStartedLabel(goal.createdAt, p)}
                    </span>
                    {isAlmostThere && (
                      <span style={almostBadge}>{p.almostThere}</span>
                    )}
                    {isAchieved && (
                      <span style={victoryBadge}>🏆 {p.achieved}</span>
                    )}
                  </div>

                  {isCelebrating && (
                    <div style={celebrationBox}>
                      <Sparkles size={18} />
                      <strong>{p.congratulations}</strong>
                    </div>
                  )}

                  <div style={amountRow}>
                    <span>{formatMoney(goal.currentAmount, currency)}</span>
                    <strong>{formatMoney(goal.targetAmount, currency)}</strong>
                  </div>

                  <div style={barBg}>
                    <div
                      style={{
                        ...barFill,
                        width: `${progress}%`,
                        background: isAchieved ? "var(--gold)" : category.color,
                      }}
                    />
                  </div>

                  <p style={mutedSmall}>
                    {p.progress} : {progress}%
                  </p>

                  {goal.lastDeposit && (
                    <p style={mutedSmall}>
                      {p.lastDeposit} : +
                      {formatMoney(goal.lastDeposit.amount, currency)}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div style={goalHeader}>
                    <span style={{ color: category.color }}>
                      <RotateCcw />
                    </span>

                    <div>
                      <strong>{p.details}</strong>
                      <p style={mutedSmall}>{goal.title}</p>
                    </div>

                    <button
                      onClick={() => setFlippedId(null)}
                      style={ghostButton}
                      aria-label={p.flip}
                    >
                      <RotateCcw size={17} />
                    </button>
                  </div>

                  <InfoLine
                    label="Catégorie"
                    value={`${goal.categoryLabel || category.label}${
                      goal.option ? ` • ${goal.option}` : ""
                    }`}
                  />
                  <InfoLine
                    label="Discipline"
                    value={getStartedLabel(goal.createdAt, p)}
                  />
                  <InfoLine
                    label={p.targetAmount}
                    value={formatMoney(goal.targetAmount, currency)}
                  />
                  <InfoLine
                    label={p.currentAmount}
                    value={formatMoney(goal.currentAmount, currency)}
                  />
                  <InfoLine
                    label={p.remainingToGet}
                    value={formatMoney(remaining, currency)}
                  />
                  <InfoLine label={p.progress} value={`${progress}%`} />

                  {goal.lastDeposit && (
                    <InfoLine
                      label={p.lastDeposit}
                      value={`+${formatMoney(goal.lastDeposit.amount, currency)}`}
                    />
                  )}

                  <div style={quickDepositRow}>
                    {[50, 100, 250, 500].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => addDeposit(goal.id, amount)}
                        style={smallGreenBtn}
                      >
                        +{amount} $
                      </button>
                    ))}
                  </div>

                  {!goal.highlighted && (
                    <button
                      onClick={() => highlightGoal(goal.id)}
                      style={smallGoldBtn}
                    >
                      {p.setMain}
                    </button>
                  )}

                  <button onClick={() => removeGoal(goal.id)} style={deleteBtn}>
                    <Trash2 size={16} />
                    {p.delete}
                  </button>
                </>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}

function InfoLine({ label, value }) {
  return (
    <div style={infoLine}>
      <span style={mutedSmall}>{label}</span>
      <strong>{value}</strong>
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

const page = {
  paddingTop: "0",
};

const heroCard = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  overflow: "hidden",
};

const animatedPanel = {
  animation: "fadeIn .22s ease",
};

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

const goalCard = {
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
  marginTop: "12px",
  transition: "transform .22s ease, box-shadow .22s ease, border-color .22s ease",
};

const celebrationCard = {
  transform: "scale(1.015)",
  boxShadow: "0 0 0 1px rgba(212,175,55,.35), 0 0 28px rgba(212,175,55,.25)",
};

const goalHeader = {
  display: "grid",
  gridTemplateColumns: "32px 1fr auto",
  gap: "10px",
  alignItems: "center",
};

const badgeRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "12px",
};

const disciplineBadge = {
  border: "1px solid var(--border)",
  background: "var(--bg-main)",
  color: "var(--text-muted)",
  borderRadius: "999px",
  padding: "6px 9px",
  fontSize: "12px",
  fontWeight: "700",
};

const almostBadge = {
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  borderRadius: "999px",
  padding: "6px 9px",
  fontSize: "12px",
  fontWeight: "800",
};

const victoryBadge = {
  border: "1px solid var(--green)",
  background: "rgba(34,197,94,.12)",
  color: "var(--green)",
  borderRadius: "999px",
  padding: "6px 9px",
  fontSize: "12px",
  fontWeight: "800",
};

const celebrationBox = {
  marginTop: "12px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.14)",
  color: "var(--gold)",
  borderRadius: "14px",
  padding: "11px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const amountRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "14px",
};

const barBg = {
  height: "10px",
  background: "var(--bg-main)",
  borderRadius: "999px",
  marginTop: "10px",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
};

const ghostButton = {
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--text-main)",
  borderRadius: "10px",
  padding: "7px",
};

const infoLine = {
  background: "var(--bg-main)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "10px",
  marginTop: "8px",
  display: "grid",
  gap: "4px",
};

const quickDepositRow = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "8px",
  marginTop: "12px",
};

const smallGreenBtn = {
  padding: "10px",
  borderRadius: "12px",
  border: "1px solid var(--green)",
  background: "rgba(34,197,94,.12)",
  color: "var(--green)",
  fontWeight: "bold",
};

const smallGoldBtn = {
  marginTop: "12px",
  width: "100%",
  padding: "11px",
  borderRadius: "12px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  fontWeight: "bold",
};

const deleteBtn = {
  width: "100%",
  marginTop: "10px",
  padding: "11px",
  borderRadius: "12px",
  border: "1px solid var(--red)",
  background: "rgba(239,68,68,.12)",
  color: "var(--red)",
  fontWeight: "bold",
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