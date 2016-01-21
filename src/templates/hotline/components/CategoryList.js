import React, { Component, PropTypes } from 'react';
import Category from './Category';

export default class CategoryList extends Component {
    static propTypes = {
        categories: PropTypes.array.isRequired
    };

    render() {
        const categories = this.props.categories.map((category, i) => {
            return (
                <Category { ...category } key={ i } />
            );
        });

        return (
            <categories>
                { categories }
            </categories>
        );
    }
}
