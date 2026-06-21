export function calculateLoanPayment({
  principal = 0,
  annualRate = 0,
  months = 0,
}) {
  const amount = Number(principal || 0);
  const rate = Number(annualRate || 0) / 100 / 12;
  const term = Number(months || 0);

  if (amount <= 0 || term <= 0) {
    return {
      monthlyPayment: 0,
      totalPaid: 0,
      totalInterest: 0,
    };
  }

  if (rate <= 0) {
    const monthlyPayment = amount / term;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPaid: Math.round(amount),
      totalInterest: 0,
    };
  }

  const monthlyPayment =
    (amount * rate * Math.pow(1 + rate, term)) /
    (Math.pow(1 + rate, term) - 1);

  const totalPaid = monthlyPayment * term;
  const totalInterest = totalPaid - amount;

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPaid: Math.round(totalPaid),
    totalInterest: Math.round(totalInterest),
  };
}

export function calculateFinancedAmount(price = 0, downPayment = 0) {
  return Math.max(0, Number(price || 0) - Number(downPayment || 0));
}

export function calculateMortgage({
  propertyPrice = 0,
  downPayment = 0,
  annualRate = 0,
  amortizationYears = 25,
}) {
  const financedAmount = calculateFinancedAmount(propertyPrice, downPayment);
  const months = Number(amortizationYears || 25) * 12;

  const loan = calculateLoanPayment({
    principal: financedAmount,
    annualRate,
    months,
  });

  return {
    financedAmount,
    amortizationMonths: months,
    ...loan,
  };
}

export function estimateDebtPayoff({
  balance = 0,
  annualRate = 0,
  monthlyPayment = 0,
}) {
  let remaining = Number(balance || 0);
  const payment = Number(monthlyPayment || 0);
  const monthlyRate = Number(annualRate || 0) / 100 / 12;

  if (remaining <= 0 || payment <= 0) {
    return {
      months: 0,
      totalPaid: 0,
      totalInterest: 0,
    };
  }

  let months = 0;
  let totalPaid = 0;
  let totalInterest = 0;

  while (remaining > 0 && months < 600) {
    const interest = remaining * monthlyRate;
    const principalPaid = Math.min(payment - interest, remaining);

    if (principalPaid <= 0) {
      return {
        months: null,
        totalPaid: null,
        totalInterest: null,
      };
    }

    remaining -= principalPaid;
    totalPaid += Math.min(payment, principalPaid + interest);
    totalInterest += interest;
    months += 1;
  }

  return {
    months,
    totalPaid: Math.round(totalPaid),
    totalInterest: Math.round(totalInterest),
  };
}

export function calculateRealCost({
  cashAmount = 0,
  financedAmount = 0,
  totalInterest = 0,
}) {
  return Math.round(
    Number(cashAmount || 0) +
      Number(financedAmount || 0) +
      Number(totalInterest || 0)
  );
}