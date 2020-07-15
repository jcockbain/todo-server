const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    title: 'Todo APIs',
    description: 'APIs to manage todo tasks',
    termsOfService: '',
    contact: {
      name: 'James Cockbain',
      email: 'jcockbain96@gmail.com',
      url: 'https://jamescockbain.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  paths: {
    '/task': {
      post: {
        description: 'Adds a specific task',
        tags: ['tasks'],
        requestBody: {
          description: 'JSON containing task information',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/taskRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            tags: ['tasks'],
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/taskResponse',
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/tasks': {
      get: {
        tags: ['tasks'],
        description: 'Returns tasks',
        parameters: [
          {
            name: 'start_time',
            description: 'The earliest time to receive tasks from, in ISO format YYYY-MM-DDTHH:MM:SSZ',
            in: 'query',
            type: 'string',
            format: 'date',
            pattern: 'YYYY-MM-DDTHH:MM:SSZ',
          },
          {
            name: 'end_time',
            description: 'The earliest time to receive tasks from, in ISO format YYYY-MM-DDTHH:MM:SSZ',
            in: 'query',
            type: 'string',
            format: 'date',
          },
        ],
        responses: {
          200: {
            description: 'A list of tasks',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/taskResponse',
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/tasks/reset': {
      post: {
        tags: ['tasks'],
        description: 'Resets the task list',
        responses: {
          200: {
            description: 'Success',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/tasks/:id': {
      get: {
        tags: ['tasks'],
        description: 'Returns a specific task',
        parameters: [
          {
            name: 'id',
            description: 'Task id',
            in: 'path',
            required: 'true',
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'The specified task',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/taskResponse',
                },
              },
            },
          },
          404: {
            description: 'Task not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
      put: {
        description: 'Overwrites the field in the specified task with those in the request body',
        tags: ['tasks'],
        parameters: [
          {
            name: 'id',
            description: 'Task id',
            in: 'path',
            required: 'true',
            type: 'string',
          },
        ],
        requestBody: {
          description: 'The task to overwrite with',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/task',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/task',
                },
              },
            },
          },
          404: {
            description: 'Task not found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      taskRequest: {
        type: 'object',
        properties: {
          description: {
            $ref: '#/components/schemas/description',
          },
          time: {
            $ref: '#/components/schemas/time',
          },
          completed: {
            $ref: '#/components/schemas/completed',
          },
        },
      },
      taskResponse: {
        type: 'object',
        properties: {
          _id: {
            $ref: '#/components/schemas/_id',
          },
          description: {
            $ref: '#/components/schemas/description',
          },
          time: {
            $ref: '#/components/schemas/time',
          },
          completed: {
            $ref: '#/components/schemas/completed',
          },
        },
      },
      _id: {
        type: 'integer',
        description: 'Database id of the task',
      },
      description: {
        type: 'string',
        description: 'Description of the task',
      },
      time: {
        type: 'string',
        format: 'date-time',
        description: 'Time of the task, in ISO format YYYY-MM-DDTHH:MM:SSZ',
      },
      completed: {
        type: 'boolean',
        description: 'Has the task been completed?',
      },
    },
  },
};

module.exports = swaggerDocument;
