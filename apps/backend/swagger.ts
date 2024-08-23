import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import path from 'path';

// Load the Swagger YAML file
const swaggerDocument = yaml.load(
  path.join(__dirname, './swagger/swagger.yaml')
);

export default (app:express.Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
