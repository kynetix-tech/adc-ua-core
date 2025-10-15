import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { configuration } from './configuration';
import { TypeOrmDataSourceConfig } from './interface';

config();
const db = configuration().db as TypeOrmDataSourceConfig;
export default new DataSource(db);
