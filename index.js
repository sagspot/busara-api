import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import chalk from 'chalk';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import users from './components/user/users.js';
import forms from './components/form/forms.js';
import pages from './components/page/pages.js';
import sections from './components/section/sections.js';
import questions from './components/question/questions.js';

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Busara survey backend',
      version: '1.0.0',
      description: 'Busara survey backend.',
    },
    servers: [
      {
        description: 'Dev server',
        url: 'http://localhost:5000',
      },
      {
        description: 'Prod server',
        url: 'https://busara-api.herokuapp.com',
      },
    ],
  },
  apis: ['./components/*/*.js'],
};

const customProps = {
  customCss: '.swagger-ui .topbar { display: none }',
};

const specs = swaggerJSDoc(options);
const app = express();

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(specs, customProps));
app.use('/api/v1/users', users);
app.use('/api/v1/forms', forms);
app.use('/api/v1/pages', pages);
app.use('/api/v1/sections', sections);
app.use('/api/v1/questions', questions);

app.get('/', (req, res) => {
  res.redirect('/api/v1/docs');
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, mongoOptions);
    console.log(chalk.cyan('Connected to Mongodb'));

    await app.listen(PORT);
    console.log(chalk.magenta.bold(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log(chalk.red(err));
    process.exit(1);
  }
};

startServer();
