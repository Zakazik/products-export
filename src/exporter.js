import Debug from 'debug';
const debug = Debug('app');

import * as templates from 'templates';
import Config from 'config';
import Logger from 'utils/logger';
import Writer from 'utils/writer';

export default class Exporter {
    static async run(config) {
        // 0. Shop info
        const shop = config.shop;

        // 1. Get categories
        const categories = [];

        // 2. Get products
        const products = [];

        // 3. Export with all templates
        const exports = config.exports;
        exports.forEach((tpl) => {
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

                //Writer.write(tpl.file, xml);
                debug(xml);
                Logger.info(`Export to ${tpl.id} completed`);
            } catch (error) {
                Logger.error(`Export to ${tpl.id} error: ${error.message}`);
            }
        });
    }
}
