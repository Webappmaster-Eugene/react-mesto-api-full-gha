require('dotenv').config();

const {
  express,
  mongoose,
  cookieParser,
  helmet,
  validationErrors,
  cors,
} = require('./config');

const { corsOptions } = require('./corsOptions');

const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { signInRouter } = require('./routes/singin');
const { signUpRouter } = require('./routes/singup');
const { notFoundRouter } = require('./routes/pathNotFound');

const { auth } = require('./middlewares/auth');
const { errors } = require('./middlewares/error');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const DATABASE = 'mongodb://127.0.0.1:27017/mestodb';
const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(DATABASE);

app.options(
  '*',
  cors({
    origin: corsOptions,
    credentials: true,
  }),
);

app.use(express.json()).use(
  cors({
    origin: corsOptions,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(requestLogger);

app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', notFoundRouter);

app.use(errorLogger);

app.use(validationErrors());
app.use(errors);

app.listen(PORT, () => {
  console.log('Сервер запущен на порту - ', PORT);
});
