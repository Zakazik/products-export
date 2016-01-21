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
        description: PropTypes.shape({
            short: PropTypes.string.isRequired
        }).isRequired,
        image: PropTypes.string,
        category: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired
        }).isRequired,
        warranty: PropTypes.object,
        vendor: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        available: PropTypes.bool
    };

    static defaultProps = {
        available: true
    };

    render() {
        const { id, category, vendor, description, url, image, available, name, price, warranty } = this.props;
        const stock  = available ? 'Склад' : 'Заказ';
        const elWarranty = (warranty === null || warranty.unit !== 'month') ?
            null
            : (<warranty>{ warranty.count }</warranty>);

        return (
            <item id={ id }>
                <name>{ name.short }</name>
                <categoryId>{ category.id }</categoryId>
                <priceuah>{ price.current }</priceuah>
                <url>{ url }</url>
                <image>{ image }</image>
                <vendor>{ vendor }</vendor>
                <description>{ description.short }</description>
                { elWarranty }
                <available>{ stock }</available>
            </item>
        );
    }
}
