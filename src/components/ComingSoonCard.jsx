function ComingSoonCard({ title, description }) {
  return (
    <div
      style={{
        background: "#0d1d33",
        border: "1px solid #1d3355",
        borderRadius: "16px",
        padding: "20px",
        minHeight: "160px",
      }}
    >
      <h2>{title}</h2>
      <p style={{ marginTop: "10px", color: "#b8c7dd" }}>
        {description}
      </p>
      <p style={{ marginTop: "15px", color: "#4da3ff" }}>
        Module prévu pour la prochaine étape.
      </p>
    </div>
  );
}

export default ComingSoonCard;