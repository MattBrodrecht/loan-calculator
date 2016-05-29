'use strict';

import React from 'react';
import DonutChart from './charts/DonutChart';

class GraphInterestPaid extends React.Component {

    constructor() {
        super();

    }

    render() {

        const balance = this.props.balance || 0;
        const totalInterest = this.props.data.totalInterest || 0;

        const data = [
            {
                'name': 'Balance',
                'count': balance
            },
            {
                'name': 'Interest',
                'count': totalInterest
            }
        ]

        const color = ['#64b0cc','#e5c072'];

        return (
            <DonutChart id="bs_chart" data={data} color={color} height={300} width={500} enable3d={true} innerRadiusRatio={3} label="name" point="count"></DonutChart>
        );
    }

}

GraphInterestPaid.PropTypes = {
    balance: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired
}

export default GraphInterestPaid;