"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
// import everything from express and assign it to the express variable
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
// import all the controllers. If you add a new controller, make sure to import it here as well.
const controllers_1 = require("./controllers");
const sequelize_typescript_1 = require("sequelize-typescript");
const job_model_1 = require("./models/job.model");
const user_model_1 = require("./models/user.model");
const surprise_model_1 = require("./models/surprise.model");
const surpriseLog_model_1 = require("./models/surpriseLog.model");
const text_model_1 = require("./models/text.model");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'development',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db.sqlite'
});
sequelize.addModels([job_model_1.Job, user_model_1.User, surprise_model_1.Surprise, surpriseLog_model_1.SurpriseLog, text_model_1.Text]);
// create a new express application instance
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_session_1.default({
    secret: 'ABIGHooaA',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 } // after one hour without Server request the cookie expires and a relogin needs to be done
}));
// define the port the express app will listen on
let port = 3000;
if (process.env.PORT !== undefined) {
    port = parseInt(process.env.PORT);
}
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://jobly.ch');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use('/job', controllers_1.JobController);
app.use('/login', controllers_1.UserController);
app.use('/surprise', controllers_1.SurpriseController);
app.use('/text', controllers_1.TextController);
sequelize.sync().then(() => {
    // start serving the application on the given port
    app.listen(port, '0.0.0.0', () => {
        // success callback, log something to console as soon as the application has started
        console.log(`Listening at http://localhost:${port}/`);
    });
});
//# sourceMappingURL=server.js.map