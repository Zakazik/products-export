/**
 * @file Shop api
 * @author Sergey Sadovoi [serg.sadovoi@gmail.com]
 */
import Debug from 'debug';
const debug = Debug('app');

import db from 'utils/mysql';
import pad from 'utils/pad';
import Logger from 'utils/logger';
import Price from './Price';
import Config from 'config';

export default class Shop {
    /**
     * Get all products
     *
     * @returns {Promise}
     */
    static getProducts() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT p.*, c.pro_cat_title_one, c.pro_cat_title' +
                          '  FROM products p' +
                          '  LEFT JOIN pro_categories c ON p.pro_cat_id = c.id' +
                          '  WHERE p.trash = "N"';
            const self = this;

            db.query(query).then(async function(products){
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
                            vendor: await self.getProp(Config.get('shop.params.vendorId'), product.id, product.pro_cat_id),
                            country: await self.getProp(Config.get('shop.params.countryId'), product.id, product.pro_cat_id),
                            warranty: self.parseWarranty(await self.getProp(Config.get('shop.params.warrantyId'), product.id, product.pro_cat_id))
                        });
                    } catch (error) {
                        Logger.error(`Product "${product.id}": ${error.message}`);
                    }

                    if (result.length > 20) {
                        break;
                    }
                }

                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    static getProp(propId, productId, catId) {
        return new Promise((resolve, reject) => {
            const propQuery = `SELECT id FROM cat_properties WHERE pro_cat_id = ${catId} AND parent_id = ${propId}`;

            db.queryOne(propQuery).then((prop) => {
                return 'p' + pad(prop.id, 3);
            }).then((propRow) => {
                const propTable = 'pro' + pad(catId, 3);
                const query = `SELECT d.value FROM ${propTable} pp LEFT JOIN dictionary d ON d.id = pp.${propRow} WHERE pp.product_id = ${productId}`;
                return db.queryOne(query).then((prop) => {
                    resolve(prop.value);
                });
            }).catch((error) => {
                reject(error);
            });
        });
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

        throw new Error(`Invalid warranty value "${raw}"`);
    }
}