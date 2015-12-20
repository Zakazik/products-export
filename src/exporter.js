import * as templates from 'templates';
import Config from 'config';
import Logger from 'utils/logger';
import Writer from 'utils/writer';
import ShopApi from 'api/Shop';

export default class Exporter {
    static async run(config) {
        // 0. Shop info
        const shop = config.shop;

        // 1. Get categories
        const categories = [];

        // 2. Get products
        const products = await ShopApi.getProducts();

        // 3. Export with all templates
        const exports = config.exports;
        for (let tpl of exports) {
            if (!templates.hasOwnProperty(tpl.id)) {
                Logger.error(`Template "${tpl.id}" not found`);
                return;
            }

            Logger.info(`Exporting to ${tpl.id}`);
            try {
                const xml = templates[tpl.id]({
                    shop,
                    categories,
                    products
                });

                await Writer.write(tpl.file, xml);
                Logger.info(`Export to ${tpl.id} completed`);
            } catch (error) {
                Logger.error(`Export to ${tpl.id} error: ${error.message}`);
            }
        }
    }
}
