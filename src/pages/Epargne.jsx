import {
  ArrowRight,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
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
    smartProjection: "Projection intelligente",
    projectionSubtitle: "Comparez plusieurs rythmes d’épargne.",
    monthly: "/mois",
    targetReachedIn: "Objectif atteint en",
    recommendedRhythm: "Rythme recommandé",
    recommendedText:
      "Un rythme réaliste doit protéger votre budget sans bloquer vos autres objectifs.",
    lowMargin:
      "Commencez petit. Même 100 $ par mois crée une base et garde l’habitude active.",
    balancedMargin:
      "Votre marge permet un rythme équilibré. Visez un coussin solide avant d’accélérer.",
    strongMargin:
      "Vous pouvez accélérer tout en gardant une marge de sécurité.",
    noData:
      "Ajoutez vos revenus et dépenses dans Situation pour obtenir une projection plus précise.",
    current: "Actuel",
    target: "Cible",
    remaining: "Reste",
    bestOption: "Meilleure option",
    emergencyReady: "Coussin prêt",
    toDefine: "À définir",
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
    smartProjection: "Smart projection",
    projectionSubtitle: "Compare several savings rhythms.",
    monthly: "/month",
    targetReachedIn: "Target reached in",
    recommendedRhythm: "Recommended rhythm",
    recommendedText:
      "A realistic rhythm should protect your budget without blocking your other goals.",
    lowMargin:
      "Start small. Even $100 per month builds a base and keeps the habit active.",
    balancedMargin:
      "Your margin supports a balanced pace. Build a strong cushion before accelerating.",
    strongMargin:
      "You can accelerate while keeping a safety margin.",
    noData:
      "Add your income and expenses in Situation to get a more precise projection.",
    current: "Current",
    target: "Target",
    remaining: "Remaining",
    bestOption: "Best option",
    emergencyReady: "Cushion ready",
    toDefine: "To define",
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
    smartProjection: "Proyección inteligente",
    projectionSubtitle: "Compara varios ritmos de ahorro.",
    monthly: "/mes",
    targetReachedIn: "Objetivo alcanzado en",
    recommendedRhythm: "Ritmo recomendado",
    recommendedText:
      "Un ritmo realista debe proteger tu presupuesto sin bloquear otros objetivos.",
    lowMargin:
      "Empieza pequeño. Incluso 100 $ al mes crea una base y mantiene el hábito activo.",
    balancedMargin:
      "Tu margen permite un ritmo equilibrado. Construye un colchón sólido antes de acelerar.",
    strongMargin:
      "Puedes acelerar manteniendo un margen de seguridad.",
    noData:
      "Agrega tus ingresos y gastos en Situación para obtener una proyección más precisa.",
    current: "Actual",
    target: "Objetivo",
    remaining: "Restante",
    bestOption: "Mejor opción",
    emergencyReady: "Colchón listo",
    toDefine: "Por definir",
  },
};

const projectionAmounts = [100, 250, 500, 1000];

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
  const currentSavingsBase = savings;
  const remaining = Math.max(0, emergencyTarget - currentSavingsBase);

  const monthsToEmergency =
    savings > 0 && emergencyTarget > 0
      ? Math.ceil(remaining / savings)
      : 0;

  const projections = projectionAmounts.map((amount) => ({
    amount,
    months:
      emergencyTarget > 0 && amount > 0
        ? Math.max(1, Math.ceil(remaining / amount))
        : 0,
  }));

  const recommended = getRecommendedProjection({
    projections,
    savings,
    income,
    expenses,
  });

  const progress =
    emergencyTarget > 0
      ? Math.min(100, Math.round((currentSavingsBase / emergencyTarget) * 100))
      : 0;

  const recommendationText = getRecommendationText({
    p,
    income,
    expenses,
    savings,
  });

  function money(value) {
    return Number(value || 0).toLocaleString(
      language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA",
      {
        maximumFractionDigits: 2,
      }
    );
  }

  function simulateSavingsGoal(monthlyAmount = null) {
    localStorage.setItem(
      "onjaramaGoalToSimulate",
      JSON.stringify({
        id: "urgence",
        title: p.securityGoal,
        subtitle: p.subtitle,
        defaultAmount: emergencyTarget > 0 ? emergencyTarget : 3000,
        defaultMonthly: monthlyAmount || savings || 250,
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
          value={
            monthsToEmergency > 0
              ? `${monthsToEmergency} ${p.months}`
              : p.toDefine
          }
          color="var(--green)"
          subtitle={p.currentPace}
        />
      </div>

      <section style={card}>
        <h2>{p.cushionProgress}</h2>

        <ProgressLine
          label={p.securityGoal}
          value={currentSavingsBase}
          total={emergencyTarget}
          color="var(--green)"
        />

        <div style={statGrid}>
          <SmallStat label={p.current} value={`${money(currentSavingsBase)} $`} />
          <SmallStat label={p.target} value={`${money(emergencyTarget)} $`} />
          <SmallStat label={p.remaining} value={`${money(remaining)} $`} />
          <SmallStat
            label={p.estimatedTime}
            value={
              monthsToEmergency > 0
                ? `${monthsToEmergency} ${p.months}`
                : p.toDefine
            }
          />
        </div>

        <p style={muted}>{p.emergencyText}</p>
      </section>

      <section style={smartCard}>
        <div style={header}>
          <Sparkles color="var(--gold)" />
          <div>
            <h2>{p.smartProjection}</h2>
            <p style={mutedSmall}>{p.projectionSubtitle}</p>
          </div>
        </div>

        <div style={projectionGrid}>
          {projections.map((projection) => {
            const isBest = recommended?.amount === projection.amount;

            return (
              <button
                key={projection.amount}
                onClick={() => simulateSavingsGoal(projection.amount)}
                style={{
                  ...projectionCard,
                  borderColor: isBest ? "var(--gold)" : "var(--border)",
                  background: isBest
                    ? "linear-gradient(135deg, rgba(212,175,55,.16), var(--bg-panel))"
                    : "var(--bg-panel)",
                }}
              >
                <strong style={{ color: isBest ? "var(--gold)" : "var(--text-main)" }}>
                  {money(projection.amount)} $ {p.monthly}
                </strong>

                <span style={mutedSmall}>{p.targetReachedIn}</span>

                <h3>
                  {projection.months > 0
                    ? `${projection.months} ${p.months}`
                    : p.toDefine}
                </h3>

                {isBest && <em style={bestBadge}>✓ {p.bestOption}</em>}

                <span style={goLine}>
                  {p.createGoal}
                  <ArrowRight size={15} />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section style={recommendationCard}>
        <div style={header}>
          <Target color="var(--green)" />
          <div>
            <h2>{p.recommendedRhythm}</h2>
            <p style={mutedSmall}>{p.recommendedText}</p>
          </div>
        </div>

        <p style={recommendationTextStyle}>{recommendationText}</p>

        <button
          onClick={() => simulateSavingsGoal(recommended?.amount || savings || 250)}
          style={primaryBtn}
        >
          {p.createGoal}
        </button>
      </section>

      <section style={card}>
        <div style={header}>
          <Target color="var(--gold)" />
          <h2>{p.recommendedActions}</h2>
        </div>

        <Action text={p.action1} />
        <Action text={p.action2} />
        <Action text={p.action3} />
      </section>
    </div>
  );
}

function getRecommendedProjection({ projections, savings, income, expenses }) {
  const availableMargin = Math.max(0, Number(income || 0) - Number(expenses || 0));

  if (!Array.isArray(projections) || projections.length === 0) return null;

  if (savings > 0) {
    return (
      projections.find((item) => item.amount >= savings) ||
      projections[projections.length - 1]
    );
  }

  if (availableMargin >= 1200) return projections.find((item) => item.amount === 500);
  if (availableMargin >= 650) return projections.find((item) => item.amount === 250);
  return projections.find((item) => item.amount === 100);
}

function getRecommendationText({ p, income, expenses, savings }) {
  const availableMargin = Math.max(0, Number(income || 0) - Number(expenses || 0));

  if (income <= 0 && expenses <= 0) return p.noData;
  if (savings > 0 && savings >= availableMargin * 0.5) return p.strongMargin;
  if (availableMargin >= 650) return p.balancedMargin;
  return p.lowMargin;
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

function SmallStat({ label, value }) {
  return (
    <div style={smallStat}>
      <span>{label}</span>
      <strong>{value}</strong>
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

const smartCard = {
  background:
    "linear-gradient(135deg, rgba(212,175,55,.14), rgba(34,197,94,.08), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const recommendationCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.14), var(--bg-card))",
  border: "1px solid var(--green)",
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

const statGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "10px",
  marginTop: "14px",
};

const smallStat = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "11px",
  display: "grid",
  gap: "4px",
};

const projectionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "10px",
};

const projectionCard = {
  minHeight: "150px",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "13px",
  color: "var(--text-main)",
  textAlign: "left",
  display: "grid",
  gap: "6px",
};

const bestBadge = {
  color: "var(--gold)",
  fontStyle: "normal",
  fontWeight: "900",
  fontSize: "12px",
};

const goLine = {
  color: "var(--green)",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginTop: "4px",
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

const recommendationTextStyle = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  color: "var(--text-main)",
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