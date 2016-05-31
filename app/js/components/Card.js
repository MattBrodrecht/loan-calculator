'use strict';

import React from 'react';

class Card extends React.Component {

    constructor() {
        super();

    }

    render() {
        const title = (this.props.title) ? <h2>{this.props.title}</h2> : null;
        const size = (this.props.size) ? this.props.size : null;

        return (
            <div className="card" data-size={size}>
                {title}
                <div className="card-content">
                    {this.props.children}
                </div>
            </div>
        );
    }

}

Card.propTypes = {
    title: React.PropTypes.string
}

export default Card;
