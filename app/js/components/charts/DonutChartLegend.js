import React from 'react';
import d3 from 'd3';

class DonutChartLegend extends React.Component {

    constructor() {
        super();

        this.createLegend = this.createLegend.bind(this);
    }

    createLegend(_self) {

        const texts = (this.props.pie(this.props.data)).map(function(dataSet, index) {

            const transform = `translate(10, ${index * 30})`;

            const rectStyle = {
                fill: _self.props.color(index),
                stroke: _self.props.color(index)
            };

            const textStyle = {
                fill: _self.props.color(index)
            };
            console.log(dataSet.data.count);
            return (
                <g transform={transform} key={index}>

                    <rect width="20" height="20" style={rectStyle} rx={_self.props.radius} ry={_self.props.radius}></rect>

                    <text x="30" y="15" className="browser-legend" style={textStyle}>
                        {`${dataSet.data[_self.props.label]} - $${dataSet.data.count}`}
                    </text>
                </g>
            )
        });

        return texts;
    }

    render() {

        const texts = this.createLegend(this);
        const legendY = this.props.height / 2 - this.props.data.length * 30 / 2;
        const transform = `translate(${(this.props.width / 2 + 80)}, ${legendY})`;

        return (
            <g is transform={transform}>
                {texts}
            </g>
        );
    }
}

DonutChartLegend.Proptypes = {
    width:React.PropTypes.number,
    height:React.PropTypes.number,
    data:React.PropTypes.array,
    pie:React.PropTypes.func,
    color:React.PropTypes.func,
    label:React.PropTypes.string,
    radius:React.PropTypes.number
}

export default DonutChartLegend;