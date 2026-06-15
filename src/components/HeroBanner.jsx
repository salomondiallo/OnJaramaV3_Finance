function HeroBanner({ onStart, onAI }) {
  return (
    <section style={wrapper}>
      <div style={hero}>
        <img src="/onjarama-path-logo.png" alt="OnJarama" style={logo} />
      </div>

      <div style={actions}>
        <button onClick={onStart} style={startBtn}>
          Commencer
        </button>

        <button onClick={onAI} style={aiBtn}>
          IA OnJarama
        </button>
      </div>
    </section>
  );
}

const wrapper = {
  width: "100%",
};

const hero = {
  minHeight: "360px",
  borderRadius: "28px",
  border: "1px solid var(--border)",
  backgroundImage:
    "linear-gradient(180deg, rgba(10,22,40,.01), rgba(10,22,40,.02), rgba(10,22,40,.10)), url('/onjarama-hero.png')",
  backgroundSize: "cover",
  backgroundPosition: "center 16%",
  position: "relative",
  overflow: "hidden",
};

const logo = {
  position: "absolute",
  top: "12px",
  left: "12px",
  width: "48px",
  height: "48px",
  objectFit: "contain",
  borderRadius: "12px",
  opacity: 0.92,
};

const actions = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "12px",
};

const startBtn = {
  padding: "13px",
  borderRadius: "15px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
  fontSize: "14px",
};

const aiBtn = {
  padding: "13px",
  borderRadius: "15px",
  border: "none",
  background: "linear-gradient(90deg, var(--purple), #9b7cff)",
  color: "white",
  fontWeight: "bold",
  fontSize: "14px",
};

export default HeroBanner;