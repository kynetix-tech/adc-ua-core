import { configuration } from './configuration';
import { DataSource } from 'typeorm';
import { DatabaseConfig } from './interface';
import { config } from 'dotenv';

config();
const db = configuration().db as DatabaseConfig;
export default new DataSource(db);
