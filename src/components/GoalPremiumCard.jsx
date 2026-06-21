import { useState } from "react";
import {
  ChevronRight,
  RotateCcw,
  Route,
  Sparkles,
  Star,
  Trash2,
  Trophy,
} from "lucide-react";
import { cleanMoneyInput, formatMoney } from "../utils/formatters";

function GoalPremiumCard({
  goal,
  rank,
  template,
  currency,
  isCelebrating,
  onDeposit,
  onHighlight,
  onRemove,
  onOpenJourney,
}) {
  const [flipped, setFlipped] = useState(false);
  const [customDeposit, setCustomDeposit] = useState("");

  const color =
    goal.progress >= 100 ? "var(--gold)" : template?.color || "var(--gold)";
  const estimated = getEstimatedDate(goal);
  const aiText = getAiText(goal);

  function submitCustomDeposit() {
    const amount = Number(customDeposit || 0);
    if (amount <= 0) return;

    onDeposit(goal.id, amount);
    setCustomDeposit("");
  }

  return (
    <div
      style={{
        ...goalCard,
        ...(isCelebrating ? celebrationCard : {}),
        borderColor: color,
        background: flipped
          ? "linear-gradient(135deg, rgba(212,175,55,.10), var(--bg-panel))"
          : goal.progress >= 100
            ? "linear-gradient(135deg, rgba(212,175,55,.13), var(--bg-panel))"
            : goal.highlighted
              ? "linear-gradient(135deg, rgba(212,175,55,.09), var(--bg-panel))"
              : "var(--bg-panel)",
      }}
    >
      {!flipped ? (
        <>
          {goal.highlighted && <div style={mainGoalBadge}>⭐ Objectif principal</div>}

          <div style={goalHeader}>
            <span style={{ color }}>
              {goal.progress >= 100 ? <Trophy /> : template?.icon}
            </span>

            <div style={{ minWidth: 0 }}>
              <strong style={goalTitle}>
                #{rank} {goal.title}
              </strong>
              <p style={mutedSmall}>
                {goal.categoryLabel || template?.label}
                {goal.option ? ` • ${goal.option}` : ""}
              </p>
            </div>

            <button
              onClick={() => setFlipped(true)}
              style={ghostButton}
              aria-label="Détails"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div style={badgeRow}>
            <span style={disciplineBadge}>{getStartedLabel(goal.createdAt)}</span>

            <span style={{ ...statusBadge, borderColor: color, color }}>
              {goal.status}
            </span>

            {goal.journeyLinked && (
              <span style={journeyBadge}>🧭 Parcours connecté</span>
            )}

            {goal.progress >= 100 && (
              <span style={victoryBadge}>🏆 Objectif atteint</span>
            )}
          </div>

          {isCelebrating && (
            <div style={celebrationBox}>
              <Sparkles size={18} />
              <strong>Félicitations, tu avances vraiment.</strong>
            </div>
          )}

          <div style={amountRow}>
            <span>{formatMoney(goal.currentAmount, currency)}</span>
            <strong>{formatMoney(goal.targetAmount, currency)}</strong>
          </div>

          <div style={barBg}>
            <div
              style={{
                ...barFill,
                width: `${goal.progress}%`,
                background: color,
              }}
            />
          </div>

          <p style={mutedSmall}>Progression : {goal.progress}%</p>
          <p style={mutedSmall}>Reste : {formatMoney(goal.remaining, currency)}</p>
          <p style={mutedSmall}>Prévision : {estimated}</p>

          <button onClick={onOpenJourney} style={journeyButton}>
            <Route size={16} />
            Voir dans mon parcours
          </button>
        </>
      ) : (
        <>
          <div style={goalHeader}>
            <span style={{ color }}>
              <RotateCcw />
            </span>

            <div style={{ minWidth: 0 }}>
              <strong style={goalTitle}>Résumé IA OnJarama</strong>
              <p style={mutedSmall}>{goal.title}</p>
            </div>

            <button
              onClick={() => setFlipped(false)}
              style={ghostButton}
              aria-label="Retour"
            >
              <RotateCcw size={17} />
            </button>
          </div>

          <p style={aiBox}>{aiText}</p>

          <InfoLine
            label="Montant cible"
            value={formatMoney(goal.targetAmount, currency)}
          />
          <InfoLine
            label="Montant disponible"
            value={formatMoney(goal.currentAmount, currency)}
          />
          <InfoLine
            label="Reste à obtenir"
            value={formatMoney(goal.remaining, currency)}
          />
          <InfoLine label="Date estimée" value={estimated} />
          <InfoLine
            label="Priorité automatique"
            value={goal.priority?.label || `Score ${goal.priorityScore || 0}`}
          />
          <InfoLine
            label="Smart Journey"
            value={goal.journeyLinked ? "Connecté au parcours" : "Prêt"}
          />

          {goal.lastDeposit && (
            <InfoLine
              label="Dernier dépôt"
              value={`+${formatMoney(goal.lastDeposit.amount, currency)}`}
            />
          )}

          <button onClick={onOpenJourney} style={journeyButton}>
            <Route size={16} />
            Voir dans mon parcours
          </button>

          <div style={quickDepositRow}>
            {[50, 100, 250, 500].map((amount) => (
              <button
                key={amount}
                onClick={() => onDeposit(goal.id, amount)}
                style={smallGreenBtn}
              >
                +{amount} $
              </button>
            ))}
          </div>

          <div style={customDepositRow}>
            <input
              value={customDeposit}
              onChange={(event) =>
                setCustomDeposit(cleanMoneyInput(event.target.value))
              }
              placeholder="Montant libre"
              inputMode="decimal"
              style={depositInput}
            />

            <button onClick={submitCustomDeposit} style={customDepositBtn}>
              Ajouter
            </button>
          </div>

          {!goal.highlighted && (
            <button onClick={() => onHighlight(goal.id)} style={smallGoldBtn}>
              <Star size={16} />
              Mettre en avant
            </button>
          )}

          <button onClick={() => onRemove(goal.id)} style={deleteBtn}>
            <Trash2 size={16} />
            Supprimer
          </button>
        </>
      )}
    </div>
  );
}

function InfoLine({ label, value }) {
  return (
    <div style={infoLine}>
      <span style={mutedSmall}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function getStartedLabel(createdAt) {
  if (!createdAt) return "Commencé aujourd’hui";

  const start = new Date(createdAt);
  const now = new Date();

  if (Number.isNaN(start.getTime())) return "Commencé aujourd’hui";

  const days = Math.max(
    0,
    Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );

  if (days === 0) return "Commencé aujourd’hui";
  if (days === 1) return "Commencé il y a 1 jour";

  return `Commencé il y a ${days} jours`;
}

function getEstimatedDate(goal) {
  if (goal.progress >= 100) return "Atteint";

  const remaining = Number(goal.remaining || 0);
  const monthly = Number(goal.monthlyContribution || 0);
  const lastDeposit = Number(goal.lastDeposit?.amount || 0);
  const rhythmAmount = monthly > 0 ? monthly : lastDeposit;

  if (remaining <= 0) return "Atteint";
  if (rhythmAmount <= 0) return "Après le prochain dépôt";

  const months = Math.max(1, Math.ceil(remaining / rhythmAmount));
  const date = new Date();
  date.setMonth(date.getMonth() + months);

  return date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "short",
  });
}

function getAiText(goal) {
  if (goal.progress >= 100) {
    return "Objectif atteint. Cette victoire doit maintenant renforcer votre discipline et votre confiance.";
  }

  if (goal.progress >= 80) {
    return "Vous êtes proche de la victoire. Un dernier effort régulier peut transformer cet objectif en résultat concret.";
  }

  if (goal.highlighted) {
    return "Cet objectif est prioritaire. Gardez-le visible et alimentez-le avec des dépôts réguliers.";
  }

  if (goal.progress >= 30) {
    return "L’objectif avance. Le plus important est de garder le rythme sans vous mettre une pression inutile.";
  }

  return "Objectif en démarrage. La première étape est de créer une habitude simple et répétable.";
}

const goalCard = {
  border: "1px solid var(--border)",
  borderRadius: "20px",
  padding: "15px",
  marginTop: "12px",
  transition: "transform .22s ease, box-shadow .22s ease, border-color .22s ease",
  minWidth: 0,
  overflow: "hidden",
};

const celebrationCard = {
  transform: "scale(1.015)",
  boxShadow:
    "0 0 0 1px rgba(212,175,55,.35), 0 0 28px rgba(212,175,55,.25)",
};

const mainGoalBadge = {
  display: "inline-flex",
  marginBottom: "10px",
  padding: "7px 10px",
  borderRadius: "999px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.14)",
  color: "var(--gold)",
  fontSize: "12px",
  fontWeight: "900",
};

const goalHeader = {
  display: "grid",
  gridTemplateColumns: "32px minmax(0, 1fr) auto",
  gap: "10px",
  alignItems: "center",
};

const goalTitle = {
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const badgeRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "12px",
};

const disciplineBadge = {
  border: "1px solid var(--border)",
  background: "var(--bg-main)",
  color: "var(--text-muted)",
  borderRadius: "999px",
  padding: "6px 9px",
  fontSize: "12px",
  fontWeight: "700",
};

const statusBadge = {
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.10)",
  borderRadius: "999px",
  padding: "6px 9px",
  fontSize: "12px",
  fontWeight: "800",
};

const journeyBadge = {
  border: "1px solid var(--blue)",
  background: "rgba(59,130,246,.12)",
  color: "var(--blue)",
  borderRadius: "999px",
  padding: "6px 9px",
  fontSize: "12px",
  fontWeight: "800",
};

const victoryBadge = {
  border: "1px solid var(--green)",
  background: "rgba(34,197,94,.12)",
  color: "var(--green)",
  borderRadius: "999px",
  padding: "6px 9px",
  fontSize: "12px",
  fontWeight: "800",
};

const celebrationBox = {
  marginTop: "12px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.14)",
  color: "var(--gold)",
  borderRadius: "14px",
  padding: "11px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const amountRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  marginTop: "14px",
};

const barBg = {
  height: "10px",
  background: "var(--bg-main)",
  borderRadius: "999px",
  marginTop: "10px",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
};

const ghostButton = {
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--text-main)",
  borderRadius: "10px",
  padding: "7px",
};

const journeyButton = {
  marginTop: "12px",
  width: "100%",
  padding: "12px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const aiBox = {
  background: "linear-gradient(135deg, rgba(139,92,246,.16), var(--bg-main))",
  border: "1px solid var(--purple)",
  borderRadius: "14px",
  padding: "12px",
  color: "var(--text-muted)",
  lineHeight: 1.4,
};

const infoLine = {
  background: "var(--bg-main)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "10px",
  marginTop: "8px",
  display: "grid",
  gap: "4px",
};

const quickDepositRow = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(64px, 1fr))",
  gap: "8px",
  marginTop: "12px",
};

const smallGreenBtn = {
  padding: "10px",
  borderRadius: "12px",
  border: "1px solid var(--green)",
  background: "rgba(34,197,94,.12)",
  color: "var(--green)",
  fontWeight: "bold",
};

const customDepositRow = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: "8px",
  marginTop: "10px",
};

const depositInput = {
  width: "100%",
  minWidth: 0,
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid var(--border)",
  background: "var(--bg-main)",
  color: "var(--text-main)",
};

const customDepositBtn = {
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
};

const smallGoldBtn = {
  marginTop: "12px",
  width: "100%",
  padding: "11px",
  borderRadius: "12px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const deleteBtn = {
  width: "100%",
  marginTop: "10px",
  padding: "11px",
  borderRadius: "12px",
  border: "1px solid var(--red)",
  background: "rgba(239,68,68,.12)",
  color: "var(--red)",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "5px",
};

export default GoalPremiumCard;