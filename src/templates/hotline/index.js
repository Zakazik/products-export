import React from 'react';
import ReactDOM from 'react-dom/server';
import Catalog from './components/Catalog';

export function hotline({ shop = {}, products = [] } = {}) {
    const catalog = ReactDOM.renderToStaticMarkup(
        <Catalog { ...shop } offers={ products } />
    );

    return '<?xml version="1.0" encoding="utf-8"?>' +
           catalog;
}
