import React, { Component, PropTypes } from 'react';
import OfferList from './OfferList';
import Moment from 'moment';

export default class Catalog extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        offers: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            date: Moment().format('YYYY-MM-DD HH:mm')
        };
    }

    render() {
        return (
            <yml_catalog date={ this.state.date }>
                <shop>
                    <name>{ this.props.name }</name>
                    <url>{ this.props.url }</url>
                    <OfferList offers={ this.props.offers } />
                </shop>
            </yml_catalog>
        );
    }
}
