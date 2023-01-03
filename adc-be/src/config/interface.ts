import {
  ContactObject,
  LicenseObject,
  SecuritySchemeObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface SwaggerConfig {
  openapi: string;
  title: string;
  version: string;
  description?: string;
  license: LicenseObject;
  contact: ContactObject;
  authorization: SecuritySchemeObject;
}
