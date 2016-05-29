'use strict';

import React from 'react';

class Card extends React.Component {

    constructor() {
        super();

    }

    render() {
        return (
            <div className="card">
                <h2>{this.props.title}</h2>
                {this.props.children}
            </div>
        );
    }

}

Card.PropTypes = {
    title: React.PropTypes.string
}

export default Card;