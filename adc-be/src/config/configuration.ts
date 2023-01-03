export const configuration = () => ({
  port: 8080,
  swagger: {
    openapi: '3.0.0',
    title: 'adc-ua API',
    version: '0.1.0',
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Maks Govoruha',
      url: 'https://github.com/MaksGovor',
      email: 'maksgovruha@gmail.com',
    },
    authorization: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
});
