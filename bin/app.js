/**
 * @file Application mount point
 * @author Sergey Sadovoi [serg.sadovoi@gmail.com]
 */
import Config from 'config';
import Logger from 'utils/logger';
import Exporter from 'exporter';

Exporter.run({
    shop: Config.get('shop'),
    exports: Config.get('exports')
}).then(() => {
    Logger.info('Export FINISH');
    process.exit(0);
}).catch((error) => {
    Logger.error('Export ERROR: ' + error.message);
    process.exit(1);
});
