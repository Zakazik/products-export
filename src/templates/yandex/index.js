import React from 'react';
import ReactDOM from 'react-dom/server';
import Moment from 'moment';
import Catalog from './components/Catalog';

// Custom attributes for xml
import ReactInjection from 'react/lib/ReactInjection';
ReactInjection.DOMProperty.injectDOMPropertyConfig({
    Properties: {
        available: null,
        date: null
    }
});

export function yandex({ shop = {}, products = [], date = '' } = {}) {
    if (date === '') {
        date = Moment().format('YYYY-MM-DD HH:mm');
    }

    const catalog = ReactDOM.renderToStaticMarkup(
        <Catalog { ...shop } offers={ products } date={ date } />
    );

    /* eslint-disable prefer-template */
    return '<?xml version="1.0" encoding="utf-8"?>'
           + '<!DOCTYPE yml_catalog SYSTEM "shops.dtd">'
           + catalog;
    /* eslint-enable prefer-template */
}
