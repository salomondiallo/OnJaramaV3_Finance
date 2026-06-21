import { PiggyBank, ShieldCheck, Target, TrendingUp } from "lucide-react";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    title: "Épargne",
    subtitle: "Construire une sécurité avant les grands projets.",
    monthlySavings: "Épargne prévue par mois",
    incomeRate: "de vos revenus mensuels.",
    recommendedCushion: "Coussin recommandé",
    cushionSubtitle: "Environ 3 mois de dépenses.",
    estimatedTime: "Temps estimé",
    currentPace: "Au rythme actuel.",
    months: "mois",
    cushionProgress: "Progression du coussin",
    securityGoal: "Objectif sécurité",
    emergencyText:
      "Votre coussin d’urgence aide à éviter de retourner au crédit lors d’un imprévu.",
    recommendedActions: "Actions recommandées",
    action1: "Automatiser un montant fixe après chaque paie.",
    action2: "Séparer l’épargne de l’argent courant.",
    action3: "Prioriser le coussin avant les dépenses non essentielles.",
    createGoal: "Simuler un objectif d’épargne",
  },
  EN: {
    title: "Savings",
    subtitle: "Build security before major projects.",
    monthlySavings: "Planned monthly savings",
    incomeRate: "of your monthly income.",
    recommendedCushion: "Recommended cushion",
    cushionSubtitle: "About 3 months of expenses.",
    estimatedTime: "Estimated time",
    currentPace: "At the current pace.",
    months: "months",
    cushionProgress: "Cushion progress",
    securityGoal: "Security goal",
    emergencyText:
      "Your emergency cushion helps avoid going back to credit when something unexpected happens.",
    recommendedActions: "Recommended actions",
    action1: "Automate a fixed amount after each pay.",
    action2: "Keep savings separate from daily spending money.",
    action3: "Prioritize the cushion before non-essential expenses.",
    createGoal: "Simulate a savings goal",
  },
  ES: {
    title: "Ahorro",
    subtitle: "Construir seguridad antes de los grandes proyectos.",
    monthlySavings: "Ahorro mensual previsto",
    incomeRate: "de tus ingresos mensuales.",
    recommendedCushion: "Colchón recomendado",
    cushionSubtitle: "Aproximadamente 3 meses de gastos.",
    estimatedTime: "Tiempo estimado",
    currentPace: "Al ritmo actual.",
    months: "meses",
    cushionProgress: "Progreso del colchón",
    securityGoal: "Objetivo de seguridad",
    emergencyText:
      "Tu colchón de emergencia ayuda a evitar volver al crédito ante un imprevisto.",
    recommendedActions: "Acciones recomendadas",
    action1: "Automatizar un monto fijo después de cada pago.",
    action2: "Separar el ahorro del dinero corriente.",
    action3: "Priorizar el colchón antes de gastos no esenciales.",
    createGoal: "Simular un objetivo de ahorro",
  },
};

function Epargne({ financeData, setCurrentPage, settings }) {
  const t = getText(settings);
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;

  const overview = financeData?.overview || {};
  const income = Number(overview.monthlyIncome || 0);
  const savings = Number(overview.monthlySavings || 0);
  const expenses = Number(overview.monthlyExpenses || 0);

  const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;
  const emergencyTarget = expenses * 3;
  const monthsToEmergency =
    savings > 0 && emergencyTarget > 0
      ? Math.ceil(emergencyTarget / savings)
      : 0;

  function money(value) {
    return Number(value || 0).toLocaleString(
      language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA",
      {
        maximumFractionDigits: 2,
      }
    );
  }

  function simulateSavingsGoal() {
    localStorage.setItem(
      "onjaramaGoalToSimulate",
      JSON.stringify({
        id: "epargne",
        title: p.securityGoal,
        subtitle: p.subtitle,
        defaultAmount: emergencyTarget > 0 ? emergencyTarget : 3000,
        defaultMonthly: savings > 0 ? savings : 250,
        startedAt: new Date().toISOString(),
      })
    );

    setCurrentPage?.("simulateur");
  }

  return (
    <div className="native-page">
      <h1>{t.epargne || p.title}</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={heroCard}>
        <PiggyBank color="var(--green)" size={38} />
        <p style={muted}>{p.monthlySavings}</p>
        <h1 style={{ color: "var(--green)" }}>{money(savings)} $</h1>
        <p style={muted}>
          {savingsRate}% {p.incomeRate}
        </p>
      </section>

      <div className="grid-2" style={grid}>
        <MiniCard
          icon={<ShieldCheck />}
          title={p.recommendedCushion}
          value={`${money(emergencyTarget)} $`}
          color="var(--gold)"
          subtitle={p.cushionSubtitle}
        />

        <MiniCard
          icon={<TrendingUp />}
          title={p.estimatedTime}
          value={`${monthsToEmergency} ${p.months}`}
          color="var(--green)"
          subtitle={p.currentPace}
        />
      </div>

      <section style={card}>
        <h2>{p.cushionProgress}</h2>

        <ProgressLine
          label={p.securityGoal}
          value={savings}
          total={emergencyTarget}
          color="var(--green)"
        />

        <p style={muted}>{p.emergencyText}</p>
      </section>

      <section style={card}>
        <div style={header}>
          <Target color="var(--gold)" />
          <h2>{p.recommendedActions}</h2>
        </div>

        <Action text={p.action1} />
        <Action text={p.action2} />
        <Action text={p.action3} />

        <button onClick={simulateSavingsGoal} style={primaryBtn}>
          {p.createGoal}
        </button>
      </section>
    </div>
  );
}

function MiniCard({ icon, title, value, color, subtitle }) {
  return (
    <div style={{ ...miniCard, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <p style={mutedSmall}>{title}</p>
      <h2>{value}</h2>
      <p style={mutedSmall}>{subtitle}</p>
    </div>
  );
}

function ProgressLine({ label, value, total, color }) {
  const progress =
    total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;

  return (
    <div style={{ marginTop: "14px" }}>
      <div style={lineTop}>
        <strong>{label}</strong>
        <strong>{progress}%</strong>
      </div>

      <div style={barBg}>
        <div style={{ ...barFill, width: `${progress}%`, background: color }} />
      </div>
    </div>
  );
}

function Action({ text }) {
  return <p style={action}>✓ {text}</p>;
}

const heroCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.18), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "24px",
  padding: "22px",
  marginTop: "20px",
};

const grid = {
  gap: "12px",
  marginTop: "18px",
};

const miniCard = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
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
  marginBottom: "14px",
};

const lineTop = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
};

const barBg = {
  height: "9px",
  background: "var(--bg-panel)",
  borderRadius: "999px",
  marginTop: "8px",
  overflow: "hidden",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
};

const action = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  marginTop: "10px",
};

const primaryBtn = {
  marginTop: "16px",
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
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

export default Epargne;