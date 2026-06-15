import { AlertTriangle, CreditCard, Flame, Plus, Trash2, TrendingDown } from "lucide-react";
import { useState } from "react";

function Dettes({ financeData, setFinanceData }) {
  const [newDebt, setNewDebt] = useState({
    name: "",
    type: "Carte de crédit",
    balance: "",
    interestRate: "",
    minimumPayment: "",
  });

  function cleanMoneyInput(value) {
    const cleaned = value.replace(/[^\d.]/g, "");
    if (cleaned === "") return "";
    return cleaned.replace(/^0+(?=\d)/, "");
  }

  function money(value) {
    return Number(value || 0).toLocaleString("fr-CA", {
      maximumFractionDigits: 2,
    });
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

  const totalDebt = financeData.debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const priorityDebt = [...financeData.debts].sort(
    (a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0)
  )[0];

  const totalMinimum = financeData.debts.reduce(
    (sum, debt) => sum + Number(debt.minimumPayment || 0),
    0
  );

  return (
    <div>
      <h1>Dettes</h1>
      <p style={muted}>Suivre, prioriser et réduire vos dettes.</p>

      <section style={heroCard}>
        <AlertTriangle color="var(--red)" size={38} />
        <p style={muted}>Dette totale</p>
        <h1 style={{ color: "var(--red)" }}>{money(totalDebt)} $</h1>
        <p style={muted}>Paiements minimums : {money(totalMinimum)} $ / mois</p>
      </section>

      <section style={priorityCard}>
        <Flame color="var(--gold)" size={32} />
        <p style={muted}>Dette prioritaire</p>
        <h2>{priorityDebt?.name || "Aucune dette"}</h2>
        <p style={muted}>
          {priorityDebt
            ? `${priorityDebt.interestRate}% d’intérêt — ${money(priorityDebt.balance)} $ restants`
            : "Ajoutez une dette pour obtenir une priorité automatique."}
        </p>
      </section>

      <section style={card}>
        <div style={header}>
          <CreditCard color="var(--red)" />
          <h2>Mes dettes</h2>
        </div>

        {financeData.debts.map((debt, index) => (
          <div key={`${debt.name}-${index}`} style={debtRow}>
            <div>
              <strong>{debt.name}</strong>
              <p style={mutedSmall}>
                {debt.type} • {debt.interestRate}% • min. {money(debt.minimumPayment)} $
              </p>

              <div style={barBg}>
                <div
                  style={{
                    ...barFill,
                    width: `${Math.min(100, Number(debt.interestRate || 0) * 2)}%`,
                    background:
                      Number(debt.interestRate || 0) >= 20
                        ? "var(--red)"
                        : Number(debt.interestRate || 0) >= 10
                        ? "var(--gold)"
                        : "var(--green)",
                  }}
                />
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <strong>{money(debt.balance)} $</strong>
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
          <h2>Ajouter une dette</h2>
        </div>

        <label>Nom</label>
        <input
          value={newDebt.name}
          onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
          placeholder="Ex : Visa, Fairstone, téléphone"
          style={input}
        />

        <label>Type</label>
        <select
          value={newDebt.type}
          onChange={(e) => setNewDebt({ ...newDebt, type: e.target.value })}
          style={input}
        >
          <option>Carte de crédit</option>
          <option>Marge de crédit</option>
          <option>Prêt personnel</option>
          <option>Auto</option>
          <option>Hypothèque</option>
          <option>Contrat</option>
          <option>Autre</option>
        </select>

        <label>Montant actuel</label>
        <input
          type="text"
          inputMode="decimal"
          value={newDebt.balance}
          onChange={(e) =>
            setNewDebt({ ...newDebt, balance: cleanMoneyInput(e.target.value) })
          }
          placeholder="Ex : 5000"
          style={input}
        />

        <label>Taux d’intérêt %</label>
        <input
          type="text"
          inputMode="decimal"
          value={newDebt.interestRate}
          onChange={(e) =>
            setNewDebt({
              ...newDebt,
              interestRate: cleanMoneyInput(e.target.value),
            })
          }
          placeholder="Ex : 19.99"
          style={input}
        />

        <label>Paiement minimum</label>
        <input
          type="text"
          inputMode="decimal"
          value={newDebt.minimumPayment}
          onChange={(e) =>
            setNewDebt({
              ...newDebt,
              minimumPayment: cleanMoneyInput(e.target.value),
            })
          }
          placeholder="Ex : 150"
          style={input}
        />

        <button onClick={addDebt} style={addButton}>
          Ajouter la dette
        </button>
      </section>

      <section style={tipCard}>
        <TrendingDown color="var(--green)" />
        <div>
          <h2>Stratégie OnJarama</h2>
          <p style={muted}>
            Priorisez la dette au taux le plus élevé, tout en respectant les paiements
            minimums des autres dettes.
          </p>
        </div>
      </section>
    </div>
  );
}

const heroCard = {
  background: "linear-gradient(135deg, rgba(239,68,68,.18), var(--bg-card))",
  border: "1px solid var(--red)",
  borderRadius: "24px",
  padding: "22px",
  marginTop: "20px",
};

const priorityCard = {
  background: "linear-gradient(135deg, #2a210b, var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
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
  marginBottom: "16px",
};

const debtRow = {
  background: "#07111f",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "14px",
  marginTop: "12px",
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "12px",
};

const barBg = {
  height: "7px",
  background: "rgba(255,255,255,.08)",
  borderRadius: "999px",
  marginTop: "8px",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
};

const trashButton = {
  marginTop: "8px",
  border: "1px solid var(--red)",
  background: "transparent",
  color: "var(--red)",
  borderRadius: "10px",
  padding: "6px",
};

const input = {
  display: "block",
  width: "100%",
  marginTop: "8px",
  marginBottom: "14px",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid var(--border)",
  background: "#07111f",
  color: "var(--text-main)",
};

const addButton = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
};

const tipCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.16), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "4px",
};

export default Dettes;