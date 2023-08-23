import { TypeOrmModuleOptions } from '@nestjs/typeorm'; 

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions { 
    return {
      type: 'mysql', 

      host: this.getValue('BOOKS_HOST'), 
      port: parseInt(this.getValue('BOOKS_PORT')),
      username: this.getValue('BOOKS_USER'),
      password: this.getValue('BOOKS_PASSWORD'),
      database: this.getValue('BOOKS_DATABASE'),

      entities: ['dist/**/*.entity.js'], 
      synchronize: true, 
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'BOOKS_HOST',
  'BOOKS_PORT',
  'BOOKS_USER',
  'BOOKS_PASSWORD',
  'BOOKS_DATABASE',
]);

export { configService };