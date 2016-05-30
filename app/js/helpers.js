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
        }

        months = Math.ceil(months);
        totalInterest = _roundDecimal(totalInterest);

        return { months, totalInterest, breakdown };
    },

    totalExpense: (principal, interest) => {
        const total = parseFloat(principal) + parseFloat(interest);
        console.log(total);
        return `$${total}`;
    },

    monthsToYears: (months) => {
        let years = 0;

        if (months >= 12) {
            years = Math.floor(months / 12);
            years = (years > 1) ? `${years} years` : `${years} year`;
            months = months % 12;
            months = (months > 1) ? `${months} months` : `${months} month`;
        }

        return `${years}, ${months}`;

    }

}

export default helpers;
