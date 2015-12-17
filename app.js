import fs from 'fs';
import co from 'co';
import ReactDOM from 'react-dom/server';
import Config from 'config';
import logger from './lib/logger';
import Catalog from './components/Catalog';
import ProductsAPI from './api/Products';

// Custom attributes for xml
import ReactInjection from 'react/lib/ReactInjection';
ReactInjection.DOMProperty.injectDOMPropertyConfig({
    Properties: {
        available: null,
        date: null
    }
});

logger.info('Export START');

co(function*(){
    const products = yield ProductsAPI.getAll();

    const catalog = ReactDOM.renderToStaticMarkup(
        <Catalog {...Config.get('shop')} offers={products} />
    );

    return '<?xml version="1.0" encoding="utf-8"?>' +
           '<!DOCTYPE yml_catalog SYSTEM "shops.dtd">' +
           catalog;

}).then((xml) => {
    fs.writeFile(Config.get('export.file'), xml, (error) => {
        if (error) {
            throw error;
        }

        logger.info('Export FINISH');
        process.exit(0);
    });
}).catch((error) => {
    logger.error('Export ERROR: ' + error);
    process.exit(1);
});
