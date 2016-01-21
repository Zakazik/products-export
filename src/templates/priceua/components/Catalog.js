import React, { Component, PropTypes } from 'react';
import CategoryList from './CategoryList';
import OfferList from './OfferList';

export default class Catalog extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        offers: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired
    };

    render() {
        const { name, date, offers, categories } = this.props;

        return (
            <price date={ date }>
                <name>{ name }</name>
                <CategoryList categories={ categories } />
                <OfferList offers={ offers } />
            </price>
        );
    }
}
