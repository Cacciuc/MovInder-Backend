"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieUserController = void 0;
const express_1 = require("express");
const movie_model_1 = require("../models/movie.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../models/user.model");
const movieuser_model_1 = require("../models/movieuser.model");
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'development',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db.sqlite'
});
const router = express_1.Router();
/**
 * add a new like/dislike
 * @param: movieId (the id of the movie), like (either 1 or 'like' for a like, everything else is a dislike)
 * @return: corresponding statuscode and a short message
 * @errors: 400 (could not find the movie), 401 (unauthorized)
 */
router.put('/:movieId/:like', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield checkUser(req)) && req && req.session && req.session.user) {
        const movieId = parseInt(req.params.movieId);
        const like = req.params.like === '1' || req.params.like === 'like' ? true : false;
        const movie = movie_model_1.Movie.findById(movieId);
        if (movie === null) {
            res.statusCode = 400;
            res.send('could not find movie');
            return;
        }
        const instance = new movieuser_model_1.MovieUser();
        instance.userId = req.session.user.id;
        instance.movieId = movieId;
        yield instance.save();
        res.statusCode = 200;
        res.send('done');
        return;
    }
    res.statusCode = 401;
    res.send('unauthorized');
}));
/**
 *  find common movies between two users
 *  @param: userId2 (the id of the other user)
 *  @return: json list of all commonly liked movies
 *  @errors: 400 (same user1 as user2), 401 (unauthorized)
 */
router.get('/match/:userId2', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId2 = parseInt(req.params.userId2);
    if ((yield checkUser(req)) && req && req.session && req.session.user) {
        const user2 = yield user_model_1.User.findById(userId2);
        if (user2 !== null) {
            if (req.session.user.id === user2.id) {
                res.statusCode = 400;
                res.send('you cant match with yourself');
            }
            const user1Movies = req.session.user.movieUsers;
            const user2Movies = user2.movieUsers;
            let movies = '';
            // TODO: use a better matching algo (maybe SQL)
            user1Movies.forEach(function (user1Movie) {
                user2Movies.forEach(function (user2Movie) {
                    if (user1Movie.movieId === user2Movie.movieId) {
                        movies += user1Movie.movie.toSimplification();
                    }
                });
            });
            res.statusCode = 200;
            res.send(movies);
            return;
        }
        // no special response if user2id is not found to deny enumeration of userIds
    }
    res.statusCode = 401;
    res.send('unauthorized');
}));
/**
 * get 50 movies, which are not liked yet
 * TODO: to randimize it better, we should add a random value to every movie (saved in db) and order by this value
 * @returns 50 movies in order of the id at a random offset
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 50; // amount of movies to be sent
    if ((yield checkUser(req)) && req && req.session && req.session.user) {
        const max = yield movie_model_1.Movie.count();
        const MovieOffset = max < limit ? 0 : Math.random() * (max - limit);
        //get all liked movieUsers
        const movieUsers = yield movieuser_model_1.MovieUser.findAll({
            where: {
                userId: req.session.user.id
            },
        });
        //get 50 not rated movies at a random offset
        const movies = yield movie_model_1.Movie.findAll({
            where: {
                id: { [sequelize_1.Op.notIn]: movieUsers.map(e => e.movieId) }
            },
            offset: MovieOffset,
            limit: limit
        });
        res.statusCode = 200;
        res.send(movies.map(e => e.toSimplification()));
        return;
    }
    res.statusCode = 401;
    res.send('unauthorized');
}));
/**
 * checks wether the user from the session exists in the db
 * @param req the request containing the session
 */
function checkUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req && req.session && req.session.user) {
            const user = yield user_model_1.User.findById(req.session.user.id);
            return user !== null;
        }
        return false;
    });
}
exports.MovieUserController = router;
//# sourceMappingURL=movieUser.controller.js.map