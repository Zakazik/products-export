import React, { Component, PropTypes } from 'react';
import Offer from './Offer';

export default class OfferList extends Component {
    static propTypes = {
        offers: PropTypes.array.isRequired
    };

    render() {
        const offers = this.props.offers.map((offer, i) => {
            return (
                <Offer { ...offer } key={ i } />
            );
        });

        return (
            <items>
                { offers }
            </items>
        );
    }
}
