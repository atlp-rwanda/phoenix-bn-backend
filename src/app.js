import express from 'express';
import swaggerUi from 'swagger-ui-express';
import router from './routes/index';
import swaggerDocument from '../public/api-docs/swagger.json';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);

export default app;
