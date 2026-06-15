import { financeData } from "../data/salomonFinance";

function ProgressDebtCard() {
  return (
    <div style={{
      background: "#0d1d33",
      border: "1px solid #1d3355",
      borderRadius: "16px",
      padding: "20px"
    }}>
      <h2>Progression des dettes</h2>

      {financeData.debts.map((debt) => {
        const progress = debt.name === "Fairstone" ? 75 : 20;

        return (
          <div key={debt.name} style={{ marginTop: "18px" }}>
            <p>{debt.name}</p>
            <div style={{
              width: "100%",
              height: "10px",
              background: "#081427",
              borderRadius: "10px"
            }}>
              <div style={{
                width: `${progress}%`,
                height: "100%",
                background: debt.name === "Fairstone" ? "#ff6b6b" : "#f59e0b",
                borderRadius: "10px"
              }} />
            </div>
            <small>{progress}% de progression</small>
          </div>
        );
      })}
    </div>
  );
}

export default ProgressDebtCard;