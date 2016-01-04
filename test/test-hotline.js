import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import { hotline } from '../src/templates';

import shop from './data/shop.json';
import categories from './data/categories.json';
import products from './data/products.json';

// Load sample data
const reference = fs.readFileSync(path.resolve('./test') + '/data/products_hotline.xml', 'utf8');
const date = '2016-01-05 01:15';

describe('Hotline export template', () => {
    it('should render proper xml', () => {
        expect(hotline({shop, products, categories, date})).to.equal(reference);
    })
});
