import React, { Component, PropTypes } from 'react';
import CategoryList from './CategoryList';
import OfferList from './OfferList';

export default class Catalog extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        hotlineId: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        offers: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired
    };

    render() {
        const { name, hotlineId, offers, categories, date } = this.props;

        return (
            <price>
                <date>{ date }</date>
                <firmName>{ name }</firmName>
                <firmId>{ hotlineId }</firmId>
                <CategoryList categories={ categories } />
                <OfferList offers={ offers } />
            </price>
        );
    }
}
