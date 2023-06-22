import * as crypto from 'crypto';
import { Readable } from 'stream';

export const generateChecksum = (
  file: Express.Multer.File,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = Readable.from(file.buffer);

    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('data', (chunk) => {
      hash.update(chunk);
    });

    stream.on('end', () => {
      const checksum = hash.digest('hex');
      resolve(checksum);
    });
  });
};

export const hashFileNameWithSalt = (
  dataToHash: string,
  salt: string,
  ext: string,
): string =>
  `${crypto
    .createHash('sha256')
    .update(dataToHash)
    .update(crypto.createHash('sha256').update(salt, 'utf8').digest('hex'))
    .digest('hex')}${ext}`;
