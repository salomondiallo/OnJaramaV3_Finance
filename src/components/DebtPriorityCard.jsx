import { financeData } from "../data/salomonFinance";

function DebtPriorityCard() {
  return (
    <div
      style={{
        background: "#0d1d33",
        border: "1px solid #1d3355",
        borderRadius: "16px",
        padding: "20px",
        minHeight: "230px",
      }}
    >
      <h2>Priorité des dettes</h2>

      {financeData.debts.map((debt, index) => (
        <div
          key={debt.name}
          style={{
            marginTop: "15px",
            padding: "15px",
            borderRadius: "12px",
            background: "#081427",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3>{debt.name}</h3>
            <p>Solde : {debt.balance.toFixed(2)}$</p>
            <p>Taux : {debt.interestRate}%</p>
          </div>

          <strong
            style={{
              color: index === 0 ? "#fb7185" : "#facc15",
            }}
          >
            Priorité #{index + 1}
          </strong>
        </div>
      ))}
    </div>
  );
}

export default DebtPriorityCard;