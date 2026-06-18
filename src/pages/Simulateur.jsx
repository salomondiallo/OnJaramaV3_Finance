import {
  Calculator,
  Car,
  ChevronRight,
  Home,
  PiggyBank,
  Plane,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";

function Simulateur({
  financeData,
  selectedGoals,
  setSelectedGoals,
  setCurrentPage,
  settings,
}) {
  const [monthlyAmount, setMonthlyAmount] = useState("500");
  const [years, setYears] = useState("5");
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const currency = settings?.currency || "CAD";

  function cleanInput(value) {
    return value.replace(/[^\d]/g, "");
  }

  function money(value) {
    return Number(value || 0).toLocaleString("fr-CA", {
      maximumFractionDigits: 0,
    });
  }

  const monthly = Number(monthlyAmount || 0);
  const durationYears = Number(years || 0);
  const totalSaved = monthly * 12 * durationYears;

  const debtTotal = financeData.debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const debtReduction = Math.min(totalSaved, debtTotal);

  const goalOptions = [
    {
      id: "maison",
      title: "Maison",
      subtitle: "Préparer achat, construction ou rénovation",
      icon: <Home />,
      color: "var(--green)",
    },
    {
      id: "voyage",
      title: "Voyage",
      subtitle: "Préparer un voyage ou un retour au pays",
      icon: <Plane />,
      color: "var(--blue)",
    },
    {
      id: "liberte",
      title: "Fonds d’urgence",
      subtitle: "Sécuriser vos imprévus",
      icon: <ShieldCheck />,
      color: "var(--purple)",
    },
    {
      id: "auto",
      title: "Voiture",
      subtitle: "Financer un véhicule ou une réparation",
      icon: <Car />,
      color: "var(--gold)",
    },
    {
      id: "business",
      title: "Projet personnel",
      subtitle: "Un projet important à construire",
      icon: <Sparkles />,
      color: "var(--blue)",
    },
    {
      id: "securite",
      title: "Épargne",
      subtitle: "Transformer la simulation en objectif libre",
      icon: <PiggyBank />,
      color: "var(--green)",
    },
  ];

  function addSimulationToGoal(option) {
    if (totalSaved <= 0) return;

    const shouldHighlight = selectedGoals.length === 0;

    const updatedGoals = selectedGoals.map((goal) => ({
      ...goal,
      highlighted: shouldHighlight ? false : goal.highlighted,
    }));

    const newGoal = {
      id: Date.now(),
      title: option.title,
      category: option.id,
      option: `Simulation : ${money(monthly)} $ / mois pendant ${durationYears} ans`,
      targetAmount: totalSaved,
      currentAmount: 0,
      targetDate: "",
      highlighted: shouldHighlight,
      archived: false,
      source: "simulateur",
      monthlyAmount: monthly,
      years: durationYears,
      createdAt: new Date().toISOString(),
    };

    setSelectedGoals([...updatedGoals, newGoal]);
    setShowGoalPicker(false);
    setConfirmMessage(`${option.title} ajouté à vos objectifs.`);

    setTimeout(() => {
      setConfirmMessage("");
    }, 2200);
  }

  return (
    <div className="native-page">
      <h1>Simulateur</h1>

      <p style={muted}>
        Visualisez l’impact de vos décisions financières.
      </p>

      <section style={miniIntro}>
        <Mini icon={<Target />} title="Décidez mieux" color="var(--green)" />
        <Mini icon={<TrendingUp />} title="Projetez l’avenir" color="var(--blue)" />
        <Mini icon={<ShieldCheck />} title="Atteignez vos objectifs" color="var(--purple)" />
      </section>

      <section style={card}>
        <div style={header}>
          <Calculator color="var(--blue)" />
          <h2>Simulation d’épargne</h2>
        </div>

        <label>Montant mensuel</label>

        <div style={inputWrap}>
          <input
            value={monthlyAmount}
            onChange={(event) => setMonthlyAmount(cleanInput(event.target.value))}
            style={input}
            inputMode="numeric"
          />
          <span style={suffix}>$</span>
        </div>

        <label>Nombre d’années</label>

        <div style={inputWrap}>
          <input
            value={years}
            onChange={(event) => setYears(cleanInput(event.target.value))}
            style={input}
            inputMode="numeric"
          />
          <span style={suffix}>ans</span>
        </div>

        <div style={result}>
          <p style={muted}>Capital estimé</p>

          <h1 style={{ color: "var(--green)" }}>
            {money(totalSaved)} $
          </h1>
        </div>
      </section>

      <button onClick={() => setShowGoalPicker(true)} style={addToGoalBtn}>
        <span style={{ color: "var(--gold)" }}>
          <Target />
        </span>

        <div>
          <strong>Ajouter à mes objectifs</strong>
          <small>Transformez cette simulation en objectif.</small>
        </div>

        <ChevronRight />
      </button>

      {confirmMessage && (
        <section style={confirmBox} className="action-confirm">
          <ShieldCheck color="var(--green)" />
          <strong>{confirmMessage}</strong>
        </section>
      )}

      <section style={card}>
        <div style={header}>
          <TrendingUp color="var(--green)" />
          <h2>Projection</h2>
        </div>

        <Info label="Épargne totale" value={`${money(totalSaved)} $`} />
        <Info label="Dette actuelle" value={`${money(debtTotal)} $`} />
        <Info
          label="Dette pouvant être remboursée"
          value={`${money(debtReduction)} $`}
        />
      </section>

      <section style={goalCard}>
        <Target color="var(--gold)" />
        <h2>Lecture OnJarama</h2>

        <p style={muted}>
          Avec {money(monthly)} $ par mois pendant {durationYears} ans,
          vous pourriez accumuler environ {money(totalSaved)} {currency}.
        </p>
      </section>

      {showGoalPicker && (
        <div style={modalOverlay}>
          <section style={modal}>
            <button
              onClick={() => setShowGoalPicker(false)}
              style={closeBtn}
              aria-label="Fermer"
            >
              <X />
            </button>

            <h2>Ajouter à mes objectifs</h2>

            <div style={simulationSummary}>
              <ShieldCheck color="var(--green)" />

              <p>
                Votre simulation :
                <br />
                <strong>
                  {money(monthly)} $ / mois pendant {durationYears} ans
                </strong>
                <br />
                Capital estimé :{" "}
                <strong style={{ color: "var(--green)" }}>
                  {money(totalSaved)} $
                </strong>
              </p>
            </div>

            <p style={muted}>
              Choisissez ou créez un objectif pour suivre votre progression.
            </p>

            <div style={goalList}>
              {goalOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => addSimulationToGoal(option)}
                  style={goalOption}
                >
                  <span style={{ ...goalIcon, color: option.color }}>
                    {option.icon}
                  </span>

                  <div>
                    <strong>{option.title}</strong>
                    <small>{option.subtitle}</small>
                  </div>

                  <ChevronRight size={20} />
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setShowGoalPicker(false);
                setCurrentPage("objectifs");
              }}
              style={viewGoalsBtn}
            >
              Voir mes objectifs
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={row}>
      <span style={muted}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Mini({ icon, title, color }) {
  return (
    <div style={miniItem}>
      <span style={{ color }}>{icon}</span>
      <strong>{title}</strong>
    </div>
  );
}

const miniIntro = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px",
  marginTop: "18px",
};

const miniItem = {
  display: "grid",
  gap: "8px",
  fontSize: "13px",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const goalCard = {
  background: "linear-gradient(135deg,#2a210b,var(--bg-card))",
  border: "1px solid var(--gold)",
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

const inputWrap = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  borderRadius: "14px",
  paddingRight: "14px",
  marginTop: "8px",
  marginBottom: "14px",
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "transparent",
  color: "var(--text-main)",
  outline: "none",
};

const suffix = {
  color: "var(--text-main)",
  fontWeight: "bold",
};

const result = {
  marginTop: "10px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid rgba(255,255,255,.08)",
};

const addToGoalBtn = {
  width: "100%",
  background: "var(--bg-card)",
  border: "1px solid var(--gold)",
  borderRadius: "18px",
  color: "var(--text-main)",
  padding: "16px",
  marginTop: "16px",
  display: "grid",
  gridTemplateColumns: "32px 1fr auto",
  gap: "12px",
  alignItems: "center",
  textAlign: "left",
};

const confirmBox = {
  background: "rgba(34,197,94,.14)",
  border: "1px solid var(--green)",
  borderRadius: "16px",
  padding: "14px",
  marginTop: "14px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.55)",
  zIndex: 2000,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
};

const modal = {
  width: "100%",
  maxWidth: "540px",
  maxHeight: "88dvh",
  overflowY: "auto",
  background: "var(--bg-main)",
  borderTop: "1px solid var(--border)",
  borderRadius: "28px 28px 0 0",
  padding: "24px",
  position: "relative",
};

const closeBtn = {
  position: "absolute",
  top: "18px",
  right: "18px",
  width: "42px",
  height: "42px",
  borderRadius: "999px",
  border: "1px solid var(--border)",
  background: "var(--bg-card)",
  color: "var(--text-main)",
  display: "grid",
  placeItems: "center",
};

const simulationSummary = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
  display: "flex",
  gap: "12px",
  marginTop: "16px",
};

const goalList = {
  display: "grid",
  gap: "10px",
  marginTop: "16px",
};

const goalOption = {
  width: "100%",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  color: "var(--text-main)",
  padding: "14px",
  display: "grid",
  gridTemplateColumns: "42px 1fr auto",
  gap: "12px",
  alignItems: "center",
  textAlign: "left",
};

const goalIcon = {
  display: "grid",
  placeItems: "center",
};

const viewGoalsBtn = {
  width: "100%",
  marginTop: "18px",
  padding: "14px",
  borderRadius: "16px",
  border: "1px solid var(--blue)",
  background: "rgba(56,189,248,.12)",
  color: "var(--blue)",
  fontWeight: "bold",
};

const muted = {
  color: "var(--text-muted)",
};

export default Simulateur;