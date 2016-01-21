import React, { Component, PropTypes } from 'react';
import OfferList from './OfferList';

export default class Catalog extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        offers: PropTypes.array.isRequired
    };

    render() {
        const { name, date, url, offers } = this.props;

        return (
            <yml_catalog date={ date }>
                <shop>
                    <name>{ name }</name>
                    <url>{ url }</url>
                    <OfferList offers={ offers } />
                </shop>
            </yml_catalog>
        );
    }
}
