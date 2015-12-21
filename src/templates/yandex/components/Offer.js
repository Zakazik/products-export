import React, { Component, PropTypes } from 'react';

export default class Offer extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.shape({
            short: PropTypes.string.isRequired,
            full: PropTypes.string.isRequired
        }).isRequired,
        price: PropTypes.shape({
            current: PropTypes.number.isRequired
        }).isRequired,
        currencyId: PropTypes.string,
        available: PropTypes.bool
    }

    static defaultProps = {
        available: true,
        currencyId: 'UAH'
    }

    render() {
        const { id, available, name, price, currencyId } = this.props;

        return (
            <offer id={ id } available={ available }>
                <name>{ name.full }</name>
                <price>{ price.current }</price>
                <currencyId>{currencyId }</currencyId>
            </offer>
        );
    }
}
