#!/usr/bin/env node
import { config } from 'dotenv';
import * as fs from 'fs';
import { generate } from 'openapi-typescript-codegen';
import * as path from 'path';

config();

const { serviceName, swaggerUrl } = {
  serviceName: 'Api',
  swaggerUrl: process.env.VITE_APP_CORE_URL + '/api-json',
};

const exists = (path: string): Promise<boolean> => {
  return new Promise((resolve) => {
    return fs.access(path, fs.constants.F_OK, (err) => resolve(!err));
  });
};

(async () => {
  const swaggerDirPath = path.join(__dirname, '..', 'temp');
  const swaggerFilepath = path.join(swaggerDirPath, `swagger_${serviceName}.json`);
  const outputPath = path.join(__dirname, '..', 'src', 'service', serviceName);

  try {
    // const apiDocs = await fetch(swaggerUrl, { method: 'GET' }).then((res) => res.json());

    const apiDocs = {
      openapi: '3.0.0',
      paths: {
        '/': {
          get: {
            operationId: 'getHello',
            parameters: [],
            responses: { '200': { description: '' } },
          },
        },
        '/private': {
          get: {
            operationId: 'getPrivate',
            parameters: [],
            responses: { '200': { description: '' } },
            security: [{ authorization: [] }],
          },
        },
        '/users/register': {
          post: {
            operationId: 'register',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UserRegisterRequest' },
                },
              },
            },
            responses: {
              '201': {
                description: '',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/UserResponse' },
                  },
                },
              },
            },
            tags: ['Users'],
            security: [{ authorization: [] }],
          },
        },
        '/users/current': {
          get: {
            operationId: 'getCurrentUser',
            parameters: [],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/UserResponse' },
                  },
                },
              },
            },
            tags: ['Users'],
            security: [{ authorization: [] }],
          },
        },
        '/car-specification/makes': {
          get: {
            operationId: 'getCarMakesBySearchStr',
            parameters: [
              { name: 'limit', required: false, in: 'query', schema: { type: 'number' } },
            ],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/CarMakeResponse' },
                    },
                  },
                },
              },
            },
            tags: ['CarSpecification'],
          },
        },
        '/car-specification/models': {
          get: {
            operationId: 'getCarModelByMake',
            parameters: [
              { name: 'makeId', required: true, in: 'query', schema: { type: 'number' } },
              { name: 'searchStr', required: false, in: 'query', schema: {} },
            ],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/CarModelResponse' },
                    },
                  },
                },
              },
            },
            tags: ['CarSpecification'],
          },
        },
        '/post/user/{userId}': {
          get: {
            operationId: 'getAllByUserId',
            parameters: [
              { name: 'userId', required: true, in: 'path', schema: { type: 'string' } },
              { name: 'limit', required: false, in: 'query', schema: { type: 'number' } },
              {
                name: 'offset',
                required: false,
                in: 'query',
                schema: { type: 'number' },
              },
            ],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/PostResponse' },
                    },
                  },
                },
              },
            },
            tags: ['Post'],
            security: [{ authorization: [] }],
          },
        },
        '/post/new': {
          post: {
            operationId: 'createPost',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/PostCreateUpdateRequest' },
                },
              },
            },
            responses: {
              '201': {
                description: '',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/PostCreateUpdateResponse' },
                  },
                },
              },
            },
            tags: ['Post'],
            security: [{ authorization: [] }],
          },
        },
        '/post/upload-image': {
          post: {
            operationId: 'uploadImage',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'multipart/form-data': {
                  schema: {
                    type: 'object',
                    properties: { file: { type: 'string', format: 'binary' } },
                  },
                },
              },
            },
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/ImageUploadResponse' },
                  },
                },
              },
            },
            tags: ['Post'],
            security: [{ authorization: [] }],
          },
        },
        '/post/newest': {
          get: {
            operationId: 'getNewest',
            parameters: [
              { name: 'limit', required: false, in: 'query', schema: { type: 'number' } },
              {
                name: 'offset',
                required: false,
                in: 'query',
                schema: { type: 'number' },
              },
            ],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/PostResponse' },
                    },
                  },
                },
              },
            },
            tags: ['Post'],
            security: [{ authorization: [] }],
          },
        },
        '/post/{id}': {
          get: {
            operationId: 'getPostById',
            parameters: [
              { name: 'id', required: true, in: 'path', schema: { type: 'string' } },
            ],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/PostResponse' },
                  },
                },
              },
            },
            tags: ['Post'],
            security: [{ authorization: [] }],
          },
          delete: {
            operationId: 'deletePost',
            parameters: [
              { name: 'id', required: true, in: 'path', schema: { type: 'string' } },
            ],
            responses: { '204': { description: '' } },
            tags: ['Post'],
            security: [{ authorization: [] }],
          },
        },
        '/post/update': {
          put: {
            operationId: 'updatePost',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/PostCreateUpdateRequest' },
                },
              },
            },
            responses: {
              '201': {
                description: '',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/PostCreateUpdateResponse' },
                  },
                },
              },
            },
            tags: ['Post'],
            security: [{ authorization: [] }],
          },
        },
        '/like-comment-manage/like': {
          post: {
            operationId: 'addLike',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/LikeRequest' },
                },
              },
            },
            responses: {
              '201': {
                description: '',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/LikeResponse' },
                  },
                },
              },
            },
            tags: ['LikeCommentManage'],
            security: [{ authorization: [] }],
          },
          delete: {
            operationId: 'deleteLike',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/LikeRequest' },
                },
              },
            },
            responses: { '204': { description: '' } },
            tags: ['LikeCommentManage'],
            security: [{ authorization: [] }],
          },
        },
        '/like-comment-manage/comment': {
          post: {
            operationId: 'createComment',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/CommentGetCreateRequest' },
                },
              },
            },
            responses: {
              '201': {
                description: '',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/CommentCreateResponse' },
                  },
                },
              },
            },
            tags: ['LikeCommentManage'],
            security: [{ authorization: [] }],
          },
          delete: {
            operationId: 'deleteComment',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/CommentDeleteRequest' },
                },
              },
            },
            responses: { '204': { description: '' } },
            tags: ['LikeCommentManage'],
            security: [{ authorization: [] }],
          },
        },
        '/like-comment-manage/comment/newest': {
          get: {
            operationId: 'getNewestComments',
            parameters: [
              { name: 'postId', required: true, in: 'query', schema: { type: 'string' } },
              { name: 'limit', required: false, in: 'query', schema: { type: 'number' } },
              {
                name: 'offset',
                required: false,
                in: 'query',
                schema: { type: 'number' },
              },
            ],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/CommentViewResponse' },
                    },
                  },
                },
              },
            },
            tags: ['LikeCommentManage'],
            security: [{ authorization: [] }],
          },
        },
      },
      info: {
        title: 'adc-ua API',
        description: '',
        version: '0.1.0',
        contact: {
          name: 'Maks Govoruha',
          url: 'https://github.com/MaksGovor',
          email: 'maksgovruha@gmail.com',
        },
        license: { name: 'MIT', url: 'https://spdx.org/licenses/MIT.html' },
      },
      tags: [],
      servers: [],
      components: {
        securitySchemes: {
          authorization: { scheme: 'bearer', bearerFormat: 'JWT', type: 'http' },
        },
        schemas: {
          UserRegisterRequest: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              gender: { type: 'string' },
            },
            required: ['email', 'firstName', 'lastName', 'gender'],
          },
          UserResponse: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              auth0Id: { type: 'string' },
              email: { type: 'string' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              gender: { type: 'string' },
              role: { type: 'string' },
            },
            required: [
              'id',
              'auth0Id',
              'email',
              'firstName',
              'lastName',
              'gender',
              'role',
            ],
          },
          CarMakeResponse: {
            type: 'object',
            properties: { id: { type: 'number' }, title: { type: 'string' } },
            required: ['id', 'title'],
          },
          CarModelResponse: {
            type: 'object',
            properties: { id: { type: 'number' }, title: { type: 'string' } },
            required: ['id', 'title'],
          },
          ContentItem: {
            type: 'object',
            properties: { type: { type: 'string' }, content: { type: 'string' } },
            required: ['type', 'content'],
          },
          LikeResponse: {
            type: 'object',
            properties: {
              userId: { type: 'string' },
              postId: { type: 'string' },
              id: { type: 'string' },
            },
            required: ['userId', 'postId', 'id'],
          },
          PostResponse: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              content: {
                type: 'array',
                items: { $ref: '#/components/schemas/ContentItem' },
              },
              carYear: { type: 'number' },
              carMake: { $ref: '#/components/schemas/CarMakeResponse' },
              carModel: { $ref: '#/components/schemas/CarModelResponse' },
              user: { $ref: '#/components/schemas/UserResponse' },
              likes: {
                type: 'array',
                items: { $ref: '#/components/schemas/LikeResponse' },
              },
              createdAt: { format: 'date-time', type: 'string' },
              id: { type: 'string' },
            },
            required: [
              'title',
              'content',
              'carYear',
              'carMake',
              'carModel',
              'user',
              'likes',
              'createdAt',
              'id',
            ],
          },
          PostCreateUpdateRequest: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              content: {
                type: 'array',
                items: { $ref: '#/components/schemas/ContentItem' },
              },
              carYear: { type: 'number' },
              carMakeId: { type: 'number' },
              carModelId: { type: 'number' },
              id: { type: 'string' },
            },
            required: ['title', 'content', 'carYear', 'carMakeId', 'carModelId'],
          },
          PostCreateUpdateResponse: {
            type: 'object',
            properties: { postId: { type: 'string' } },
            required: ['postId'],
          },
          ImageUploadResponse: {
            type: 'object',
            properties: { filename: { type: 'string' } },
            required: ['filename'],
          },
          LikeRequest: {
            type: 'object',
            properties: { postId: { type: 'string' } },
            required: ['postId'],
          },
          CommentGetCreateRequest: {
            type: 'object',
            properties: { text: { type: 'string' }, postId: { type: 'string' } },
            required: ['text', 'postId'],
          },
          CommentCreateResponse: {
            type: 'object',
            properties: { commentId: { type: 'number' } },
            required: ['commentId'],
          },
          CommentDeleteRequest: {
            type: 'object',
            properties: { commentId: { type: 'number' } },
            required: ['commentId'],
          },
          CommentViewResponse: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              text: { type: 'string' },
              postId: { type: 'number' },
              createdAt: { format: 'date-time', type: 'string' },
              user: { $ref: '#/components/schemas/UserResponse' },
            },
            required: ['id', 'text', 'postId', 'createdAt', 'user'],
          },
        },
      },
    };

    const fileExists = await exists(swaggerDirPath);
    if (!fileExists) {
      await fs.promises.mkdir(swaggerDirPath);
    }

    await fs.promises.writeFile(
      swaggerFilepath,
      Buffer.from(JSON.stringify(apiDocs), 'utf-8'),
    );

    await generate({
      input: swaggerFilepath,
      output: outputPath,
      useUnionTypes: true,
    });
  } catch (err) {
    return;
  }

  console.log('Success');
})();
