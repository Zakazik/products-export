import React, { Component, PropTypes } from 'react';

export default class Offer extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        code: PropTypes.string,
        image: PropTypes.string,
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
        const { id, code, category, vendor, description,
            url, image, available, name, price, warranty, country } = this.props;
        const elCode = (code !== null) ? (<code>{ code }</code>) : null;
        const stock  = available ? 'В наличии' : 'Под заказ';

        let elWarranty;
        if (warranty === null) {
            elWarranty = null;
        } else if (warranty.unit === 'days') {
            elWarranty = <guarantee type="manufacturer" unit="days">{ warranty.count }</guarantee>;
        } else {
            elWarranty = <guarantee type="manufacturer">{ warranty.count }</guarantee>;
        }

        return (
            <item>
                <id>{ id }</id>
                <categoryId>{ category.id }</categoryId>
                { elCode }
                <vendor>{ vendor }</vendor>
                <name>{ name.short }</name>
                <description>{ description.short }</description>
                <url>{ url }</url>
                <image>{ image }</image>
                <priceRUAH>{ price.current }</priceRUAH>
                <stock>{ stock }</stock>
                { elWarranty }
                <param name="Оригинальность">Оригинал</param>
                <param name="Страна изготовления">{ country }</param>
            </item>
        );
    }
}
