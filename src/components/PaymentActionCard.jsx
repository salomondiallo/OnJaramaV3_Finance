import { useState } from "react";
import { financeData } from "../data/salomonFinance";

function PaymentActionCard() {
  const fairstone = financeData.debts.find((debt) => debt.name === "Fairstone");
  const [payment, setPayment] = useState("");
  const amount = Number(payment);
  const newBalance =
    amount > 0 ? Math.max(fairstone.balance - amount, 0) : fairstone.balance;

  return (
    <div style={cardStyle}>
      <h2>Action recommandée</h2>

      <p style={muted}>
        Priorité actuelle : réduire Fairstone en premier.
      </p>

      <p style={{ marginTop: "10px" }}>
        Solde actuel Fairstone : {fairstone.balance.toFixed(2)}$
      </p>

      <input
        type="number"
        placeholder="Montant du paiement"
        value={payment}
        onChange={(event) => setPayment(event.target.value)}
        style={inputStyle}
      />

      <div style={resultBox}>
        <p>Nouveau solde estimé :</p>
        <h2>{newBalance.toFixed(2)}$</h2>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#0d1d33",
  border: "1px solid #1d3355",
  borderRadius: "16px",
  padding: "20px",
  minHeight: "260px",
};

const muted = {
  marginTop: "10px",
  color: "#b8c7dd",
};

const inputStyle = {
  marginTop: "15px",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #1d3355",
  background: "#081427",
  color: "white",
  width: "100%",
};

const resultBox = {
  marginTop: "15px",
  padding: "15px",
  borderRadius: "12px",
  background: "#081427",
};

export default PaymentActionCard;