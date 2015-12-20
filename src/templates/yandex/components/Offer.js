import React, { Component, PropTypes } from 'react';

export default class Offer extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        currencyId: PropTypes.string,
        available: PropTypes.bool
    }

    static defaultProps = {
        available: true,
        currencyId: 'UAH'
    }

    render() {
        return (
            <offer id={this.props.id} available={this.props.available}>
                <name>{this.props.name}</name>
                <price>{this.props.price}</price>
                <currencyId>{this.props.currencyId}</currencyId>
            </offer>
        );
    }
}
