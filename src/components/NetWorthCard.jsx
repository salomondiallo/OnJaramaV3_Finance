import { financeData } from "../data/salomonFinance";

function NetWorthCard() {
  const totalDebt = financeData.debts.reduce(
    (total, debt) => total + debt.balance,
    0
  );

  const savings = financeData.overview.monthlySavings;
  const netWorth = savings - totalDebt;

  return (
    <div style={{
      background: "#0d1d33",
      border: "1px solid #1d3355",
      borderRadius: "16px",
      padding: "20px"
    }}>
      <h2>Patrimoine</h2>

      <p style={{ marginTop: "12px" }}>Actifs : {savings}$</p>
      <p>Dettes : {totalDebt.toFixed(2)}$</p>

      <h2 style={{ marginTop: "15px", color: "#ff6b6b" }}>
        Valeur nette : {netWorth.toFixed(2)}$
      </h2>
    </div>
  );
}

export default NetWorthCard;