import {
  Bot,
  Eye,
  EyeOff,
  Flag,
  Flame,
  Gauge,
  Lightbulb,
  PiggyBank,
  ShieldCheck,
  Target,
  TrendingUp,
  Landmark,
  Sparkles,
  Trophy,
  Wallet,
  CreditCard,
  Route,
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

  const mainGoal =
    activeGoals.find((goal) => goal.highlighted) || activeGoals[0];

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
  const lastVictory =
    history.find((item) => item.type === "victoire") || achievedGoals[0];

  const smartAlerts = buildSmartAlerts({ activeGoals, debts });
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
        <p className="accueil-eyebrow">OnJarama Path V8.8</p>

        <h1 className="accueil-title">
          {t.heroTitle}
          <br />
          <span>{t.heroAccent}</span>
        </h1>

        <p className="accueil-subtitle">
          Votre compagnon financier premium pour comprendre, décider et avancer
          sans pression.
        </p>
      </section>

      <section className="accueil-headline" style={commandCenter}>
        <div style={sectionHead}>
          <Sparkles size={20} color="var(--gold)" />
          <strong>Centre de commande OnJarama</strong>
        </div>

        <div style={commandGrid}>
          <CommandStat
            icon={<Gauge size={18} />}
            label="Score situation"
            value={`${situationScore.score}%`}
            color={situationScore.color}
          />

          <CommandStat
            icon={<Flame size={18} />}
            label="Discipline"
            value={`${discipline.score}%`}
            color={getDisciplineColor(discipline.score)}
          />

          <CommandStat
            icon={<Target size={18} />}
            label="Objectifs actifs"
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

      <section className="accueil-headline" style={companionCard}>
        <div style={sectionHead}>
          <Route size={20} color="var(--gold)" />
          <strong>Compagnon financier</strong>
        </div>

        <div style={companionGrid}>
          <CompanionLine
            icon="🚩"
            label="Parcours"
            value={
              firstGoal
                ? `Commencé ${getStartedLabel(firstGoal.createdAt)}`
                : "Pas encore commencé"
            }
          />

          <CompanionLine
            icon="💰"
            label="Dernier dépôt"
            value={lastDeposit ? lastDeposit.message : "Aucun dépôt enregistré"}
          />

          <CompanionLine
            icon="🏆"
            label="Dernière victoire"
            value={
              lastVictory?.message ||
              lastVictory?.title ||
              "Aucune victoire enregistrée"
            }
          />

          <CompanionLine
            icon="➡️"
            label="Action recommandée"
            value={nextAction.title}
          />
        </div>

        <button
          onClick={() => setCurrentPage(nextAction.page)}
          className="primary-action"
          style={{ marginTop: 14 }}
        >
          {nextAction.button}
        </button>
      </section>

      <section className="accueil-headline" style={disciplineGaugeCard}>
        <div style={sectionHead}>
          <Gauge size={20} color="var(--gold)" />
          <strong>Discipline OnJarama</strong>
        </div>

        <div style={scoreRow}>
          <strong style={scoreValue}>{discipline.score}%</strong>
          <span style={scoreLabel}>{discipline.label}</span>
        </div>

        <div style={scoreBarBg}>
          <div
            style={{
              ...scoreBarFill,
              width: `${discipline.score}%`,
              background: getDisciplineColor(discipline.score),
            }}
          />
        </div>

        <div style={disciplineChecklist}>
          <DisciplineCheck ok={discipline.hasActiveGoal} text="Objectif actif" />
          <DisciplineCheck
            ok={discipline.hasRecentActivity}
            text="Activité récente"
          />
          <DisciplineCheck
            ok={!discipline.hasOverduePayment}
            text="Aucun paiement en retard"
          />
          <DisciplineCheck
            ok={discipline.hasRecentDeposit}
            text="Dépôt récent"
          />
        </div>
      </section>

      <section className="accueil-headline" style={situationCard}>
        <div style={sectionHead}>
          <Wallet size={20} color={situationScore.color} />
          <strong>Situation actuelle</strong>
        </div>

        <div style={situationGrid}>
          <SituationLine
            label="Revenus"
            value={money(monthlyIncome)}
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
          onClick={() => setCurrentPage("situation")}
          className="primary-action"
          style={{ marginTop: 12 }}
        >
          Ouvrir Situation Premium
        </button>
      </section>

      {smartAlerts.length > 0 && (
        <section className="accueil-headline" style={alertCard}>
          <div style={sectionHead}>
            <Flame size={20} color="var(--gold)" />
            <strong>Alertes intelligentes</strong>
          </div>

          {smartAlerts.slice(0, 3).map((alert) => (
            <p key={alert.id} style={alertLine}>
              • {alert.message}
            </p>
          ))}

          <button
            onClick={() => setCurrentPage("notifications")}
            className="ai-action"
            style={{ marginTop: 12 }}
          >
            Voir les notifications
          </button>
        </section>
      )}

      {firstGoal && (
        <section className="accueil-headline" style={disciplineCard}>
          <div style={sectionHead}>
            <Flag size={20} color="var(--gold)" />
            <strong>Parcours commencé</strong>
          </div>

          <p style={softText}>
            🚩 Vous avez commencé votre parcours{" "}
            {getStartedLabel(firstGoal.createdAt)}.
          </p>

          <p style={softText}>Chaque petit dépôt compte.</p>
        </section>
      )}

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

      <div className="accueil-actions">
        <button
          onClick={() => setCurrentPage("situation")}
          className="primary-action"
        >
          Commencer ma situation
        </button>

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
          onClick={() => setCurrentPage("situation")}
        />

        <QuickTile
          icon={<Target />}
          title="Objectif"
          text={mainGoal ? mainGoal.title : "Créer un objectif"}
          color="var(--green)"
          onClick={() => setCurrentPage("objectifs")}
        />

        <QuickTile
          icon={<Trophy />}
          title="Victoire"
          text={
            achievedGoals.length > 0
              ? `${achievedGoals.length} atteinte${
                  achievedGoals.length > 1 ? "s" : ""
                }`
              : totalDebt > 0
                ? "Réduire la dette"
                : "Bâtir le plan"
          }
          color="var(--gold)"
          onClick={() => setCurrentPage("parcours")}
        />

        <QuickTile
          icon={<ShieldCheck />}
          title="Sécurité"
          text="Données locales"
          color="var(--purple)"
          onClick={() => setCurrentPage("profil")}
        />
      </section>

      <section className="accueil-headline">
        <div style={sectionHead}>
          <Landmark size={20} color="var(--gold)" />
          <strong>Connexion bancaire</strong>
        </div>

        <p style={softText}>
          Bientôt disponible. Synchronisation lecture seule sécurisée de vos
          comptes, dépenses, épargne et progression financière.
        </p>
      </section>

      <section className="accueil-headline">
        <div style={sectionHead}>
          <Sparkles size={20} color="var(--blue)" />
          <strong>Ce que peut faire OnJarama Path</strong>
        </div>

        <p style={softText}>
          • Prioriser vos dettes automatiquement.
          <br />
          • Construire un plan financier personnalisé.
          <br />
          • Simuler plusieurs objectifs.
          <br />
          • Suivre votre progression dans une timeline claire.
          <br />
          • Recevoir des recommandations intelligentes.
        </p>
      </section>

      <section className="accueil-hint">
        <Lightbulb size={16} color="var(--gold)" />

        <p>
          Situation Premium, Parcours Premium et Objectifs intelligents sont
          maintenant connectés dans l’expérience V8.
        </p>
      </section>
    </div>
  );
}

function getNextAction({ totalDebt, mainGoal, closestGoal, monthlyIncome }) {
  if (!monthlyIncome || monthlyIncome <= 0) {
    return {
      title: "Compléter votre situation",
      text: "Ajoutez vos revenus et vos sorties pour activer une lecture plus précise.",
      button: "Ouvrir Situation",
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
      button: "Voir mes objectifs",
      page: "objectifs",
    };
  }

  if (mainGoal) {
    return {
      title: `Avancer ${mainGoal.title}`,
      text: "Gardez le cap sur votre objectif principal.",
      button: "Continuer",
      page: "objectifs",
    };
  }

  return {
    title: "Créer votre premier objectif",
    text: "Ajoutez un objectif pour que OnJarama Path construise votre parcours.",
    button: "Créer un objectif",
    page: "objectifs",
  };
}

function buildSmartAlerts({ activeGoals, debts }) {
  const alerts = [];

  const priorityDebt = [...debts]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort((a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0))[0];

  if (priorityDebt) {
    alerts.push({
      id: "debt-priority",
      message: `Dette prioritaire : ${priorityDebt.name || "dette"} à ${
        priorityDebt.interestRate || 0
      } %.`,
    });
  }

  activeGoals.forEach((goal) => {
    const target = Number(goal.targetAmount || 0);
    const current = Number(goal.currentAmount || 0);

    if (target <= 0) return;

    const progress = Math.min(100, Math.round((current / target) * 100));

    if (progress >= 100) {
      alerts.push({
        id: `goal-win-${goal.id}`,
        message: `${goal.title} est atteint à 100 %.`,
      });
      return;
    }

    if (progress >= 90) {
      alerts.push({
        id: `goal-90-${goal.id}`,
        message: `${goal.title} est atteint à ${progress} %.`,
      });
      return;
    }

    if (progress >= 80) {
      alerts.push({
        id: `goal-80-${goal.id}`,
        message: `${goal.title} est presque atteint (${progress} %).`,
      });
    }

    if (goal.lastDeposit?.date) {
      const lastDate = new Date(goal.lastDeposit.date);
      const now = new Date();

      if (!Number.isNaN(lastDate.getTime())) {
        const days = Math.floor(
          (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (days >= 14 && progress < 100) {
          alerts.push({
            id: `deposit-${goal.id}`,
            message: `Aucun dépôt sur ${goal.title} depuis ${days} jours.`,
          });
        }
      }
    }
  });

  return alerts.slice(0, 5);
}

function getSituationScore({
  monthlyIncome,
  monthlyExpenses,
  monthlySavings,
  monthlyAvailable,
  totalDebt,
}) {
  let score = 50;

  if (monthlyIncome > 0) score += 15;
  if (monthlyAvailable > 0) score += 15;
  if (monthlySavings > 0) score += 10;
  if (totalDebt === 0) score += 10;
  if (monthlyIncome > 0 && totalDebt > monthlyIncome * 6) score -= 18;
  if (monthlyIncome > 0 && monthlyExpenses > monthlyIncome) score -= 15;
  if (monthlyAvailable < 0) score -= 25;

  const safeScore = Math.max(0, Math.min(100, score));

  if (safeScore >= 80) {
    return {
      score: safeScore,
      color: "var(--green)",
      label: "Base solide. Continuez à protéger votre marge.",
    };
  }

  if (safeScore >= 55) {
    return {
      score: safeScore,
      color: "var(--gold)",
      label: "Situation stable, mais quelques ajustements peuvent aider.",
    };
  }

  return {
    score: safeScore,
    color: "var(--red)",
    label: "Priorité : reprendre du souffle mensuel.",
  };
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

function DisciplineCheck({ ok, text }) {
  return (
    <div
      style={{
        ...disciplineCheck,
        borderColor: ok ? "var(--green)" : "var(--border)",
      }}
    >
      <span>{ok ? "✅" : "○"}</span>
      <small>{text}</small>
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

const sectionHead = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  marginBottom: 8,
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

const disciplineGaugeCard = {
  border: "1px solid var(--gold)",
  background: "linear-gradient(135deg, rgba(212,175,55,.12), var(--bg-card))",
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

const scoreRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  marginTop: "8px",
};

const scoreValue = {
  fontSize: "34px",
  color: "var(--text-main)",
};

const scoreLabel = {
  color: "var(--gold)",
  fontWeight: "bold",
};

const scoreBarBg = {
  height: "12px",
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "999px",
  marginTop: "12px",
  overflow: "hidden",
};

const scoreBarFill = {
  height: "100%",
  borderRadius: "999px",
  transition: "width .35s ease",
};

const disciplineChecklist = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "8px",
  marginTop: "12px",
};

const disciplineCheck = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "9px",
  display: "flex",
  gap: "6px",
  alignItems: "center",
  color: "var(--text-muted)",
};

const alertCard = {
  border: "1px solid var(--gold)",
  background: "linear-gradient(135deg, rgba(212,175,55,.12), var(--bg-card))",
};

const alertLine = {
  margin: "6px 0 0",
  color: "var(--text-muted)",
  lineHeight: 1.4,
};

const disciplineCard = {
  border: "1px solid var(--gold)",
  background: "linear-gradient(135deg, rgba(212,175,55,.14), var(--bg-card))",
};

const nextActionCard = {
  border: "1px solid var(--green)",
  background: "linear-gradient(135deg, rgba(34,197,94,.12), var(--bg-card))",
};

export default Accueil;