import {
  Bot,
  Eye,
  EyeOff,
  Flag,
  Gauge,
  PiggyBank,
  ShieldCheck,
  Target,
  Landmark,
  Sparkles,
  Trophy,
  Wallet,
  CreditCard,
  Route,
  Brain,
  Calculator,
  CheckCircle,
  BarChart3,
} from "lucide-react";

import { useState } from "react";
import { getText } from "../data/translations";

function Accueil({
  financeData,
  selectedGoals,
  setCurrentPage,
  settings,
  activityHistory,
  disciplineScore,
}) {
  const t = getText(settings);
  const [showAmounts, setShowAmounts] = useState(false);

  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];
  const goals = Array.isArray(selectedGoals) ? selectedGoals : [];
  const history = Array.isArray(activityHistory) ? activityHistory : [];

  const discipline = disciplineScore || {
    score: 0,
    label: "Départ",
    hasActiveGoal: false,
    hasRecentActivity: false,
    hasRecentDeposit: false,
    hasOverduePayment: false,
  };

  const monthlyIncome = Number(financeData?.overview?.monthlyIncome || 0);
  const monthlyExpenses = Number(financeData?.overview?.monthlyExpenses || 0);
  const monthlySavings = Number(financeData?.overview?.monthlySavings || 0);
  const monthlyAvailable = monthlyIncome - monthlyExpenses - monthlySavings;

  const totalDebt = debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const activeGoals = goals.filter((goal) => !goal.archived);
  const mainGoal = activeGoals.find((goal) => goal.highlighted) || activeGoals[0];

  const firstGoal = [...activeGoals].sort(
    (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
  )[0];

  const closestGoal = [...activeGoals]
    .filter((goal) => Number(goal.targetAmount || 0) > 0)
    .map((goal) => ({
      ...goal,
      progress: Math.min(
        100,
        Math.round(
          (Number(goal.currentAmount || 0) / Number(goal.targetAmount || 0)) *
            100
        )
      ),
    }))
    .sort((a, b) => b.progress - a.progress)[0];

  const achievedGoals = activeGoals.filter(
    (goal) =>
      Number(goal.targetAmount || 0) > 0 &&
      Number(goal.currentAmount || 0) >= Number(goal.targetAmount || 0)
  );

  const lastActivity = history[0];
  const lastDeposit = history.find((item) => item.type === "depot");
  const lastVictory = history.find((item) => item.type === "victoire") || achievedGoals[0];

  const situationScore = getSituationScore({
    monthlyIncome,
    monthlyExpenses,
    monthlySavings,
    monthlyAvailable,
    totalDebt,
  });

  const nextAction = getNextAction({
    totalDebt,
    mainGoal,
    closestGoal,
    monthlyIncome,
  });

  const sourceCount = getFinancialSourceCount({ monthlyIncome, financeData });
  const hasSources = sourceCount > 0;

  function money(value) {
    if (!showAmounts) return "Chiffres masqués";

    return `${Number(value || 0).toLocaleString("fr-CA", {
      maximumFractionDigits: 2,
    })} $`;
  }

  return (
    <div className="native-page accueil-page">
      <section className="accueil-hero" />

      <section className="accueil-headline" style={premiumHero}>
        <p className="accueil-eyebrow">OnJarama Path V10.9</p>

        <h1 className="accueil-title">
          {t.heroTitle}
          <br />
          <span>{t.heroAccent}</span>
        </h1>

        <p className="accueil-subtitle">
          Votre situation d’abord. Votre plan ensuite. Votre parcours à votre rythme.
        </p>
      </section>
      <section className="accueil-headline" style={quickActionsCard}>
        <div style={sectionHead}>
          <Sparkles size={20} color="var(--gold)" />
          <strong>Actions rapides utiles</strong>
        </div>

        <div style={quickActionsGrid}>
          <QuickActionButton
            label="Ajouter revenu"
            text="Origine des fonds"
            color="var(--green)"
            onClick={() => setCurrentPage("situation", "origine-fonds")}
          />
          <QuickActionButton
            label="Ajouter dépense"
            text="Destination des fonds"
            color="var(--red)"
            onClick={() => setCurrentPage("situation", "destination-fonds")}
          />
          <QuickActionButton
            label="Ajouter dette"
            text="Dettes modifiables"
            color="var(--gold)"
            onClick={() => setCurrentPage("situation", "dettes")}
          />
          <QuickActionButton
            label="Nouvel objectif"
            text="Objectifs"
            color="var(--blue)"
            onClick={() => setCurrentPage("objectifs")}
          />
        </div>
      </section>

      <section className="accueil-headline" style={situationCard}>
        <div style={sectionHead}>
          <Wallet size={20} color={situationScore.color} />
          <strong>Ma situation</strong>
        </div>

        <div style={situationGrid}>
          <SituationLine
            label="Revenus"
            value={showAmounts ? money(monthlyIncome) : "Protégés"}
            color="var(--green)"
          />
          <SituationLine
            label="Sorties"
            value={money(monthlyExpenses + monthlySavings)}
            color="var(--red)"
          />
          <SituationLine
            label="Disponible"
            value={money(monthlyAvailable)}
            color={monthlyAvailable >= 0 ? "var(--green)" : "var(--red)"}
          />
        </div>

        <p style={softText}>{situationScore.label}</p>

        <button
          onClick={() => setCurrentPage("situation", "origine-fonds")}
          className="primary-action"
          style={{ marginTop: 12 }}
        >
          Ouvrir Ma Situation
        </button>
      </section>

      <section className="accueil-headline" style={nextActionCard}>
        <div style={sectionHead}>
          <Target size={20} color="var(--green)" />
          <strong>Prochaine action recommandée</strong>
        </div>

        <p style={softText}>
          <strong>{nextAction.title}</strong>
        </p>

        <p style={softText}>{nextAction.text}</p>

        <button
          onClick={() => setCurrentPage(nextAction.page)}
          className="primary-action"
          style={{ marginTop: 12 }}
        >
          {nextAction.button}
        </button>
      </section>

      <section className="accueil-headline" style={fundingCard}>
        <div style={sectionHead}>
          <PiggyBank
            size={20}
            color={hasSources ? "var(--green)" : "var(--gold)"}
          />
          <strong>Mes sources financières</strong>
        </div>

        <div style={fundingStatusRow}>
          {hasSources ? (
            <CheckCircle size={18} color="var(--green)" />
          ) : (
            <Sparkles size={18} color="var(--gold)" />
          )}

          <strong
            style={{
              color: hasSources ? "var(--green)" : "var(--gold)",
            }}
          >
            {hasSources
              ? `${sourceCount} source${sourceCount > 1 ? "s" : ""} enregistrée${
                  sourceCount > 1 ? "s" : ""
                }`
              : "Aucune source enregistrée"}
          </strong>
        </div>

        <p style={softText}>
          Vos montants restent masqués sur l’accueil. Ajoutez vos revenus lorsque vous serez prêt.
        </p>

        <button
          onClick={() => setCurrentPage("situation", "origine-fonds")}
          className="ai-action"
          style={{ marginTop: 12 }}
        >
          Configurer
        </button>
      </section>

      <section className="accueil-headline" style={commandCenter}>
        <div style={sectionHead}>
          <Sparkles size={20} color="var(--gold)" />
          <strong>Centre de commande</strong>
        </div>

        <div style={commandGrid}>
          <CommandStat
            icon={<Gauge size={18} />}
            label="Score situation"
            value={situationScore.isReady ? `${situationScore.score}%` : "À compléter"}
            color={situationScore.color}
          />

          <CommandStat
            icon={<Flag size={18} />}
            label="Discipline"
            value={`${discipline.score}%`}
            color={getDisciplineColor(discipline.score)}
          />

          <CommandStat
            icon={<Target size={18} />}
            label="Objectifs"
            value={`${activeGoals.length}`}
            color="var(--gold)"
          />

          <CommandStat
            icon={<Trophy size={18} />}
            label="Victoires"
            value={`${achievedGoals.length}`}
            color="var(--green)"
          />
        </div>
      </section>

      <section className="accueil-headline" style={progressFlagCard}>
        <div style={sectionHead}>
          <Flag size={20} color="var(--gold)" />
          <strong>Progression OnJarama</strong>
        </div>

        <p style={softText}>
          {firstGoal
            ? `🚩 Parcours démarré ${getStartedLabel(firstGoal.createdAt)}.`
            : "🚩 Votre parcours commencera dès votre première situation ou objectif."}
        </p>
      </section>

      <section className="accueil-headline" style={companionCard}>
        <div style={sectionHead}>
          <Route size={20} color="var(--gold)" />
          <strong>Compagnon financier</strong>
        </div>

        <div style={companionGrid}>
          <CompanionLine
            icon="📊"
            label="Fondation"
            value={monthlyIncome > 0 ? "Situation renseignée" : "Situation à démarrer"}
          />
          <CompanionLine
            icon="💰"
            label="Dernier dépôt"
            value={lastDeposit ? lastDeposit.message : "Aucun dépôt enregistré"}
          />
          <CompanionLine
            icon="🏆"
            label="Dernière victoire"
            value={lastVictory?.message || lastVictory?.title || "Aucune victoire enregistrée"}
          />
          <CompanionLine icon="➡️" label="Action" value={nextAction.title} />
        </div>
      </section>

      {lastActivity && (
        <section className="accueil-headline">
          <div style={sectionHead}>
            <Sparkles size={20} color="var(--blue)" />
            <strong>Dernière activité</strong>
          </div>

          <p style={softText}>
            <strong>{lastActivity.title}</strong>
          </p>

          <p style={softText}>{lastActivity.message}</p>
        </section>
      )}
      <div className="accueil-actions accueil-actions-single">
        <button onClick={() => setCurrentPage("assistant")} className="ai-action">
          <Bot size={18} />
          IA OnJarama
        </button>
      </div>

      <section className="accueil-safe-row">
        <span className="accueil-badge">🔒 Privé</span>
        <span className="accueil-badge">🌍 Démo</span>

        <button
          onClick={() => setShowAmounts(!showAmounts)}
          className="eye-action"
        >
          {showAmounts ? <EyeOff size={16} /> : <Eye size={16} />}
          {showAmounts ? "Masquer" : "Afficher"}
        </button>
      </section>

      <section className="accueil-grid">
        <QuickTile
          icon={<CreditCard />}
          title="Dettes"
          text={money(totalDebt)}
          color="var(--red)"
          onClick={() => setCurrentPage("situation", "dettes")}
        />

        <QuickTile
          icon={<PiggyBank />}
          title="Sources"
          text={hasSources ? `${sourceCount} enregistrée${sourceCount > 1 ? "s" : ""}` : "À votre rythme"}
          color={hasSources ? "var(--green)" : "var(--gold)"}
          onClick={() => setCurrentPage("situation", "origine-fonds")}
        />

        <QuickTile
          icon={<Target />}
          title="Objectif"
          text={mainGoal ? mainGoal.title : "Créer un objectif"}
          color="var(--green)"
          onClick={() => setCurrentPage("monplan")}
        />

        <QuickTile
          icon={<ShieldCheck />}
          title="Sécurité"
          text="Données protégées"
          color="var(--purple)"
          onClick={() => setCurrentPage("profil")}
        />
      </section>

      <section className="accueil-headline" style={bankMiniCard}>
        <div style={sectionHeadCompact}>
          <Landmark size={18} color="var(--gold)" />
          <strong>Connexion bancaire</strong>
          <span style={miniBadge}>Bientôt disponible</span>
        </div>
      </section>
    </div>
  );
}

function QuickActionButton({ label, text, color, onClick }) {
  return (
    <button onClick={onClick} style={{ ...quickActionBtn, borderColor: color }}>
      <strong style={{ color }}>{label}</strong>
      <small>{text}</small>
    </button>
  );
}

function ContextNavButton({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="context-nav-btn">
      <span>{icon}</span>
      <strong>{label}</strong>
    </button>
  );
}

function getFinancialSourceCount({ monthlyIncome, financeData }) {
  const sources = financeData?.fundingSources || financeData?.incomeSources;

  if (Array.isArray(sources)) {
    return sources.filter((source) => source && !source.archived).length;
  }

  return monthlyIncome > 0 ? 1 : 0;
}

function getNextAction({ totalDebt, mainGoal, closestGoal, monthlyIncome }) {
  if (!monthlyIncome || monthlyIncome <= 0) {
    return {
      title: "Compléter votre situation",
      text: "Ajoutez vos revenus et vos sorties pour activer une lecture plus précise.",
      button: "Ouvrir Ma Situation",
      page: "situation",
    };
  }

  if (totalDebt > 0) {
    return {
      title: "Réduire la dette prioritaire",
      text: "Votre plan gagne en force quand les dettes ralentissent moins vos projets.",
      button: "Voir ma situation",
      page: "situation",
    };
  }

  if (closestGoal && closestGoal.progress >= 80 && closestGoal.progress < 100) {
    return {
      title: `Finaliser ${closestGoal.title}`,
      text: `Progression : ${closestGoal.progress} %. Vous êtes proche d’une victoire.`,
      button: "Voir Mon Plan",
      page: "monplan",
    };
  }

  if (mainGoal) {
    return {
      title: `Avancer ${mainGoal.title}`,
      text: "Gardez le cap sur votre objectif principal.",
      button: "Voir Mon Plan",
      page: "monplan",
    };
  }

  return {
    title: "Créer votre premier objectif",
    text: "Ajoutez un objectif pour que OnJarama Path construise votre parcours.",
    button: "Ouvrir Mon Plan",
    page: "monplan",
  };
}

function getSituationScore({
  monthlyIncome,
  monthlyExpenses,
  monthlySavings,
  monthlyAvailable,
  totalDebt,
}) {
  if (!monthlyIncome || monthlyIncome <= 0) {
    return {
      score: 0,
      isReady: false,
      color: "var(--gold)",
      label: "Complétez vos sources et vos sorties pour générer un score fiable.",
    };
  }

  let score = 50;
  if (monthlyIncome > 0) score += 15;
  if (monthlyAvailable > 0) score += 15;
  if (monthlySavings > 0) score += 10;
  if (totalDebt === 0) score += 10;
  if (monthlyIncome > 0 && totalDebt > monthlyIncome * 6) score -= 18;
  if (monthlyIncome > 0 && monthlyExpenses > monthlyIncome) score -= 15;
  if (monthlyAvailable < 0) score -= 25;

  const safeScore = Math.max(0, Math.min(100, score));
  if (safeScore >= 80) return { score: safeScore, isReady: true, color: "var(--green)", label: "Base solide. Continuez à protéger votre marge." };
  if (safeScore >= 55) return { score: safeScore, isReady: true, color: "var(--gold)", label: "Situation stable, mais quelques ajustements peuvent aider." };
  return { score: safeScore, isReady: true, color: "var(--red)", label: "Priorité : reprendre du souffle mensuel." };
}

function getStartedLabel(createdAt) {
  if (!createdAt) return "aujourd’hui";

  const start = new Date(createdAt);
  const now = new Date();

  if (Number.isNaN(start.getTime())) return "aujourd’hui";

  const days = Math.max(
    0,
    Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );

  if (days === 0) return "aujourd’hui";
  if (days === 1) return "il y a 1 jour";

  return `il y a ${days} jours`;
}

function getDisciplineColor(score) {
  if (score <= 25) return "var(--red)";
  if (score <= 50) return "var(--gold)";
  if (score <= 75) return "var(--blue)";
  return "var(--green)";
}

function CompanionLine({ icon, label, value }) {
  return (
    <div style={companionLine}>
      <span>{icon}</span>
      <div>
        <small style={companionLabel}>{label}</small>
        <strong style={companionValue}>{value}</strong>
      </div>
    </div>
  );
}

function CommandStat({ icon, label, value, color }) {
  return (
    <div style={{ ...commandStat, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function SituationLine({ label, value, color }) {
  return (
    <div style={situationLine}>
      <span>{label}</span>
      <strong style={{ color }}>{value}</strong>
    </div>
  );
}

function QuickTile({ icon, title, text, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="accueil-tile"
      style={{ borderColor: color }}
    >
      <span className="accueil-tile-icon" style={{ color }}>
        {icon}
      </span>
      <strong>{title}</strong>
      <small>{text}</small>
    </button>
  );
}

const quickActionsCard = {
  border: "1px solid rgba(212,175,55,.45)",
  background: "linear-gradient(135deg, rgba(212,175,55,.10), var(--bg-card))",
};

const quickActionsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "8px",
  marginTop: "10px",
};

const quickActionBtn = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  color: "var(--text-main)",
  textAlign: "left",
  display: "grid",
  gap: "4px",
};

const sectionHead = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  marginBottom: 8,
};

const sectionHeadCompact = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  justifyContent: "space-between",
};

const softText = {
  margin: 0,
  color: "var(--text-muted)",
  lineHeight: 1.4,
};

const premiumHero = {
  border: "1px solid var(--gold)",
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.22), transparent 34%), var(--bg-card)",
};

const progressFlagCard = {
  border: "1px solid rgba(212,175,55,.5)",
  background: "linear-gradient(135deg, rgba(212,175,55,.13), var(--bg-card))",
};

const fundingCard = {
  border: "1px solid rgba(212,175,55,.55)",
  background:
    "linear-gradient(135deg, rgba(212,175,55,.12), rgba(34,197,94,.06), var(--bg-card))",
};

const fundingStatusRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
};

const commandCenter = {
  border: "1px solid rgba(212,175,55,.48)",
  background:
    "linear-gradient(135deg, rgba(212,175,55,.16), rgba(56,189,248,.08), var(--bg-card))",
};

const commandGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "12px",
};

const commandStat = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "5px",
};

const companionCard = {
  border: "1px solid var(--gold)",
  background: "linear-gradient(135deg, rgba(212,175,55,.16), var(--bg-card))",
};

const situationCard = {
  border: "1px solid var(--green)",
  background: "linear-gradient(135deg, rgba(34,197,94,.12), var(--bg-card))",
};

const situationGrid = {
  display: "grid",
  gap: "8px",
  margin: "12px 0",
};

const situationLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};

const companionGrid = {
  display: "grid",
  gap: "10px",
  marginTop: "12px",
};

const companionLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "11px",
  display: "grid",
  gridTemplateColumns: "28px 1fr",
  gap: "8px",
  alignItems: "center",
};

const companionLabel = {
  color: "var(--text-muted)",
  fontSize: "12px",
  display: "block",
};

const companionValue = {
  color: "var(--text-main)",
  display: "block",
  marginTop: "2px",
};

const nextActionCard = {
  border: "1px solid var(--green)",
  background: "linear-gradient(135deg, rgba(34,197,94,.12), var(--bg-card))",
};

const bankMiniCard = {
  border: "1px solid rgba(212,175,55,.36)",
  background: "linear-gradient(135deg, rgba(212,175,55,.08), var(--bg-card))",
};

const miniBadge = {
  border: "1px solid var(--gold)",
  borderRadius: "999px",
  padding: "5px 8px",
  color: "var(--gold)",
  fontSize: "11px",
  fontWeight: "900",
};

export default Accueil;
