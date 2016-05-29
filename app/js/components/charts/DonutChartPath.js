'use strict';

import React from 'react';
import d3 from 'd3';

class DonutChartPath extends React.Component {

    componentWillMount() {

        var radius=this.props.height;

        var outerRadius=radius/2;
        var innerRadius=radius/this.props.innerRadiusRatio;

        this.arc=d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        this.transform='translate('+radius/2+','+radius/2+')';

    }

    createChart(_self) {

        var paths = (this.props.pie(this.props.data)).map(function(d, i) {

            return (
                <path fill={_self.props.color(i)} d={_self.arc(d)} key={i}></path>
            )
        });
        return paths;
    }

    render() {

        var paths = this.createChart(this);

        return(
            <g transform={this.transform}>
                {paths}
            </g>
        )
    }
}

DonutChartPath.PropTypes = {
    width:React.PropTypes.number,
    height:React.PropTypes.number,
    data:React.PropTypes.array,
    pie:React.PropTypes.func,
    color:React.PropTypes.func,
    innerRadiusRatio:React.PropTypes.number
}

export default DonutChartPath;