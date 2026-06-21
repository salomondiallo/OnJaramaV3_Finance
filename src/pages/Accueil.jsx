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
  BookOpen,
  Cloud,
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

  const priorityDebt = [...debts]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort(
      (a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0)
    )[0];

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
      remaining: Math.max(
        0,
        Number(goal.targetAmount || 0) - Number(goal.currentAmount || 0)
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

  const nextVictory = getNextVictory({
    priorityDebt,
    closestGoal,
    mainGoal,
    totalDebt,
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
        <p className="accueil-eyebrow">OnJarama Path V12.3</p>

        <h1 className="accueil-title">
          {t.heroTitle}
          <br />
          <span>{t.heroAccent}</span>
        </h1>

        <p className="accueil-subtitle">
          Situation, objectif, simulation, activation, parcours : votre chemin reste clair.
        </p>
      </section>

      <section className="accueil-headline" style={pathStartCard}>
        <div style={sectionHead}>
          <Route size={20} color={situationScore.color} />
          <strong>Point de départ</strong>
        </div>

        <p style={softText}>
          {monthlyIncome > 0
            ? "Situation renseignée. La prochaine étape est de cibler une destination."
            : "Ajoutez votre situation pour activer les objectifs et simulations."}
        </p>

        <div style={miniPathGrid}>
          <MiniPathStep label="1" text="Situation" active={monthlyIncome > 0} />
          <MiniPathStep
            label="2"
            text="Objectifs"
            active={activeGoals.length > 0}
          />
          <MiniPathStep
            label="3"
            text="Simulation"
            active={Boolean(mainGoal?.simulation)}
          />
          <MiniPathStep label="4" text="Plan" active={Boolean(mainGoal)} />
        </div>

        <button
          onClick={() =>
            setCurrentPage(
              monthlyIncome > 0 ? "objectifs" : "situation",
              monthlyIncome > 0 ? null : "origine-fonds"
            )
          }
          className="primary-action"
          style={{ marginTop: 12 }}
        >
          {monthlyIncome > 0 ? "Choisir ma destination" : "Ouvrir Ma Situation"}
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

      <section className="accueil-headline" style={nextVictoryCard}>
        <div style={sectionHead}>
          <Trophy size={20} color="var(--gold)" />
          <strong>Prochaine victoire</strong>
        </div>

        <p style={softText}>
          <strong>{nextVictory.title}</strong>
        </p>

        <p style={softText}>{nextVictory.text}</p>

        <div style={miniBarBg}>
          <div
            style={{
              ...miniBarFill,
              width: `${nextVictory.progress}%`,
              background: nextVictory.color,
            }}
          />
        </div>

        <button
          onClick={() => setCurrentPage(nextVictory.page)}
          className="ai-action"
          style={{ marginTop: 12 }}
        >
          {nextVictory.button}
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

      <section className="accueil-headline" style={connectDiscoverCard}>
        <div style={sectionHead}>
          <Sparkles size={20} color="var(--gold)" />
          <strong>Connect+ Découvre</strong>
        </div>

        <p style={softText}>
          Les nouveautés OnJarama Path sont regroupées ici pour ne rien manquer.
        </p>

        <div style={discoverGrid}>
          <DiscoverItem
            icon={<Brain size={17} />}
            title="Smart Planning"
            text="Mon Plan recommande l’action principale."
            color="var(--gold)"
          />
          <DiscoverItem
            icon={<Calculator size={17} />}
            title="Simulateur Premium"
            text="Rythmes Tranquille, Équilibré, Dynamique et Féroce."
            color="var(--blue)"
          />
          <DiscoverItem
            icon={<Route size={17} />}
            title="Smart Journey"
            text="Votre parcours devient une histoire claire."
            color="var(--green)"
          />
          <DiscoverItem
            icon={<Cloud size={17} />}
            title="Cloud Sync"
            text="Synchronisation Supabase bientôt disponible."
            color="var(--purple)"
          />
        </div>

        <div style={discoverActions}>
          <button
            onClick={() => setCurrentPage("patchnotes")}
            style={discoverButton}
          >
            <Sparkles size={16} />
            Voir Patch Notes
          </button>

          <button onClick={() => setCurrentPage("guide")} style={guideButton}>
            <BookOpen size={16} />
            Guide & Astuces
          </button>
        </div>
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
            label="Simuler objectif"
            text="Objectif → Simulation"
            color="var(--blue)"
            onClick={() => setCurrentPage("simulateur")}
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
            label="Destination"
            value={mainGoal ? mainGoal.title : "Objectif à choisir"}
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
          text={
            hasSources
              ? `${sourceCount} enregistrée${sourceCount > 1 ? "s" : ""}`
              : "À votre rythme"
          }
          color={hasSources ? "var(--green)" : "var(--gold)"}
          onClick={() => setCurrentPage("situation", "origine-fonds")}
        />

        <QuickTile
          icon={<Target />}
          title="Parcours"
          text={mainGoal ? "Continuer le suivi" : "Créer un objectif"}
          color="var(--green)"
          onClick={() => setCurrentPage(mainGoal ? "parcours" : "objectifs")}
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

function MiniPathStep({ label, text, active }) {
  return (
    <div
      style={{
        ...miniPathStep,
        borderColor: active ? "var(--gold)" : "var(--border)",
      }}
    >
      <strong style={{ color: active ? "var(--gold)" : "var(--text-muted)" }}>
        {label}
      </strong>
      <small>{text}</small>
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

function DiscoverItem({ icon, title, text, color }) {
  return (
    <div style={{ ...discoverItem, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <strong>{title}</strong>
      <small>{text}</small>
    </div>
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

function getNextVictory({ priorityDebt, closestGoal, mainGoal, totalDebt }) {
  if (priorityDebt) {
    const balance = Number(priorityDebt.balance || 0);
    const nextThreshold = Math.max(0, Math.floor((balance - 1) / 1000) * 1000);
    const remainingToThreshold = Math.max(0, balance - nextThreshold);
    const progress =
      balance > 0
        ? Math.min(
            100,
            Math.max(6, Math.round(((1000 - remainingToThreshold) / 1000) * 100))
          )
        : 100;

    return {
      title: priorityDebt.name,
      text:
        remainingToThreshold > 0
          ? `${remainingToThreshold.toLocaleString("fr-CA", {
              maximumFractionDigits: 0,
            })} $ avant le prochain palier.`
          : "Dette prête à être finalisée.",
      button: "Voir mes dettes",
      page: "dettes",
      progress,
      color: "var(--gold)",
    };
  }

  if (closestGoal) {
    return {
      title: closestGoal.title,
      text:
        closestGoal.progress >= 100
          ? "Objectif atteint. Une victoire à célébrer."
          : `${closestGoal.progress}% complété • ${closestGoal.remaining.toLocaleString(
              "fr-CA",
              { maximumFractionDigits: 0 }
            )} $ restants.`,
      button: "Voir Objectifs",
      page: "objectifs",
      progress: closestGoal.progress,
      color: closestGoal.progress >= 80 ? "var(--green)" : "var(--blue)",
    };
  }

  if (mainGoal) {
    return {
      title: mainGoal.title,
      text: "Objectif principal identifié. Ajoutez une progression pour créer la prochaine victoire.",
      button: "Voir Mon Plan",
      page: "monplan",
      progress: 12,
      color: "var(--gold)",
    };
  }

  if (totalDebt > 0) {
    return {
      title: "Réduction des dettes",
      text: "Créez un objectif dette pour suivre votre prochaine victoire.",
      button: "Créer un objectif",
      page: "objectifs",
      progress: 8,
      color: "var(--red)",
    };
  }

  return {
    title: "Premier objectif",
    text: "Ajoutez une destination pour activer votre prochaine victoire.",
    button: "Créer un objectif",
    page: "objectifs",
    progress: 0,
    color: "var(--gold)",
  };
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

  if (totalDebt > 0 && !mainGoal) {
    return {
      title: "Créer un objectif dette",
      text: "Votre dette existe déjà dans Situation. L’étape suivante est d’en faire une destination mesurable.",
      button: "Ouvrir Objectifs",
      page: "objectifs",
    };
  }

  if (totalDebt > 0) {
    return {
      title: "Simuler le meilleur chemin",
      text: "Comparez les rythmes pour avancer sans perdre votre cap.",
      button: "Ouvrir Simulateur",
      page: "simulateur",
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
    text: "Ajoutez une destination pour que OnJarama Path construise votre parcours.",
    button: "Ouvrir Objectifs",
    page: "objectifs",
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
  if (safeScore >= 80)
    return {
      score: safeScore,
      isReady: true,
      color: "var(--green)",
      label: "Base solide. Continuez à protéger votre marge.",
    };
  if (safeScore >= 55)
    return {
      score: safeScore,
      isReady: true,
      color: "var(--gold)",
      label: "Situation stable, mais quelques ajustements peuvent aider.",
    };
  return {
    score: safeScore,
    isReady: true,
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

const mainGoalHomeCard = {
  border: "1px solid var(--gold)",
  background:
    "linear-gradient(135deg, rgba(212,175,55,.16), rgba(34,197,94,.08), var(--bg-card))",
};

const progressFlagCard = {
  border: "1px solid rgba(212,175,55,.5)",
  background: "linear-gradient(135deg, rgba(212,175,55,.13), var(--bg-card))",
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

const pathStartCard = {
  border: "1px solid var(--gold)",
  background:
    "linear-gradient(135deg, rgba(212,175,55,.14), rgba(34,197,94,.06), var(--bg-card))",
};

const nextVictoryCard = {
  border: "1px solid var(--gold)",
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.24), transparent 34%), linear-gradient(135deg, rgba(212,175,55,.16), rgba(34,197,94,.08), var(--bg-card))",
};

const connectDiscoverCard = {
  border: "1px solid rgba(212,175,55,.62)",
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.28), transparent 32%), linear-gradient(135deg, rgba(56,189,248,.10), rgba(212,175,55,.10), var(--bg-card))",
  boxShadow: "0 0 22px rgba(212,175,55,.12)",
};

const discoverGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "8px",
  marginTop: "12px",
};

const discoverItem = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "15px",
  padding: "11px",
  display: "grid",
  gap: "5px",
};

const discoverActions = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "8px",
  marginTop: "12px",
};

const discoverButton = {
  width: "100%",
  minHeight: "42px",
  border: "1px solid var(--gold)",
  borderRadius: "14px",
  background: "rgba(212,175,55,.14)",
  color: "var(--gold)",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "7px",
};

const guideButton = {
  width: "100%",
  minHeight: "42px",
  border: "1px solid var(--blue)",
  borderRadius: "14px",
  background: "rgba(56,189,248,.12)",
  color: "var(--blue)",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "7px",
};

const miniBarBg = {
  height: "10px",
  background: "var(--bg-panel)",
  borderRadius: "999px",
  marginTop: "12px",
  overflow: "hidden",
};

const miniBarFill = {
  height: "100%",
  borderRadius: "999px",
};

const miniPathGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "7px",
  marginTop: "12px",
};

const miniPathStep = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "13px",
  padding: "9px 6px",
  display: "grid",
  gap: "3px",
  textAlign: "center",
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