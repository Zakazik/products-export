import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import { priceua } from '../src/templates';

import shop from './data/shop.json';
import categories from './data/categories.json';
import products from './data/products.json';

// Load sample data
const reference = fs.readFileSync(path.resolve('./test') + '/data/products_priceua.xml', 'utf8');
const date = '2016-01-05 01:15';

describe('Price.UA export template', () => {
    it('should render proper xml', () => {
        expect(priceua({shop, products, categories, date})).to.equal(reference);
    })
});
