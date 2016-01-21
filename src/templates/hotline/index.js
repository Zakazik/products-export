import React from 'react';
import ReactDOM from 'react-dom/server';
import Moment from 'moment';
import Catalog from './components/Catalog';

// Custom attributes for xml
import ReactInjection from 'react/lib/ReactInjection';
ReactInjection.DOMProperty.injectDOMPropertyConfig({
    Properties: {
        unit: null
    }
});

export function hotline({ shop = {}, products = [], categories = [], date = '' } = {}) {
    if (date === '') {
        date = Moment().format('YYYY-MM-DD HH:mm');
    }

    const catalog = ReactDOM.renderToStaticMarkup(
        <Catalog
            { ...shop }
            offers={ products }
            categories={ categories }
            date={ date }
        />
    );

    /* eslint-disable prefer-template */
    return '<?xml version="1.0" encoding="utf-8"?>'
           + catalog;
    /* eslint-enable prefer-template */
}
