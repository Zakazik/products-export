import React, { Component, PropTypes } from 'react';

export default class Category extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        parent: PropTypes.number.isRequired
    };

    render() {
        const { id, title, parent } = this.props;
        const propParent = (parent > 0) ? parent : null;

        return (
            <category id={ id } parentID={ propParent }>{ title }</category>
        );
    }
}
