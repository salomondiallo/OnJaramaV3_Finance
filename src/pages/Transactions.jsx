import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  CreditCard,
  PiggyBank,
  Plus,
  RefreshCcw,
  Trash2,
  Wallet,
} from "lucide-react";
import { cleanMoneyInput, formatMoney } from "../utils/formatters";

const pageText = {
  FR: {
    title: "Transactions",
    subtitle: "Suivez les entrées et sorties d’argent pour comprendre votre flux réel.",
    addTransaction: "Ajouter une transaction",
    transactionList: "Historique des transactions",
    income: "Entrées",
    expense: "Sorties",
    savings: "Épargne",
    debt: "Dette",
    amount: "Montant",
    name: "Nom",
    type: "Type",
    category: "Catégorie",
    date: "Date",
    note: "Note",
    totalIncome: "Total entrées",
    totalExpenses: "Total sorties",
    netFlow: "Flux net",
    transactionCount: "Transactions",
    noTransaction: "Aucune transaction enregistrée.",
    save: "Ajouter",
    resetForm: "Réinitialiser",
    salary: "Salaire",
    otherIncome: "Autres revenus",
    housing: "Logement / hypothèque",
    insurance: "Assurance",
    transport: "Transport",
    food: "Nourriture",
    family: "Famille",
    subscription: "Abonnement",
    debtPayment: "Paiement dette",
    project: "Projet",
    other: "Autre",
  },

  EN: {
    title: "Transactions",
    subtitle: "Track money in and out to understand your real cash flow.",
    addTransaction: "Add transaction",
    transactionList: "Transaction history",
    income: "Income",
    expense: "Expenses",
    savings: "Savings",
    debt: "Debt",
    amount: "Amount",
    name: "Name",
    type: "Type",
    category: "Category",
    date: "Date",
    note: "Note",
    totalIncome: "Total income",
    totalExpenses: "Total expenses",
    netFlow: "Net flow",
    transactionCount: "Transactions",
    noTransaction: "No transaction registered.",
    save: "Add",
    resetForm: "Reset",
    salary: "Salary",
    otherIncome: "Other income",
    housing: "Housing / mortgage",
    insurance: "Insurance",
    transport: "Transport",
    food: "Food",
    family: "Family",
    subscription: "Subscription",
    debtPayment: "Debt payment",
    project: "Project",
    other: "Other",
  },

  ES: {
    title: "Transacciones",
    subtitle: "Sigue entradas y salidas de dinero para entender tu flujo real.",
    addTransaction: "Agregar transacción",
    transactionList: "Historial de transacciones",
    income: "Entradas",
    expense: "Salidas",
    savings: "Ahorro",
    debt: "Deuda",
    amount: "Monto",
    name: "Nombre",
    type: "Tipo",
    category: "Categoría",
    date: "Fecha",
    note: "Nota",
    totalIncome: "Total entradas",
    totalExpenses: "Total salidas",
    netFlow: "Flujo neto",
    transactionCount: "Transacciones",
    noTransaction: "No hay transacciones registradas.",
    save: "Agregar",
    resetForm: "Restablecer",
    salary: "Salario",
    otherIncome: "Otros ingresos",
    housing: "Vivienda / hipoteca",
    insurance: "Seguro",
    transport: "Transporte",
    food: "Comida",
    family: "Familia",
    subscription: "Suscripción",
    debtPayment: "Pago de deuda",
    project: "Proyecto",
    other: "Otro",
  },
};

const emptyTransaction = {
  name: "",
  type: "expense",
  category: "food",
  amount: "",
  date: "",
  note: "",
};

function Transactions({ settings }) {
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;
  const currency = settings?.currency || "CAD";

  const [transactions, setTransactions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("onjaramaTransactions")) || [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState(emptyTransaction);

  useEffect(() => {
    localStorage.setItem("onjaramaTransactions", JSON.stringify(transactions));
  }, [transactions]);

  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        const amount = Number(transaction.amount || 0);

        if (transaction.type === "income") acc.income += amount;
        if (transaction.type === "expense") acc.expenses += amount;
        if (transaction.type === "savings") acc.savings += amount;
        if (transaction.type === "debt") acc.debt += amount;

        return acc;
      },
      { income: 0, expenses: 0, savings: 0, debt: 0 }
    );
  }, [transactions]);

  const netFlow = totals.income - totals.expenses - totals.savings - totals.debt;

  function addTransaction() {
    if (!form.name || !form.amount) return;

    setTransactions([
      {
        ...form,
        id: Date.now(),
        amount: Number(form.amount || 0),
        date: form.date || new Date().toISOString().slice(0, 10),
      },
      ...transactions,
    ]);

    setForm(emptyTransaction);
  }

  function removeTransaction(id) {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  }

  function categories() {
    return [
      { id: "salary", label: p.salary },
      { id: "otherIncome", label: p.otherIncome },
      { id: "housing", label: p.housing },
      { id: "insurance", label: p.insurance },
      { id: "transport", label: p.transport },
      { id: "food", label: p.food },
      { id: "family", label: p.family },
      { id: "subscription", label: p.subscription },
      { id: "debtPayment", label: p.debtPayment },
      { id: "project", label: p.project },
      { id: "other", label: p.other },
    ];
  }

  return (
    <div>
      <h1>{p.title}</h1>
      <p style={muted}>{p.subtitle}</p>

      <div className="grid-2" style={grid}>
        <InfoCard
          icon={<ArrowUpCircle />}
          title={p.totalIncome}
          value={formatMoney(totals.income, currency)}
          color="var(--green)"
        />

        <InfoCard
          icon={<ArrowDownCircle />}
          title={p.totalExpenses}
          value={formatMoney(totals.expenses + totals.savings + totals.debt, currency)}
          color="var(--red)"
        />

        <InfoCard
          icon={<Wallet />}
          title={p.netFlow}
          value={formatMoney(netFlow, currency)}
          color={netFlow >= 0 ? "var(--green)" : "var(--red)"}
        />

        <InfoCard
          icon={<Calendar />}
          title={p.transactionCount}
          value={transactions.length}
          color="var(--gold)"
        />
      </div>

      <section style={card}>
        <div style={header}>
          <Plus color="var(--green)" />
          <h2>{p.addTransaction}</h2>
        </div>

        <label>{p.name}</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Épicerie, paie, Fairstone..."
          style={input}
        />

        <label>{p.type}</label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          style={input}
        >
          <option value="income">{p.income}</option>
          <option value="expense">{p.expense}</option>
          <option value="savings">{p.savings}</option>
          <option value="debt">{p.debt}</option>
        </select>

        <label>{p.category}</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          style={input}
        >
          {categories().map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>

        <label>{p.amount}</label>
        <input
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: cleanMoneyInput(e.target.value) })
          }
          inputMode="decimal"
          placeholder="100"
          style={input}
        />

        <label>{p.date}</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={input}
        />

        <label>{p.note}</label>
        <textarea
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          placeholder="Optionnel"
          style={{ ...input, minHeight: "90px" }}
        />

        <div style={actions}>
          <button onClick={addTransaction} style={addButton}>
            {p.save}
          </button>

          <button onClick={() => setForm(emptyTransaction)} style={secondaryBtn}>
            <RefreshCcw size={16} /> {p.resetForm}
          </button>
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <CreditCard color="var(--gold)" />
          <h2>{p.transactionList}</h2>
        </div>

        {transactions.length === 0 && <p style={muted}>{p.noTransaction}</p>}

        {transactions.map((transaction) => (
          <div key={transaction.id} style={transactionCard}>
            <div style={transactionHeader}>
              <div>
                <strong>{transaction.name}</strong>
                <p style={mutedSmall}>
                  {getTypeLabel(transaction.type, p)} •{" "}
                  {getCategoryLabel(transaction.category, categories())}
                </p>
              </div>

              <strong
                style={{
                  color:
                    transaction.type === "income"
                      ? "var(--green)"
                      : "var(--red)",
                }}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatMoney(transaction.amount, currency)}
              </strong>
            </div>

            <p style={mutedSmall}>{transaction.date || "—"}</p>

            {transaction.note && <p style={mutedSmall}>{transaction.note}</p>}

            <button
              onClick={() => removeTransaction(transaction.id)}
              style={trashButton}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

function getTypeLabel(type, p) {
  if (type === "income") return p.income;
  if (type === "savings") return p.savings;
  if (type === "debt") return p.debt;
  return p.expense;
}

function getCategoryLabel(categoryId, categories) {
  return categories.find((category) => category.id === categoryId)?.label || categoryId;
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

const grid = {
  gap: "12px",
  marginTop: "18px",
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

const actions = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "12px",
};

const addButton = {
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
};

const secondaryBtn = {
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
};

const infoCard = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
};

const transactionCard = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
  marginTop: "12px",
};

const transactionHeader = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};

const trashButton = {
  marginTop: "12px",
  border: "1px solid var(--red)",
  background: "transparent",
  color: "var(--red)",
  borderRadius: "13px",
  padding: "10px",
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

export default Transactions;