/* eslint-disable import/no-unresolved */
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import './config/passportSetup';
import swaggerDocument from './swagger/index';
import router from './routes/index';

const app = express();

app.use(passport.initialize());
app.use(passport.session());
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
