import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import crypto from 'node:crypto';

@Injectable()
export class securityService {
  constructor(private readonly configService: ConfigService) {}
  //Hash converts data into a one-way value that cannot be reversed, so it is used for passwords or OTPs, and comparison is done using bcrypt.compare() without decrypting anything.
  generateHash = async ({ plaintext, salt = Number(this.configService.get<string>('SALT_ROUND')) }: { plaintext: string; salt?: number }): Promise<string> => {
    return await hash(plaintext, salt);
  };

  compareHash = async ({ plaintext, cipherText }: { plaintext: string; cipherText: string }): Promise<boolean> => {
    return await compare(plaintext, cipherText);
  };

  //Encryption is reversible, meaning you can get the original data back using a secret key, so it is used for data that needs to be read again later.
  generateEncryption = async (plaintext: string): Promise<string> => {
    const iv = crypto.randomBytes(Number(this.configService.get<string>('ENC_IV_LENGTH')));

    const ENC_KEY = this.configService.get<string>('ENC_KEY') as string;

    const cipherIvVector = crypto.createCipheriv('aes-256-cbc', ENC_KEY, iv);

    let cipherText = cipherIvVector.update(plaintext, 'utf-8', 'hex');
    cipherText += cipherIvVector.final('hex');

    return `${iv.toString('hex')}:${cipherText}`;
  };

  generateDecryption = async (cipherText: string): Promise<string> => {
    const ENC_KEY = this.configService.get<string>('ENC_KEY') as string;

    const [iv, encryption] = cipherText.split(':');
    if (!iv || !encryption) {
      throw new BadRequestException('missing encryption parts');
    }
    const ivLikeBinary = Buffer.from(iv, 'hex');
    console.log({ iv, ivLikeBinary, encryption });

    const deCipherIvVector = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, ivLikeBinary);
    let plaintext = deCipherIvVector.update(encryption, 'hex', 'utf-8');
    plaintext += deCipherIvVector.final('utf-8');
    return plaintext;
  };
}
