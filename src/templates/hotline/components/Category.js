import React, { Component, PropTypes } from 'react';

export default class Category extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        parent: PropTypes.number.isRequired
    }

    render() {
        const { id, title, parent } = this.props;
        const elParent = (parent > 0) ? (<parentId>{ parent }</parentId>) : null;

        return (
            <category>
                <id>{ id }</id>
                { elParent }
                <name>{ title }</name>
            </category>
        );
    }
}
