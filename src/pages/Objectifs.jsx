import { useState } from "react";
import {
  Briefcase,
  Calendar,
  Car,
  Hammer,
  HeartHandshake,
  Home,
  PiggyBank,
  Plane,
  Plus,
  Star,
  Target,
  Trash2,
  Users,
} from "lucide-react";
import { cleanMoneyInput, formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    subtitle: "Choisissez une catégorie, puis le type exact de projet à planifier.",
    smartCategories: "Catégories intelligentes",
    adaptedOptions: "Options adaptées",
    planGoal: "Planifier l’objectif",
    goalName: "Nom de l’objectif",
    targetAmount: "Montant cible",
    currentAmount: "Montant déjà disponible",
    targetDate: "Date cible",
    quickAnalysis: "Analyse rapide",
    progress: "Progression",
    remaining: "Reste",
    createGoal: "Créer l’objectif",
    activeGoals: "Mes objectifs actifs",
    noGoal: "Aucun objectif actif pour le moment.",
    remainingToGet: "Reste à obtenir",
    mainGoal: "Objectif principal",
    setMain: "Mettre en avant",
    project: "Projet",
    auto: "Auto",
    house: "Maison",
    travel: "Voyage",
    family: "Famille",
    freedom: "Liberté financière",
    business: "Projet / business",
  },

  EN: {
    subtitle: "Choose a category, then the exact type of project to plan.",
    smartCategories: "Smart categories",
    adaptedOptions: "Adapted options",
    planGoal: "Plan the goal",
    goalName: "Goal name",
    targetAmount: "Target amount",
    currentAmount: "Amount already available",
    targetDate: "Target date",
    quickAnalysis: "Quick analysis",
    progress: "Progress",
    remaining: "Remaining",
    createGoal: "Create goal",
    activeGoals: "My active goals",
    noGoal: "No active goal yet.",
    remainingToGet: "Remaining to collect",
    mainGoal: "Main goal",
    setMain: "Highlight",
    project: "Project",
    auto: "Car",
    house: "Home",
    travel: "Travel",
    family: "Family",
    freedom: "Financial freedom",
    business: "Project / business",
  },

  ES: {
    subtitle: "Elige una categoría y luego el tipo exacto de proyecto.",
    smartCategories: "Categorías inteligentes",
    adaptedOptions: "Opciones adaptadas",
    planGoal: "Planificar el objetivo",
    goalName: "Nombre del objetivo",
    targetAmount: "Monto objetivo",
    currentAmount: "Monto ya disponible",
    targetDate: "Fecha objetivo",
    quickAnalysis: "Análisis rápido",
    progress: "Progreso",
    remaining: "Restante",
    createGoal: "Crear objetivo",
    activeGoals: "Mis objetivos activos",
    noGoal: "No hay objetivos activos por ahora.",
    remainingToGet: "Restante por conseguir",
    mainGoal: "Objetivo principal",
    setMain: "Destacar",
    project: "Proyecto",
    auto: "Auto",
    house: "Casa",
    travel: "Viaje",
    family: "Familia",
    freedom: "Libertad financiera",
    business: "Proyecto / negocio",
  },
};

const categoryLabels = {
  FR: {
    auto: "Auto",
    maison: "Maison",
    voyage: "Voyage",
    famille: "Famille",
    liberte: "Liberté financière",
    business: "Projet / business",
  },
  EN: {
    auto: "Car",
    maison: "Home",
    voyage: "Travel",
    famille: "Family",
    liberte: "Financial freedom",
    business: "Project / business",
  },
  ES: {
    auto: "Auto",
    maison: "Casa",
    voyage: "Viaje",
    famille: "Familia",
    liberte: "Libertad financiera",
    business: "Proyecto / negocio",
  },
};

const optionLabels = {
  FR: {
    auto: [
      "Achat comptant",
      "Financement",
      "Location",
      "Mise de fonds",
      "Réparation majeure",
      "Remplacement",
    ],
    maison: [
      "Mise de fonds",
      "Achat",
      "Construction",
      "Rénovation",
      "Hypothèque",
      "Meubles / électros",
    ],
    voyage: ["Guinée", "Vacances", "Billet", "Dépenses sur place", "Famille"],
    famille: [
      "Soutien familial",
      "Études enfants",
      "Mariage",
      "Regroupement familial",
    ],
    liberte: [
      "Fonds d’urgence",
      "Dette zéro",
      "Épargne long terme",
      "Investissement",
      "Revenus passifs",
    ],
    business: ["Commerce", "Formation", "Matériel", "Lancement", "Croissance"],
  },

  EN: {
    auto: [
      "Cash purchase",
      "Financing",
      "Lease",
      "Down payment",
      "Major repair",
      "Replacement",
    ],
    maison: [
      "Down payment",
      "Purchase",
      "Construction",
      "Renovation",
      "Mortgage",
      "Furniture / appliances",
    ],
    voyage: ["Guinea", "Vacation", "Ticket", "On-site expenses", "Family"],
    famille: [
      "Family support",
      "Children education",
      "Wedding",
      "Family reunification",
    ],
    liberte: [
      "Emergency fund",
      "Debt zero",
      "Long-term savings",
      "Investment",
      "Passive income",
    ],
    business: ["Business", "Training", "Equipment", "Launch", "Growth"],
  },

  ES: {
    auto: [
      "Compra al contado",
      "Financiamiento",
      "Alquiler",
      "Pago inicial",
      "Reparación mayor",
      "Reemplazo",
    ],
    maison: [
      "Pago inicial",
      "Compra",
      "Construcción",
      "Renovación",
      "Hipoteca",
      "Muebles / electrodomésticos",
    ],
    voyage: ["Guinea", "Vacaciones", "Boleto", "Gastos en destino", "Familia"],
    famille: [
      "Apoyo familiar",
      "Estudios de hijos",
      "Matrimonio",
      "Reagrupación familiar",
    ],
    liberte: [
      "Fondo de emergencia",
      "Deuda cero",
      "Ahorro a largo plazo",
      "Inversión",
      "Ingresos pasivos",
    ],
    business: ["Comercio", "Formación", "Material", "Lanzamiento", "Crecimiento"],
  },
};

function getCategories(language) {
  const labels = categoryLabels[language] || categoryLabels.FR;
  const options = optionLabels[language] || optionLabels.FR;

  return [
    {
      id: "auto",
      label: labels.auto,
      icon: <Car />,
      color: "var(--blue)",
      options: options.auto,
    },
    {
      id: "maison",
      label: labels.maison,
      icon: <Home />,
      color: "var(--green)",
      options: options.maison,
    },
    {
      id: "voyage",
      label: labels.voyage,
      icon: <Plane />,
      color: "var(--gold)",
      options: options.voyage,
    },
    {
      id: "famille",
      label: labels.famille,
      icon: <Users />,
      color: "var(--purple)",
      options: options.famille,
    },
    {
      id: "liberte",
      label: labels.liberte,
      icon: <PiggyBank />,
      color: "var(--green)",
      options: options.liberte,
    },
    {
      id: "business",
      label: labels.business,
      icon: <Briefcase />,
      color: "var(--blue)",
      options: options.business,
    },
  ];
}

function Objectifs({ selectedGoals, setSelectedGoals, settings }) {
  const t = getText(settings);
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;
  const currency = settings?.currency || "CAD";
  const categories = getCategories(language);

  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "auto",
    option: categories[0].options[0],
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    highlighted: false,
  });

  const selectedCategory =
    categories.find((category) => category.id === newGoal.category) ||
    categories[0];

  function selectCategory(category) {
    setNewGoal({
      ...newGoal,
      category: category.id,
      option: category.options[0],
      title: category.options[0],
    });
  }

  function selectOption(option) {
    setNewGoal({
      ...newGoal,
      option,
      title: option,
    });
  }

  function addGoal() {
    if (!newGoal.title || !newGoal.targetAmount) return;

    const shouldHighlight =
      selectedGoals.length === 0 || Boolean(newGoal.highlighted);

    const updatedGoals = selectedGoals.map((goal) => ({
      ...goal,
      highlighted: shouldHighlight ? false : goal.highlighted,
    }));

    setSelectedGoals([
      ...updatedGoals,
      {
        id: Date.now(),
        title: newGoal.title,
        category: newGoal.category,
        option: newGoal.option,
        targetAmount: Number(newGoal.targetAmount || 0),
        currentAmount: Number(newGoal.currentAmount || 0),
        targetDate: newGoal.targetDate,
        highlighted: shouldHighlight,
        archived: false,
      },
    ]);

    setNewGoal({
      title: "",
      category: "auto",
      option: categories[0].options[0],
      targetAmount: "",
      currentAmount: "",
      targetDate: "",
      highlighted: false,
    });
  }

  function removeGoal(id) {
    setSelectedGoals(selectedGoals.filter((goal) => goal.id !== id));
  }

  function highlightGoal(id) {
    setSelectedGoals(
      selectedGoals.map((goal) => ({
        ...goal,
        highlighted: goal.id === id,
      }))
    );
  }

  return (
    <div>
      <h1>{t.objectifs}</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={card}>
        <div style={header}>
          <Target color="var(--gold)" />
          <h2>{p.smartCategories}</h2>
        </div>

        <div style={categoryGrid}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => selectCategory(category)}
              style={{
                ...categoryTile,
                borderColor:
                  newGoal.category === category.id
                    ? category.color
                    : "var(--border)",
              }}
            >
              <span style={{ color: category.color }}>{category.icon}</span>
              <strong>{category.label}</strong>
            </button>
          ))}
        </div>
      </section>

      <section style={{ ...card, borderColor: selectedCategory.color }}>
        <div style={header}>
          <Hammer color={selectedCategory.color} />
          <h2>
            {p.adaptedOptions} : {selectedCategory.label}
          </h2>
        </div>

        <div style={optionGrid}>
          {selectedCategory.options.map((option) => (
            <button
              key={option}
              onClick={() => selectOption(option)}
              style={{
                ...optionTile,
                borderColor:
                  newGoal.option === option
                    ? selectedCategory.color
                    : "var(--border)",
              }}
            >
              {newGoal.option === option ? "✓ " : ""}
              {option}
            </button>
          ))}
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <Plus color="var(--green)" />
          <h2>{p.planGoal}</h2>
        </div>

        <label>{p.goalName}</label>
        <input
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          placeholder={selectedCategory.options[0]}
          style={input}
        />

        <label>{p.targetAmount}</label>
        <input
          value={newGoal.targetAmount}
          onChange={(e) =>
            setNewGoal({
              ...newGoal,
              targetAmount: cleanMoneyInput(e.target.value),
            })
          }
          placeholder="10000"
          inputMode="decimal"
          style={input}
        />

        <label>{p.currentAmount}</label>
        <input
          value={newGoal.currentAmount}
          onChange={(e) =>
            setNewGoal({
              ...newGoal,
              currentAmount: cleanMoneyInput(e.target.value),
            })
          }
          placeholder="1500"
          inputMode="decimal"
          style={input}
        />

        <label>{p.targetDate}</label>
        <input
          type="date"
          value={newGoal.targetDate}
          onChange={(e) =>
            setNewGoal({ ...newGoal, targetDate: e.target.value })
          }
          style={input}
        />

        <button
          onClick={() =>
            setNewGoal({ ...newGoal, highlighted: !newGoal.highlighted })
          }
          style={{
            ...highlightBtn,
            borderColor: newGoal.highlighted ? "var(--gold)" : "var(--border)",
            background: newGoal.highlighted
              ? "rgba(212,175,55,.14)"
              : "var(--bg-panel)",
          }}
        >
          <Star size={17} />
          {newGoal.highlighted ? p.mainGoal : p.setMain}
        </button>

        <Preview goal={newGoal} currency={currency} text={p} />

        <button onClick={addGoal} style={addButton}>
          {p.createGoal}
        </button>
      </section>

      <section style={card}>
        <div style={header}>
          <Calendar color="var(--purple)" />
          <h2>{p.activeGoals}</h2>
        </div>

        {selectedGoals.length === 0 && <p style={muted}>{p.noGoal}</p>}

        {selectedGoals.map((goal) => {
          const category =
            categories.find((item) => item.id === goal.category) ||
            categories[0];

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

          return (
            <div
              key={goal.id}
              style={{ ...goalCard, borderColor: category.color }}
            >
              <div style={goalHeader}>
                <span style={{ color: category.color }}>{category.icon}</span>

                <div>
                  <strong>
                    {goal.highlighted ? "⭐ " : ""}
                    {goal.title}
                  </strong>
                  <p style={mutedSmall}>
                    {category.label} • {goal.option || p.project}
                  </p>
                </div>

                <button onClick={() => removeGoal(goal.id)} style={trashButton}>
                  <Trash2 size={16} />
                </button>
              </div>

              <div style={amountRow}>
                <span>{formatMoney(goal.currentAmount, currency)}</span>
                <strong>{formatMoney(goal.targetAmount, currency)}</strong>
              </div>

              <div style={barBg}>
                <div
                  style={{
                    ...barFill,
                    width: `${progress}%`,
                    background: category.color,
                  }}
                />
              </div>

              <p style={mutedSmall}>
                {p.progress} : {progress}%
              </p>

              <p style={mutedSmall}>
                {p.remainingToGet} : {formatMoney(remaining, currency)}
              </p>

              {goal.targetDate && (
                <p style={mutedSmall}>
                  {p.targetDate} : {goal.targetDate}
                </p>
              )}

              {!goal.highlighted && (
                <button
                  onClick={() => highlightGoal(goal.id)}
                  style={smallGoldBtn}
                >
                  {p.setMain}
                </button>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}

function Preview({ goal, currency, text }) {
  const target = Number(goal.targetAmount || 0);
  const current = Number(goal.currentAmount || 0);
  const remaining = Math.max(0, target - current);
  const progress =
    target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  return (
    <div style={preview}>
      <HeartHandshake color="var(--gold)" />
      <div>
        <strong>{text.quickAnalysis}</strong>
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
  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
  gap: "10px",
};

const categoryTile = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "14px",
  color: "var(--text-main)",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  alignItems: "flex-start",
};

const optionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "10px",
};

const optionTile = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "13px",
  color: "var(--text-main)",
  textAlign: "left",
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
};

const goalCard = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
  marginTop: "12px",
};

const goalHeader = {
  display: "grid",
  gridTemplateColumns: "32px 1fr auto",
  gap: "10px",
  alignItems: "center",
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

const trashButton = {
  border: "1px solid var(--red)",
  background: "transparent",
  color: "var(--red)",
  borderRadius: "10px",
  padding: "6px",
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