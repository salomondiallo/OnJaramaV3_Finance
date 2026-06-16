import {
  Bot,
  CalendarDays,
  Eye,
  EyeOff,
  Lightbulb,
  PiggyBank,
  ShieldCheck,
  Target,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { getText } from "../data/translations";

function Accueil({ financeData, selectedGoals, setCurrentPage, settings }) {
  const t = getText(settings);
  const [showAmounts, setShowAmounts] = useState(false);

  const totalDebt = financeData.debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const activeGoals = selectedGoals.filter((goal) => !goal.archived);
  const hasDebt = totalDebt > 0;

  function money(value) {
    if (!showAmounts) return "000";
    return Number(value || 0).toLocaleString("fr-CA", {
      maximumFractionDigits: 2,
    });
  }

  return (
    <div style={page}>
      <section style={hero}>
        <div style={quickRail}>
          <RailItem icon={<CalendarDays />} label="Paiement" />
          <RailItem icon={<PiggyBank />} label="Dette" />
          <RailItem icon={<Target />} label="Objectif" />
          <RailItem icon={<ShieldCheck />} label="Protection" />
          <RailItem icon={<Lightbulb />} label="Conseil" />
        </div>

        <div style={heroText}>
          <h1 style={heroTitle}>
            {t.heroTitle}
            <br />
            <span style={heroAccent}>{t.heroAccent}</span>
          </h1>
          <p style={heroSubtitle}>Transformez vos objectifs en plan concret.</p>
        </div>
      </section>

      <div style={privacyRow}>
        <span style={privacyBadge}>🔒 Privé</span>
        <span style={privacyBadge}>🌍 Démo</span>

        <button onClick={() => setShowAmounts(!showAmounts)} style={eyeBtn}>
          {showAmounts ? <EyeOff size={17} /> : <Eye size={17} />}
          {showAmounts ? "Masquer" : "Afficher mes chiffres"}
        </button>
      </div>

      <div style={actionsGrid}>
        <ActionCard icon={<Wallet />} title="Situation" onClick={() => setCurrentPage("situation")} />
        <ActionCard icon={<Target />} title="Objectifs" onClick={() => setCurrentPage("objectifs")} />
        <ActionCard icon={<PiggyBank />} title="Parcours" onClick={() => setCurrentPage("parcours")} />
        <ActionCard icon={<Bot />} title="IA" onClick={() => setCurrentPage("assistant")} />
      </div>

      <section style={statusCard}>
        <div>
          <p style={muted}>Aperçu sécurisé</p>
          <h2 style={statusTitle}>
            {hasDebt ? "Situation à surveiller" : "Prêt à commencer"}
          </h2>
        </div>

        <div style={statusGrid}>
          <MiniLine label="Dette" value={showAmounts ? `${money(totalDebt)} $` : "000"} />
          <MiniLine label="Objectifs" value={showAmounts ? activeGoals.length : "000"} />
          <MiniLine label="Conseil" value="Disponible" />
        </div>
      </section>

      <div style={heroButtons}>
        <button onClick={() => setCurrentPage("situation")} style={primaryBtn}>
          Commencer
        </button>

        <button onClick={() => setCurrentPage("assistant")} style={aiBtn}>
          <Bot size={18} /> IA OnJarama
        </button>
      </div>
    </div>
  );
}

function RailItem({ icon, label }) {
  return (
    <button style={railItem}>
      <span style={railIcon}>{icon}</span>
      <small>{label}</small>
    </button>
  );
}

function ActionCard({ icon, title, onClick }) {
  return (
    <button onClick={onClick} style={actionCard}>
      <span style={actionIcon}>{icon}</span>
      <strong>{title}</strong>
    </button>
  );
}

function MiniLine({ label, value }) {
  return (
    <div style={miniLine}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const page = {
  minHeight: "calc(100vh - 176px)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflowX: "hidden",
};

const hero = {
  height: "min(44vh, 360px)",
  width: "100%",
  borderRadius: "28px",
  backgroundImage:
    "linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.12), rgba(0,0,0,.50)), url('/onjarama-hero.png')",
  backgroundSize: "cover",
  backgroundPosition: "center 18%",
  position: "relative",
  overflow: "hidden",
  border: "1px solid var(--border)",
};

const quickRail = {
  position: "absolute",
  top: "10px",
  left: "10px",
  right: "10px",
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  gap: "6px",
  zIndex: 4,
};

const railItem = {
  minWidth: 0,
  border: "1px solid rgba(212,175,55,.35)",
  background: "rgba(7,17,31,.58)",
  color: "white",
  borderRadius: "16px",
  padding: "8px 3px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3px",
  fontSize: "9px",
  backdropFilter: "blur(8px)",
};

const railIcon = {
  color: "var(--gold)",
  display: "flex",
};

const heroText = {
  position: "absolute",
  left: "20px",
  right: "20px",
  bottom: "18px",
  zIndex: 3,
};

const heroTitle = {
  margin: 0,
  color: "white",
  fontSize: "clamp(30px, 9vw, 44px)",
  lineHeight: "0.98",
  fontWeight: "900",
  textShadow: "0 8px 24px rgba(0,0,0,.45)",
};

const heroAccent = {
  background: "linear-gradient(90deg, #38bdf8, #a78bfa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const heroSubtitle = {
  marginTop: "10px",
  color: "rgba(255,255,255,.95)",
  fontSize: "14px",
  lineHeight: "1.25",
};

const privacyRow = {
  display: "grid",
  gridTemplateColumns: "auto auto minmax(0, 1fr)",
  alignItems: "center",
  gap: "8px",
};

const privacyBadge = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  color: "var(--text-main)",
  borderRadius: "999px",
  padding: "8px 10px",
  fontSize: "12px",
  whiteSpace: "nowrap",
};

const eyeBtn = {
  minWidth: 0,
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  borderRadius: "999px",
  padding: "9px 10px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  fontSize: "12px",
};

const actionsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "8px",
};

const actionCard = {
  minHeight: "70px",
  border: "1px solid var(--border)",
  background: "var(--bg-card)",
  color: "var(--text-main)",
  borderRadius: "18px",
  padding: "8px 5px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  fontSize: "12px",
};

const actionIcon = {
  color: "var(--gold)",
  display: "flex",
};

const statusCard = {
  border: "1px solid var(--border)",
  background: "var(--bg-card)",
  borderRadius: "22px",
  padding: "12px",
};

const statusTitle = {
  margin: 0,
  fontSize: "19px",
};

const statusGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "8px",
  marginTop: "10px",
};

const miniLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "9px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  fontSize: "12px",
};

const heroButtons = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
};

const primaryBtn = {
  padding: "13px",
  borderRadius: "16px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
};

const aiBtn = {
  padding: "13px",
  borderRadius: "16px",
  border: "none",
  background: "linear-gradient(90deg, var(--purple), #9b7cff)",
  color: "white",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
};

const muted = {
  color: "var(--text-muted)",
  margin: 0,
  marginBottom: "4px",
};

export default Accueil;