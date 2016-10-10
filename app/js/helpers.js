'use strict';


const _roundDecimal = (number) => {
    return number.toFixed(2);
}

const helpers = {

    calculateRepayment: (data) => {

        let balance = data.balance;
        let interest = data.interest / 100;
        let payment = data.payment;
        let charge = 0;
        let months = 0;
        let totalInterest = 0;
        let breakdown = [];

        while (balance > 0) {
            charge = balance*interest/12;
            balance = balance - payment + charge;
            months++;
            totalInterest += charge;

            balance = (balance < 0) ? 0 : balance;

            breakdown.push(_roundDecimal(balance));

            if (months === 192) {
                alert(`15 Years is a long time - try upping your monthly payment if you want to be free sooner`);
                break;
            }
        }

        months = Math.ceil(months);
        totalInterest = _roundDecimal(totalInterest);

        return { months, totalInterest, breakdown };
    },

    totalExpense: (principal, interest) => {
        const total = parseFloat(principal) + parseFloat(interest);
        return (isNaN(total)) ? null : `$${_roundDecimal(total)}`;
    },

    monthsToYears: (months) => {
      let years;
      let total;

      if (months >= 12) {
        years = Math.floor(months / 12);
        years = (years > 1) ? `${years} Years` : `${years} Year`;
        months = months % 12;
        months = (months > 1) ? `${months} Months` : `${months} Month`;
        total = `${years}, ${months}`;
      } else if (months) {
        months = (months > 1) ? `${months} Months` : `${months} Month`;
        total = months;
      } else {
        total = '';
      }

      return total;
    }

}

export default helpers;
