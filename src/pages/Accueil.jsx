import {
  Bot,
  Eye,
  EyeOff,
  Flag,
  Lightbulb,
  PiggyBank,
  ShieldCheck,
  Target,
  TrendingUp,
  Landmark,
  Sparkles,
} from "lucide-react";

import { useState } from "react";
import { getText } from "../data/translations";

function Accueil({
  financeData,
  selectedGoals,
  setCurrentPage,
  settings,
  activityHistory,
}) {
  const t = getText(settings);
  const [showAmounts, setShowAmounts] = useState(false);

  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];
  const goals = Array.isArray(selectedGoals) ? selectedGoals : [];
  const history = Array.isArray(activityHistory) ? activityHistory : [];

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

  const lastActivity = history[0];

  const nextAction = getNextAction({
    totalDebt,
    mainGoal,
    closestGoal,
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

      <section className="accueil-headline">
        <p className="accueil-eyebrow">OnJarama Path V7.1</p>

        <h1 className="accueil-title">
          {t.heroTitle}
          <br />
          <span>{t.heroAccent}</span>
        </h1>

        <p className="accueil-subtitle">
          Transformez vos objectifs en un plan concret, réaliste et motivant.
        </p>
      </section>

      {firstGoal && (
        <section className="accueil-headline" style={disciplineCard}>
          <div style={sectionHead}>
            <Flag size={20} color="var(--gold)" />
            <strong>Discipline OnJarama</strong>
          </div>

          <p style={softText}>
            🚩 Vous avez commencé votre parcours {getStartedLabel(firstGoal.createdAt)}.
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
          icon={<TrendingUp />}
          title="Vue rapide"
          text={money(totalDebt)}
          color="var(--gold)"
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
          icon={<PiggyBank />}
          title="Victoire"
          text={totalDebt > 0 ? "Réduire la dette" : "Bâtir le plan"}
          color="var(--blue)"
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
          Appui long, cartes réversibles et synchronisation bancaire arrivent
          dans les prochaines versions.
        </p>
      </section>
    </div>
  );
}

function getNextAction({ totalDebt, mainGoal, closestGoal }) {
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

const disciplineCard = {
  border: "1px solid var(--gold)",
  background: "linear-gradient(135deg, rgba(212,175,55,.14), var(--bg-card))",
};

const nextActionCard = {
  border: "1px solid var(--green)",
  background: "linear-gradient(135deg, rgba(34,197,94,.12), var(--bg-card))",
};

export default Accueil;