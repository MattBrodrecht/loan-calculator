'use strict';

import React from 'react';
import d3 from 'd3';
import DonutChartPath from './DonutChartPath';
import DonutChartLegend from './DonutChartLegend';

class DonutChart extends React.Component {

    constructor() {
        super();

    }

    componentWillMount() {
        let _self = this;

        this.pie=d3.layout.pie()
            .value(function(d){return d[_self.props.point]})
            .padAngle(this.props.padAngle)
            .sort(null);

        this.color = d3.scale.ordinal()
            .range(this.props.color);

        this.setState({width:this.props.width});
    }

    render() {

        return (
            <div>
                <svg id={this.props.id} width={`100%`} height={this.props.height}>
                    <DonutChartPath width={this.props.width} height={this.props.height} innerRadiusRatio={this.props.innerRadiusRatio} pie={this.pie} color={this.color} data={this.props.data}></DonutChartPath>
                    <DonutChartLegend pie={this.pie} color={this.color} data={this.props.data} width={this.state.width} height={this.props.height} label={this.props.label} radius={3}/>
                </svg>
            </div>
        );
    }

}

DonutChart.PropTypes = {
    width:React.PropTypes.number,
    height:React.PropTypes.number,
    padAngle:React.PropTypes.number,
    id:React.PropTypes.string.isRequired,
    data:React.PropTypes.array.isRequired,
    color:React.PropTypes.array,
    enable3d:React.PropTypes.bool,
    innerRadiusRatio:React.PropTypes.number,
    label:React.PropTypes.string,
    point:React.PropTypes.string
}

DonutChart.defaultProps = {
    width: 500,
    height: 250,
    padAngle: 0,
    color: [],
    innerRadiusRatio: 3.3
}

export default DonutChart;