import { financeData } from "../data/salomonFinance";

function OverviewCard() {
  const items = [
    {
      label: "Revenus",
      value: financeData.overview.monthlyIncome,
      icon: "💰",
      color: "#4ade80",
    },
    {
      label: "Dépenses",
      value: financeData.overview.monthlyExpenses,
      icon: "📉",
      color: "#fb7185",
    },
    {
      label: "Épargne",
      value: financeData.overview.monthlySavings,
      icon: "🏦",
      color: "#60a5fa",
    },
  ];

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
      <h2>Vue d'ensemble</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              background: "#081427",
              borderRadius: "14px",
              padding: "15px",
            }}
          >
            <div style={{ fontSize: "24px" }}>{item.icon}</div>
            <h3>{item.label}</h3>
            <h2 style={{ color: item.color }}>{item.value}$</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverviewCard;