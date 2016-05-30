"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Card from './components/Card';
import Calculator from './components/Calculator';
import GraphInterestPaid from './components/GraphInterestPaid';
import CardData from './components/CardData';
import helpers from './helpers';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            balance: '',
            interest: '',
            payment: '',
            repayment: {}
        };

        this.inputChange = this.inputChange.bind(this);
        this.handleRepaymentData = this.handleRepaymentData.bind(this);
    }

    componentDidMount() {
        const localStorageRef = localStorage.getItem('debt');

        // Check local storage & update state
        if (localStorageRef) {
            console.log(JSON.parse(localStorageRef));

            this.setState(
                JSON.parse(localStorageRef)
            );
        }
    }

    componentWillUpdate(nextProps, nextState) {
        // Store App state in localStorage
        localStorage.setItem('debt', JSON.stringify(nextState));
    }

    /*
     * Updates state from Calculator user input
     * @param {number} value - user input
     * @param {string} input - id of input
     */
    inputChange(value, input) {
        this.setState({
            [input]: value
        });
    }

    /*
     * Updates state from Calculator user input
     * @param {object} data - repayment info (total interest paid, time to repay, repayment breakdown)
     */
    handleRepaymentData(data) {
        this.setState({
            repayment: data
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="dashboard">
                    <section className="calculator">
                        <Card>
                            <Calculator
                                inputChange={this.inputChange}
                                balance={this.state.balance}
                                interest={this.state.interest}
                                payment={this.state.payment}
                                handleRepaymentData={this.handleRepaymentData}
                            />
                        </Card>
                    </section>
                    <section className="cards">
                        <Card title="Total Cost to Loan" size="two-col">
                            <CardData data={helpers.totalExpense(this.state.balance, this.state.repayment.totalInterest)} />
                        </Card>
                        <Card title="Interest Paid">
                            <GraphInterestPaid balance={this.state.balance} data={this.state.repayment} />
                        </Card>
                    </section>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#main'));
