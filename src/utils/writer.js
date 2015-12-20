import fs from 'fs';

export default class Writer {
    static write(file, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(file, data, (error) => {
                if (error) {
                    return reject(error);
                }

                resolve();
            });
        });
    }
}
