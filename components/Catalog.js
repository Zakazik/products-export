import React, { Component, PropTypes } from 'react';
import Offer from './Offer';
import Moment from 'moment';

export default class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: Moment().format('YYYY-MM-DD HH:mm')
        };
    }

    render() {
        return (
            <yml_catalog date={this.state.date}>
                <shop>
                    <name>{this.props.name}</name>
                    <url>{this.props.url}</url>
                    <offers>
                        {this.props.offers.map(function(offer, i){
                            return (
                                <Offer {...offer} key={i} />
                            );
                        })}
                    </offers>
                </shop>
            </yml_catalog>
        );
    }
}

Catalog.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    offers: PropTypes.array.isRequired
};
