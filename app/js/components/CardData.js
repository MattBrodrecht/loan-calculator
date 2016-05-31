'use strict';

import React from 'react';

class CardData extends React.Component {

    constructor() {
        super();

    }

    render() {
        const data = (this.props.data) ? <h3>{this.props.data}</h3> : null;

        return (
            <div className="card-data">
                {data}
            </div>
        );
    }

}

CardData.propTypes = {
    data: React.PropTypes.string
}

export default CardData;
