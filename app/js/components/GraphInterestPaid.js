'use strict';

import React from 'react';
import DonutChart from './charts/DonutChart';

class GraphInterestPaid extends React.Component {

  constructor() {
    super();
  }

  render() {
    const principal = this.props.principal || 0;
    const totalInterest = this.props.data.totalInterest || 0;

    const data = [
      {
        'name': 'Principal',
        'count': principal
      },
      {
        'name': 'Interest',
        'count': totalInterest
      }
    ]

    const color = ['#484C58', '#D8674C'];

    return (
      <DonutChart
        id = "bs_chart"
        data = { data }
        color = { color }
        height = { 300 }
        width = { 500 }
        enable3d = { true }
        innerRadiusRatio = { 3 }
        label = "name"
        point = "count"
      ></DonutChart>
    );
  }

}

GraphInterestPaid.propTypes = {
  principal: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired
}

export default GraphInterestPaid;
