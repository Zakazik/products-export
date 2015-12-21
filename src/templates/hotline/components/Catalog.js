import React, { Component, PropTypes } from 'react';
import Moment from 'moment';
import OfferList from './OfferList';

export default class Catalog extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        hotlineId: PropTypes.number.isRequired,
        offers: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            date: Moment().format('YYYY-MM-DD HH:mm')
        };
    }

    render() {
        const { name, hotlineId, offers } = this.props;

        return (
            <price>
                <date>{ this.state.date }</date>
                <firmName>{ name }</firmName>
                <firmId>{ hotlineId }</firmId>
                <OfferList offers={ offers } />
            </price>
        );
    }
}