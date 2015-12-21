import React from 'react';
import ReactDOM from 'react-dom/server';
import Catalog from './components/Catalog';

export function hotline({ shop = {}, products = [], categories = [] } = {}) {
    const catalog = ReactDOM.renderToStaticMarkup(
        <Catalog { ...shop } offers={ products } categories={ categories } />
    );

    return '<?xml version="1.0" encoding="utf-8"?>' +
           catalog;
}
