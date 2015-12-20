import React from 'react';
import ReactDOM from 'react-dom/server';
import Catalog from './components/Catalog';

// Custom attributes for xml
import ReactInjection from 'react/lib/ReactInjection';
ReactInjection.DOMProperty.injectDOMPropertyConfig({
    Properties: {
        available: null,
        date: null
    }
});

export function yandex({ shop = {}, products = [] } = {}) {
    const catalog = ReactDOM.renderToStaticMarkup(
        <Catalog { ...shop } offers={ products } />
    );

    return '<?xml version="1.0" encoding="utf-8"?>' +
           '<!DOCTYPE yml_catalog SYSTEM "shops.dtd">' +
           catalog;
}
