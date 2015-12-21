/**
 * @file Shop api
 * @author Sergey Sadovoi [serg.sadovoi@gmail.com]
 */
import db from 'utils/mysql';
import pad from 'utils/pad';
import Logger from 'utils/logger';
import Price from './Price';
import Config from 'config';

export default class Shop {
    /**
     * Get all products
     */
    static async getProducts() {
        const query = 'SELECT p.*, c.pro_cat_title_one, c.pro_cat_title' +
                      '  FROM products p' +
                      '  LEFT JOIN pro_categories c ON p.pro_cat_id = c.id' +
                      '  WHERE p.trash = "N"';
        const products = await db.query(query);

        let result = [];
        for (let product of products) {
            let title = product.pro_cat_title_one + ' ' + product.pro_title;
            let url   = Config.get('shop.params.productUrlTpl').replace('{code}', product.pro_url);
            let image = Config.get('shop.params.imageUrlTpl').replace('{file}', product.pro_sml_image);

            try {
                result.push({
                    id: product.id,
                    code: (product.ind_id === '' || product.ind_id === '0') ? null : product.ind_id,
                    name: {
                        short: product.pro_title,
                        full: title
                    },
                    description: {
                        short: (product.block_heading === '') ? null : product.block_heading
                    },
                    url,
                    image,
                    price: {
                        current: await Price.get(product.promo_price, product.currency)
                    },
                    category: {
                        id: product.pro_cat_id,
                        title: product.pro_cat_title
                    },
                    available: (product.mit_pro == 1),
                    vendor: await this.getProp(Config.get('shop.params.vendorId'), product.id, product.pro_cat_id),
                    country: await this.getProp(Config.get('shop.params.countryId'), product.id, product.pro_cat_id),
                    warranty: this.parseWarranty(await this.getProp(Config.get('shop.params.warrantyId'), product.id, product.pro_cat_id))
                });
            } catch (error) {
                Logger.error(`Product "${product.id}": ${error.message}`);
            }
        }

        return result;
    }

    static async getCategories() {
        const query = 'SELECT * FROM pro_categories WHERE visible = "Y" ORDER BY id ASC';
        const flatList = await db.query(query);
        return flatList.map((category) => {
            return {
                id: category.id,
                parent: category.pro_cat_id,
                title: category.pro_cat_title
            };
        });
    }

    static async getProp(propId, productId, catId) {
        const propQuery = `SELECT id FROM cat_properties WHERE pro_cat_id = ${catId} AND parent_id = ${propId}`;
        const prop      = await db.queryOne(propQuery);
        if (prop === null) {
            return null;
        }
        const propRow   = 'p' + pad(prop.id, 3);
        const propTable = 'pro' + pad(catId, 3);
        const query     = `SELECT d.value FROM ${propTable} pp LEFT JOIN dictionary d ON d.id = pp.${propRow} WHERE pp.product_id = ${productId}`;
        const propValue = await db.queryOne(query);
        if (propValue === null) {
            return null;
        }

        return propValue.value;
    }

    static parseWarranty(raw) {
        // 1. Years
        let value = /([0-9,]+) ?(лет|год)/.exec(raw);
        if (value !== null) {
            return {
                count: Number(value[1].replace(',', '.')) * 12,
                unit: 'months'
            };
        }

        // 2. Months
        value = /([0-9]+) ?(мес)/.exec(raw);
        if (value !== null) {
            return {
                count: Number(value[1]),
                unit: 'months'
            };
        }

        // 3. Days
        value = /([0-9]+) ?(дн)/.exec(raw);
        if (value !== null) {
            return {
                count: Number(value[1]),
                unit: 'days'
            };
        }

        return null;
    }
}
