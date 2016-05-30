'use strict';

import React from 'react';

class Card extends React.Component {

    constructor() {
        super();

    }

    render() {
        const title = (this.props.title) ? <h2>{this.props.title}</h2> : null;
        
        return (
            <div className="card">
                {title}
                <div className="card-content">
                    {this.props.children}
                </div>
            </div>
        );
    }

}

Card.PropTypes = {
    title: React.PropTypes.string
}

export default Card;