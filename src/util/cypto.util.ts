const c = require('crypto')

export class CryptoUtil {

    static generateHash(toEncrypt: string) {
        return c.createHash('sha256').update(toEncrypt).digest('hex');
    }
}