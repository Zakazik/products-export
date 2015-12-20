import db from 'utils/mysql';

let exchange = null;

export default class Price {
    static async get(price, currency) {
        let exchange = await Price.getExchange();

        var rate = 1;
        switch (currency) {
        case 1:
            rate = exchange.usd;
            break;
        case 3:
            rate = exchange.eur;
            break;
        }

        return Math.ceil(price * rate);
    }

    static getExchange() {
        return new Promise((resolve, reject) => {
            if (exchange != null) {
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
