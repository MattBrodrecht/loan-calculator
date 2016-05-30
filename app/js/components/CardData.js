'use strict';

import React from 'react';

class CardData extends React.Component {

    constructor() {
        super();

    }

    render() {
        const data = (this.props.data) ? <h3>{this.props.data}</h3> : null;
        console.log(data);
        return (
            <div className="card-data">
                {data}
            </div>
        );
    }

}

CardData.PropTypes = {
    data: React.PropTypes.number.isRequired
}

export default CardData;