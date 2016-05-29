'use strict';


const _roundDecimal = (number) => {
    return Math.round(number * 100) / 100;
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

            breakdown.push({
                interest: _roundDecimal(charge),
                balance: _roundDecimal(balance)
            })
        }

        months = Math.ceil(months);
        totalInterest = _roundDecimal(totalInterest);

        return { months, totalInterest };
    }

}

export default helpers;
