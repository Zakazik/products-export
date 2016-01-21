/**
 * @file Price api
 * @author Sergey Sadovoi [serg.sadovoi@gmail.com]
 */
import db from 'utils/mysql';

let exchange = null;

export default class Price {
    /**
     * Calculate UAH price of product
     *
     * @param {number} price Product price in original currency
     * @param {number} currency Currency code (1 – USD, 2 – UAH, 3 – EUR)
     * @returns {number} Price in UAH
     */
    static async get(price, currency) {
        const exchange = await Price.getExchange();

        let rate;
        switch (currency) {
            case 1:
                rate = exchange.usd;
                break;
            case 3:
                rate = exchange.eur;
                break;
            default:
                rate = 1;
                break;
        }

        return Math.ceil(price * rate);
    }

    /**
     * Get current exchange rate
     *
     * @returns {Promise}  Exchange rate object
     */
    static getExchange() {
        return new Promise((resolve, reject) => {
            if (exchange !== null) {
                return resolve(exchange);
            }

            const query = 'SELECT exchange1, exchange2 FROM valuta WHERE id = 1 OR id = 3 ORDER BY id';

            db.query(query).then((result) => {
                exchange = {
                    usd: result[0].exchange2,
                    eur: result[1].exchange2
                };
                resolve(exchange);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
