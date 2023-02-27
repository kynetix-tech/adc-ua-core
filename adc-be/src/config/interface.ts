import {
  ContactObject,
  LicenseObject,
  SecuritySchemeObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface DatabaseConfig {
  type: 'mysql' | 'postgres';
  port: number;
  host: string;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  entities: Array<string>;
  ormEntities: Array<string>;
  migrations: Array<string>;
  subscribers: Array<string>;
}

export interface SwaggerConfig {
  openapi: string;
  title: string;
  version: string;
  description?: string;
  license: LicenseObject;
  contact: ContactObject;
  authorization: SecuritySchemeObject;
}

export interface CorsConfig {
  origin: string;
  methods: Array<string>;
  credentials: boolean;
}
