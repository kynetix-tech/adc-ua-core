import { configuration } from './configuration';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

config();
const db = configuration().db as DataSourceOptions;
export default new DataSource(db);
