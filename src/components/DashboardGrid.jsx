function DashboardGrid({ children }) {
  return (
    <div style={grid}>
      {children}
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px",
  marginTop: "18px",
};

export default DashboardGrid;