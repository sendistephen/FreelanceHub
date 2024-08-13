import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the Swagger YAML file
const swaggerDocument = yaml.load(
  path.join(__dirname, './swagger/swagger.yaml')
);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
