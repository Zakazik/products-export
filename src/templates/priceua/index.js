import React from 'react';
import ReactDOM from 'react-dom/server';
import Catalog from './components/Catalog';

// Custom attributes for xml
import ReactInjection from 'react/lib/ReactInjection';
ReactInjection.DOMProperty.injectDOMPropertyConfig({
    Properties: {
        // date: null,
        parentID: null
    }
});

export function priceua({ shop = {}, products = [], categories = [] } = {}) {
    const catalog = ReactDOM.renderToStaticMarkup(
        <Catalog { ...shop } offers={ products } categories={ categories } />
    );

    return '<?xml version="1.0" encoding="utf-8"?>' +
           catalog;
}
