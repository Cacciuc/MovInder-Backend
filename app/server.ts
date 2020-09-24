// import everything from express and assign it to the express variable
import express from 'express';
import ExpressSession from 'express-session';

// import all the controllers. If you add a new controller, make sure to import it here as well.
import {MovieUserController, UserController} from './controllers';
import {Sequelize} from 'sequelize-typescript';
import {Category} from './models/category.model';
import {User} from './models/user.model';
import {Movie} from './models/movie.model';
import {MovieCategory} from './models/moviecategory.model';
import {MovieUser} from './models/movieuser.model';


export interface Request extends Express.Request {
  session: any;
}

const sequelize =  new Sequelize({
  database: 'development',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite'
});
sequelize.addModels([Category, User, Movie, MovieCategory, MovieUser]);

// create a new express application instance
const app: express.Application = express();
app.use(express.json());

app.use(ExpressSession({
  secret: 'atghjtztergbxf+SDG"*ZEH',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000} // after one hour without Server request the cookie expires and a relogin needs to be done
}));


// define the port the express app will listen on
let port = 80;
if (process.env.PORT !== undefined) {
  port = parseInt(process.env.PORT);
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://movinder9gag.herokuapp.com/'); //adjust url 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/movie', MovieUserController);
app.use('/login', UserController);


sequelize.sync().then(() => {
// start serving the application on the given port
  app.listen(port, '0.0.0.0', () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
});
