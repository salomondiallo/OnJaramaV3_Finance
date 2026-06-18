import {
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Flag,
  PiggyBank,
  Route,
  Target,
  TrendingUp,
} from "lucide-react";
import { formatMoney } from "../utils/formatters";

function MonPlan({ financeData, selectedGoals, settings, setCurrentPage }) {
  const currency = settings?.currency || "CAD";

  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];
  const goals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived)
    : [];

  const debtTotal = debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const priorityDebt = [...debts]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort(
      (a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0)
    )[0];

  const totalGoalTarget = goals.reduce(
    (sum, goal) => sum + Number(goal.targetAmount || 0),
    0
  );

  const totalGoalCurrent = goals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount || 0),
    0
  );

  const goalProgress =
    totalGoalTarget > 0
      ? Math.min(100, Math.round((totalGoalCurrent / totalGoalTarget) * 100))
      : 0;

  const mainGoal = goals.find((goal) => goal.highlighted) || goals[0];

  return (
    <div className="native-page">
      <h1>Mon Plan</h1>

      <p style={muted}>
        Votre feuille de route intelligente pour avancer sans vous disperser.
      </p>

      <section style={priorityCard}>
        <div style={header}>
          <TrendingUp color="var(--gold)" />
          <h2>Priorité automatique</h2>
        </div>

        {priorityDebt ? (
          <>
            <p>
              Votre priorité actuelle est :
              <br />
              <strong>{priorityDebt.name}</strong>
            </p>

            <p style={muted}>
              Taux : {priorityDebt.interestRate}% • Solde :{" "}
              {formatMoney(priorityDebt.balance, currency)}
            </p>

            <button
              onClick={() => setCurrentPage("dettes")}
              style={goldButton}
            >
              Voir mes dettes
            </button>
          </>
        ) : (
          <>
            <p>Aucune dette prioritaire détectée.</p>
            <p style={muted}>
              Vous pouvez maintenant renforcer l’épargne et les objectifs.
            </p>
          </>
        )}
      </section>

      <section style={card}>
        <div style={header}>
          <CreditCard color={debtTotal > 0 ? "var(--red)" : "var(--green)"} />
          <h2>Étape 1 — Réduire les dettes</h2>
        </div>

        <p style={muted}>
          OnJarama Path classe les dettes selon le taux d’intérêt pour éviter
          que les frais ralentissent vos projets.
        </p>

        <strong>{formatMoney(debtTotal, currency)}</strong>
      </section>

      <section style={card}>
        <div style={header}>
          <PiggyBank color="var(--green)" />
          <h2>Étape 2 — Protéger votre base</h2>
        </div>

        <p style={muted}>
          Garder une petite épargne aide à éviter de retourner au crédit en cas
          d’imprévu.
        </p>
      </section>

      <section style={card}>
        <div style={header}>
          <Target color="var(--gold)" />
          <h2>Étape 3 — Avancer les objectifs</h2>
        </div>

        <p>
          <strong>{goals.length}</strong> objectifs actifs
        </p>

        <p style={muted}>
          Progression globale : <strong>{goalProgress}%</strong>
        </p>

        {mainGoal && (
          <p style={muted}>
            Objectif principal : <strong>{mainGoal.title}</strong>
          </p>
        )}

        <button
          onClick={() => setCurrentPage("objectifs")}
          style={greenButton}
        >
          Gérer mes objectifs
        </button>
      </section>

      <section style={card}>
        <div style={header}>
          <Route color="var(--blue)" />
          <h2>Étape 4 — Suivre le parcours</h2>
        </div>

        <p style={muted}>
          Le parcours vous aide à garder la discipline : une action claire à la
          fois.
        </p>

        <button
          onClick={() => setCurrentPage("parcours")}
          style={blueButton}
        >
          Voir mon parcours
        </button>
      </section>

      <section style={warningCard}>
        <AlertTriangle color="var(--red)" />
        <div>
          <h2>Rappel discipline</h2>
          <p style={muted}>
            Évitez d’ajouter un nouveau financement tant que la dette prioritaire
            reste élevée.
          </p>
        </div>
      </section>

      <section style={successCard}>
        <CheckCircle color="var(--green)" />

        <div>
          <h2>Objectif final</h2>

          <p style={muted}>
            Moins de pression, plus de contrôle, et des projets personnels qui
            avancent réellement.
          </p>
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <Flag color="var(--gold)" />
          <h2>Vision OnJarama</h2>
        </div>

        <p style={muted}>
          Chaque décision doit vous rapprocher d’une vie plus stable, plus libre
          et mieux organisée.
        </p>
      </section>
    </div>
  );
}

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const priorityCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.18), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const warningCard = {
  background: "linear-gradient(135deg, rgba(239,68,68,.14), var(--bg-card))",
  border: "1px solid var(--red)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const successCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.18), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "12px",
};

const goldButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.14)",
  color: "var(--gold)",
  fontWeight: "bold",
};

const greenButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
};

const blueButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--blue)",
  background: "rgba(56,189,248,.14)",
  color: "var(--blue)",
  fontWeight: "bold",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

export default MonPlan;