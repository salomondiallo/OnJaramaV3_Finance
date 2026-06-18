import { useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  Flame,
  Home,
  PiggyBank,
  Plus,
  ShieldCheck,
  Trash2,
  Wallet,
} from "lucide-react";
import { cleanMoneyInput, formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    subtitle: "Comprendre l’origine et la destination de chaque dollar.",
    health: "Santé financière",
    incomeOrigin: "Origine des fonds",
    moneyDestination: "Destination des fonds",
    savingsProjects: "Épargne et projets",
    editableDebts: "Dettes modifiables",
    noDebt: "Aucune dette enregistrée.",
    addDebt: "Ajouter une dette",
    debtName: "Nom de la dette",
    balance: "Solde",
    rate: "Taux %",
    minimumPayment: "Paiement minimum",
    nextAction: "Prochaine action recommandée",
    viewPath: "Voir mon parcours",
    openSimulator: "Ouvrir le simulateur",
    priority: "Priorité actuelle",
    becauseRate: "car son taux est de",
    addPriority: "Ajoutez une dette ou un objectif pour générer une priorité.",
    income: "Revenus",
    totalOut: "Sorties totales",
    totalDebts: "Dettes totales",
    available: "Disponible",
    good: "Bonne stabilité financière",
    stable: "Situation stable mais à surveiller",
    fragile: "Situation fragile",
    control: "Priorité : reprendre le contrôle",
  },

  EN: {
    subtitle: "Understand where your money comes from and where it goes.",
    health: "Financial health",
    incomeOrigin: "Source of funds",
    moneyDestination: "Money destination",
    savingsProjects: "Savings and projects",
    editableDebts: "Editable debts",
    noDebt: "No debt registered.",
    addDebt: "Add debt",
    debtName: "Debt name",
    balance: "Balance",
    rate: "Rate %",
    minimumPayment: "Minimum payment",
    nextAction: "Recommended next action",
    viewPath: "View my path",
    openSimulator: "Open simulator",
    priority: "Current priority",
    becauseRate: "because its rate is",
    addPriority: "Add a debt or goal to generate a priority.",
    income: "Income",
    totalOut: "Total outgoing",
    totalDebts: "Total debts",
    available: "Available",
    good: "Good financial stability",
    stable: "Stable situation but needs monitoring",
    fragile: "Fragile situation",
    control: "Priority: regain control",
  },

  ES: {
    subtitle: "Comprender de dónde viene tu dinero y hacia dónde va.",
    health: "Salud financiera",
    incomeOrigin: "Origen de los fondos",
    moneyDestination: "Destino del dinero",
    savingsProjects: "Ahorro y proyectos",
    editableDebts: "Deudas modificables",
    noDebt: "No hay deuda registrada.",
    addDebt: "Agregar deuda",
    debtName: "Nombre de la deuda",
    balance: "Saldo",
    rate: "Tasa %",
    minimumPayment: "Pago mínimo",
    nextAction: "Próxima acción recomendada",
    viewPath: "Ver mi camino",
    openSimulator: "Abrir simulador",
    priority: "Prioridad actual",
    becauseRate: "porque su tasa es de",
    addPriority: "Agrega una deuda u objetivo para generar una prioridad.",
    income: "Ingresos",
    totalOut: "Salidas totales",
    totalDebts: "Deudas totales",
    available: "Disponible",
    good: "Buena estabilidad financiera",
    stable: "Situación estable pero a vigilar",
    fragile: "Situación frágil",
    control: "Prioridad: recuperar el control",
  },
};

function Situation({ financeData, setFinanceData, settings, setCurrentPage }) {
  const t = getText(settings);
  const p = pageText[settings?.language || "FR"] || pageText.FR;
  const currency = settings?.currency || "CAD";

  const [details, setDetails] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("onjaramaSituationDetails")) ||
        getDefaultDetails(settings?.language || "FR")
      );
    } catch {
      return getDefaultDetails(settings?.language || "FR");
    }
  });

  const [newDebt, setNewDebt] = useState({
    name: "",
    type: "Carte de crédit",
    balance: "",
    interestRate: "",
    minimumPayment: "",
  });

  const incomeTotal = sum(details.incomes);
  const expensesTotal = sum(details.expenses);
  const savingsTotal = sum(details.savings);

  const totalDebt = financeData.debts.reduce(
    (sumValue, debt) => sumValue + Number(debt.balance || 0),
    0
  );

  const minimumDebtPayments = financeData.debts.reduce(
    (sumValue, debt) => sumValue + Number(debt.minimumPayment || 0),
    0
  );

  const totalOutgoing = expensesTotal + savingsTotal + minimumDebtPayments;
  const available = incomeTotal - totalOutgoing;

  const priorityDebt = [...financeData.debts]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort(
      (a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0)
    )[0];

  const score = useMemo(
    () =>
      calculateScore({
        income: incomeTotal,
        expenses: expensesTotal,
        savings: savingsTotal,
        totalDebt,
        available,
        p,
      }),
    [incomeTotal, expensesTotal, savingsTotal, totalDebt, available, p]
  );

  useEffect(() => {
    localStorage.setItem("onjaramaSituationDetails", JSON.stringify(details));

    setFinanceData((previous) => ({
      ...previous,
      overview: {
        ...previous.overview,
        monthlyIncome: incomeTotal,
        monthlyExpenses: expensesTotal + minimumDebtPayments,
        monthlySavings: savingsTotal,
      },
    }));
  }, [
    details,
    incomeTotal,
    expensesTotal,
    savingsTotal,
    minimumDebtPayments,
    setFinanceData,
  ]);

  function updateCategory(group, id, value) {
    setDetails({
      ...details,
      [group]: details[group].map((item) =>
        item.id === id
          ? { ...item, amount: Number(cleanMoneyInput(value) || 0) }
          : item
      ),
    });
  }

  function updateDebt(index, field, value) {
    const updatedDebts = financeData.debts.map((debt, debtIndex) => {
      if (debtIndex !== index) return debt;

      return {
        ...debt,
        [field]:
          field === "name" || field === "type"
            ? value
            : Number(cleanMoneyInput(value) || 0),
      };
    });

    setFinanceData({ ...financeData, debts: updatedDebts });
  }

  function addDebt() {
    if (!newDebt.name || !newDebt.balance) return;

    setFinanceData({
      ...financeData,
      debts: [
        ...financeData.debts,
        {
          name: newDebt.name,
          type: newDebt.type,
          balance: Number(newDebt.balance || 0),
          interestRate: Number(newDebt.interestRate || 0),
          minimumPayment: Number(newDebt.minimumPayment || 0),
        },
      ],
    });

    setNewDebt({
      name: "",
      type: "Carte de crédit",
      balance: "",
      interestRate: "",
      minimumPayment: "",
    });
  }

  function removeDebt(indexToRemove) {
    setFinanceData({
      ...financeData,
      debts: financeData.debts.filter((_, index) => index !== indexToRemove),
    });
  }

  return (
    <div className="native-page">
      <h1>{t.situation}</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={scoreCard}>
        <ShieldCheck color={score.color} size={34} />
        <p style={muted}>{p.health}</p>

        <h1 style={{ color: score.color }}>{score.value}/100</h1>

        <p style={muted}>{score.label}</p>

        <div style={barBg}>
          <div
            style={{
              ...barFill,
              width: `${score.value}%`,
              background: score.color,
            }}
          />
        </div>
      </section>

      <div className="grid-2" style={grid}>
        <InfoCard
          title={p.income}
          value={formatMoney(incomeTotal, currency)}
          icon={<Wallet />}
          color="var(--green)"
        />

        <InfoCard
          title={p.totalOut}
          value={formatMoney(totalOutgoing, currency)}
          icon={<Home />}
          color="var(--red)"
        />

        <InfoCard
          title={p.totalDebts}
          value={formatMoney(totalDebt, currency)}
          icon={<CreditCard />}
          color="var(--red)"
        />

        <InfoCard
          title={p.available}
          value={formatMoney(available, currency)}
          icon={<PiggyBank />}
          color={available >= 0 ? "var(--green)" : "var(--red)"}
        />
      </div>

      <CategorySection
        title={p.incomeOrigin}
        icon={<Wallet color="var(--green)" />}
        items={details.incomes}
        currency={currency}
        onChange={(id, value) => updateCategory("incomes", id, value)}
      />

      <CategorySection
        title={p.moneyDestination}
        icon={<Home color="var(--gold)" />}
        items={details.expenses}
        currency={currency}
        onChange={(id, value) => updateCategory("expenses", id, value)}
      />

      <CategorySection
        title={p.savingsProjects}
        icon={<PiggyBank color="var(--green)" />}
        items={details.savings}
        currency={currency}
        onChange={(id, value) => updateCategory("savings", id, value)}
      />

      <section style={card}>
        <div style={header}>
          <CreditCard color="var(--red)" />
          <h2>{p.editableDebts}</h2>
        </div>

        {financeData.debts.length === 0 && <p style={muted}>{p.noDebt}</p>}

        {financeData.debts.map((debt, index) => (
          <div key={`${debt.name}-${index}`} style={debtCard}>
            <input
              value={debt.name}
              onChange={(event) => updateDebt(index, "name", event.target.value)}
              style={input}
              placeholder={p.debtName}
            />

            <select
              value={debt.type || "Autre"}
              onChange={(event) => updateDebt(index, "type", event.target.value)}
              style={input}
            >
              <option>Carte de crédit</option>
              <option>Marge de crédit</option>
              <option>Prêt personnel</option>
              <option>Financement</option>
              <option>Hypothèque</option>
              <option>Auto</option>
              <option>Autre</option>
            </select>

            <input
              value={debt.balance || ""}
              onChange={(event) =>
                updateDebt(index, "balance", event.target.value)
              }
              style={input}
              inputMode="decimal"
              placeholder={p.balance}
            />

            <input
              value={debt.interestRate || ""}
              onChange={(event) =>
                updateDebt(index, "interestRate", event.target.value)
              }
              style={input}
              inputMode="decimal"
              placeholder={p.rate}
            />

            <input
              value={debt.minimumPayment || ""}
              onChange={(event) =>
                updateDebt(index, "minimumPayment", event.target.value)
              }
              style={input}
              inputMode="decimal"
              placeholder={p.minimumPayment}
            />

            <div style={debtBottom}>
              <strong>{formatMoney(debt.balance, currency)}</strong>

              <button onClick={() => removeDebt(index)} style={trashButton}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </section>

      <section style={card}>
        <div style={header}>
          <Plus color="var(--green)" />
          <h2>{p.addDebt}</h2>
        </div>

        <input
          value={newDebt.name}
          onChange={(event) =>
            setNewDebt({ ...newDebt, name: event.target.value })
          }
          style={input}
          placeholder="Fairstone, Modulo, Visa"
        />

        <select
          value={newDebt.type}
          onChange={(event) =>
            setNewDebt({ ...newDebt, type: event.target.value })
          }
          style={input}
        >
          <option>Carte de crédit</option>
          <option>Marge de crédit</option>
          <option>Prêt personnel</option>
          <option>Financement</option>
          <option>Hypothèque</option>
          <option>Auto</option>
          <option>Autre</option>
        </select>

        <input
          value={newDebt.balance}
          onChange={(event) =>
            setNewDebt({
              ...newDebt,
              balance: cleanMoneyInput(event.target.value),
            })
          }
          style={input}
          inputMode="decimal"
          placeholder={p.balance}
        />

        <input
          value={newDebt.interestRate}
          onChange={(event) =>
            setNewDebt({
              ...newDebt,
              interestRate: cleanMoneyInput(event.target.value),
            })
          }
          style={input}
          inputMode="decimal"
          placeholder={p.rate}
        />

        <input
          value={newDebt.minimumPayment}
          onChange={(event) =>
            setNewDebt({
              ...newDebt,
              minimumPayment: cleanMoneyInput(event.target.value),
            })
          }
          style={input}
          inputMode="decimal"
          placeholder={p.minimumPayment}
        />

        <button onClick={addDebt} style={addButton}>
          {p.addDebt}
        </button>
      </section>

      <section style={priorityCard}>
        <Flame color="var(--gold)" />
        <h2>{p.nextAction}</h2>

        <p style={muted}>
          {priorityDebt
            ? `${p.priority} : ${priorityDebt.name}, ${p.becauseRate} ${priorityDebt.interestRate} %.`
            : p.addPriority}
        </p>

        <div style={actions}>
          <button onClick={() => setCurrentPage("parcours")} style={aiButton}>
            {p.viewPath}
          </button>

          <button
            onClick={() => setCurrentPage("simulateur")}
            style={simulatorButton}
          >
            {p.openSimulator}
          </button>
        </div>
      </section>
    </div>
  );
}

function getDefaultDetails(language) {
  const labels = {
    FR: {
      salary: "Salaire / revenu principal",
      otherIncome: "Autres revenus",
      housing: "Logement / hypothèque / loyer",
      insuranceHome: "Assurance habitation",
      insuranceCar: "Assurance automobile",
      insuranceLife: "Assurance vie / hypothécaire",
      transport: "Transport",
      food: "Épicerie / nourriture",
      family: "Soutien familial",
      subscriptions: "Abonnements",
      utilities: "Électricité / téléphone / internet",
      otherExpenses: "Autres dépenses",
      emergency: "Fonds d’urgence",
      projects: "Épargne projets",
    },
    EN: {
      salary: "Salary / main income",
      otherIncome: "Other income",
      housing: "Housing / mortgage / rent",
      insuranceHome: "Home insurance",
      insuranceCar: "Car insurance",
      insuranceLife: "Life / mortgage insurance",
      transport: "Transportation",
      food: "Groceries / food",
      family: "Family support",
      subscriptions: "Subscriptions",
      utilities: "Electricity / phone / internet",
      otherExpenses: "Other expenses",
      emergency: "Emergency fund",
      projects: "Project savings",
    },
    ES: {
      salary: "Salario / ingreso principal",
      otherIncome: "Otros ingresos",
      housing: "Vivienda / hipoteca / alquiler",
      insuranceHome: "Seguro de vivienda",
      insuranceCar: "Seguro de auto",
      insuranceLife: "Seguro de vida / hipotecario",
      transport: "Transporte",
      food: "Comida / supermercado",
      family: "Apoyo familiar",
      subscriptions: "Suscripciones",
      utilities: "Electricidad / teléfono / internet",
      otherExpenses: "Otros gastos",
      emergency: "Fondo de emergencia",
      projects: "Ahorro para proyectos",
    },
  };

  const l = labels[language] || labels.FR;

  return {
    incomes: [
      { id: "salary", label: l.salary, amount: 0 },
      { id: "otherIncome", label: l.otherIncome, amount: 0 },
    ],
    expenses: [
      { id: "housing", label: l.housing, amount: 0 },
      { id: "insuranceHome", label: l.insuranceHome, amount: 0 },
      { id: "insuranceCar", label: l.insuranceCar, amount: 0 },
      { id: "insuranceLife", label: l.insuranceLife, amount: 0 },
      { id: "transport", label: l.transport, amount: 0 },
      { id: "food", label: l.food, amount: 0 },
      { id: "family", label: l.family, amount: 0 },
      { id: "subscriptions", label: l.subscriptions, amount: 0 },
      { id: "utilities", label: l.utilities, amount: 0 },
      { id: "otherExpenses", label: l.otherExpenses, amount: 0 },
    ],
    savings: [
      { id: "emergency", label: l.emergency, amount: 0 },
      { id: "projects", label: l.projects, amount: 0 },
    ],
  };
}

function CategorySection({ title, icon, items, currency, onChange }) {
  return (
    <section style={card}>
      <div style={header}>
        {icon}
        <h2>{title}</h2>
      </div>

      {items.map((item) => (
        <div key={item.id} style={categoryRow}>
          <label>{item.label}</label>

          <input
            value={item.amount || ""}
            onChange={(event) => onChange(item.id, event.target.value)}
            inputMode="decimal"
            placeholder={`0 ${currency}`}
            style={input}
          />
        </div>
      ))}
    </section>
  );
}

function InfoCard({ icon, title, value, color }) {
  return (
    <div style={{ ...infoCard, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <p style={mutedSmall}>{title}</p>
      <strong>{value}</strong>
    </div>
  );
}

function sum(items) {
  return items.reduce((total, item) => total + Number(item.amount || 0), 0);
}

function calculateScore({ income, expenses, savings, totalDebt, available, p }) {
  let score = 50;

  if (income > 0) score += 10;
  if (available > 0) score += 15;
  if (savings > 0) score += 10;
  if (totalDebt === 0) score += 10;
  if (totalDebt > income * 6 && income > 0) score -= 20;
  if (expenses > income && income > 0) score -= 15;
  if (available < 0) score -= 25;

  const value = Math.max(0, Math.min(100, score));

  if (value >= 80) return { value, label: p.good, color: "var(--green)" };
  if (value >= 60) return { value, label: p.stable, color: "var(--gold)" };
  if (value >= 40) return { value, label: p.fragile, color: "var(--red)" };

  return { value, label: p.control, color: "var(--red)" };
}

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const scoreCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.16), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "24px",
  padding: "22px",
  marginTop: "20px",
};

const priorityCard = {
  background: "linear-gradient(135deg,#2a210b,var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const grid = {
  gap: "12px",
  marginTop: "18px",
};

const infoCard = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "14px",
};

const categoryRow = {
  marginTop: "12px",
};

const input = {
  display: "block",
  width: "100%",
  marginTop: "8px",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
};

const debtCard = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "14px",
  marginTop: "12px",
};

const debtBottom = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "10px",
};

const trashButton = {
  border: "1px solid var(--red)",
  background: "transparent",
  color: "var(--red)",
  borderRadius: "10px",
  padding: "7px",
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

const actions = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "10px",
  marginTop: "14px",
};

const aiButton = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(90deg,var(--purple),var(--blue))",
  color: "white",
  fontWeight: "bold",
};

const simulatorButton = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  fontWeight: "bold",
};

const barBg = {
  height: "10px",
  background: "var(--bg-panel)",
  borderRadius: "999px",
  marginTop: "14px",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
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

export default Situation;