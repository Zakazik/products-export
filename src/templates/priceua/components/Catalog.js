import React, { Component, PropTypes } from 'react';
import Moment from 'moment';
import CategoryList from './CategoryList';
import OfferList from './OfferList';

export default class Catalog extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        offers: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            date: Moment().format('YYYY-MM-DD HH:mm')
        };
    }

    render() {
        const { name, offers, categories } = this.props;

        return (
            <price date={ this.state.date }>
                <name>{ name }</name>
                <CategoryList categories={ categories } />
                <OfferList offers={ offers } />
            </price>
        );
    }
}