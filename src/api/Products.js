import db from 'utils/mysql';
import Price from './Price';
import co from 'co';

export default class Products {
    static getAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT p.*, c.pro_cat_title_one' +
                          '  FROM products p' +
                          '  LEFT JOIN pro_categories c ON p.pro_cat_id = c.id' +
                          '  WHERE p.trash = "N"';

            db.query(query).then((products) => {
                co(function*(){
                    let result = [];
                    for (let product of products) {
                        let title = product.pro_cat_title_one + ' ' + product.pro_title;
                        result.push({
                            id: product.id,
                            name: title,
                            price: yield Price.get(product.promo_price, product.currency),
                            available: (product.mit_pro == 1)
                        });
                    }

                    resolve(result);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }
}