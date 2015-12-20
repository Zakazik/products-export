export function priceua() {
    const catalog = '<catalog>Catalog test</catalog>';

    return '<?xml version="1.0" encoding="utf-8"?>' +
           '<!DOCTYPE yml_catalog SYSTEM "shops.dtd">' +
           catalog;
}
