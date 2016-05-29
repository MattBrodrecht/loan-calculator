"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Card from './components/Card';
import Calculator from './components/Calculator';
import GraphInterestPaid from './components/GraphInterestPaid';

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

    handleRepaymentData(data) {
        this.setState({
            repayment: data
        });
    }

    render() {
        return (
            <div>
                <Header />
                <Calculator
                    inputChange={this.inputChange}
                    balance={this.state.balance}
                    interest={this.state.interest}
                    payment={this.state.payment}
                    handleRepaymentData={this.handleRepaymentData}
                />
                <Card title="Interest Paid">
                    <GraphInterestPaid balance={this.state.balance} data={this.state.repayment} />
                </Card>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#main'));
