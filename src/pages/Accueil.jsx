import {
  Bot,
  Eye,
  EyeOff,
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
}) {
  const t = getText(settings);
  const [showAmounts, setShowAmounts] = useState(false);

  const totalDebt = financeData.debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const activeGoals = selectedGoals.filter(
    (goal) => !goal.archived
  );

  const mainGoal =
    activeGoals.find((goal) => goal.highlighted) ||
    activeGoals[0];

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
        <p className="accueil-eyebrow">
          OnJarama Path V4.3
        </p>

        <h1 className="accueil-title">
          {t.heroTitle}
          <br />
          <span>{t.heroAccent}</span>
        </h1>

        <p className="accueil-subtitle">
          Transformez vos objectifs en un plan
          concret, réaliste et motivant.
        </p>
      </section>

      <div className="accueil-actions">
        <button
          onClick={() => setCurrentPage("situation")}
          className="primary-action"
        >
          Commencer ma situation
        </button>

        <button
          onClick={() => setCurrentPage("assistant")}
          className="ai-action"
        >
          <Bot size={18} />
          IA OnJarama
        </button>
      </div>

      <section className="accueil-safe-row">
        <span className="accueil-badge">
          🔒 Privé
        </span>

        <span className="accueil-badge">
          🌍 Démo
        </span>

        <button
          onClick={() =>
            setShowAmounts(!showAmounts)
          }
          className="eye-action"
        >
          {showAmounts ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}

          {showAmounts
            ? "Masquer"
            : "Afficher"}
        </button>
      </section>

      <section className="accueil-grid">
        <QuickTile
          icon={<TrendingUp />}
          title="Vue rapide"
          text={money(totalDebt)}
          color="var(--gold)"
          onClick={() =>
            setCurrentPage("situation")
          }
        />

        <QuickTile
          icon={<Target />}
          title="Objectif"
          text={
            mainGoal
              ? mainGoal.title
              : "Créer un objectif"
          }
          color="var(--green)"
          onClick={() =>
            setCurrentPage("objectifs")
          }
        />

        <QuickTile
          icon={<PiggyBank />}
          title="Victoire"
          text={
            totalDebt > 0
              ? "Réduire la dette"
              : "Bâtir le plan"
          }
          color="var(--blue)"
          onClick={() =>
            setCurrentPage("parcours")
          }
        />

        <QuickTile
          icon={<ShieldCheck />}
          title="Sécurité"
          text="Données locales"
          color="var(--purple)"
          onClick={() =>
            setCurrentPage("profil")
          }
        />
      </section>

      <section className="accueil-headline">
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Landmark
            size={20}
            color="var(--gold)"
          />

          <strong>
            Connexion bancaire
          </strong>
        </div>

        <p
          style={{
            margin: 0,
            color: "var(--text-muted)",
          }}
        >
          Bientôt disponible.
          Synchronisation lecture seule
          sécurisée de vos comptes,
          dépenses, épargne et
          progression financière.
        </p>
      </section>

      <section className="accueil-headline">
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Sparkles
            size={20}
            color="var(--blue)"
          />

          <strong>
            Ce que peut faire
            OnJarama Path
          </strong>
        </div>

        <p
          style={{
            margin: 0,
            color: "var(--text-muted)",
            lineHeight: 1.4,
          }}
        >
          • Prioriser vos dettes
          automatiquement.
          <br />
          • Construire un plan
          financier personnalisé.
          <br />
          • Simuler plusieurs
          objectifs.
          <br />
          • Suivre votre progression
          dans une timeline claire.
          <br />
          • Recevoir des recommandations
          intelligentes.
        </p>
      </section>

      <section className="accueil-hint">
        <Lightbulb
          size={16}
          color="var(--gold)"
        />

        <p>
          Appui long, cartes
          réversibles et synchronisation
          bancaire arrivent dans les
          prochaines versions.
        </p>
      </section>
    </div>
  );
}

function QuickTile({
  icon,
  title,
  text,
  color,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="accueil-tile"
      style={{
        borderColor: color,
      }}
    >
      <span
        className="accueil-tile-icon"
        style={{ color }}
      >
        {icon}
      </span>

      <strong>{title}</strong>

      <small>{text}</small>
    </button>
  );
}

export default Accueil;