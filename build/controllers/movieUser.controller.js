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
 * @param: userId (the id of the user), movieId (the id of the movie), like (either 1 or 'like' for a like, everything else is a dislike)
 * @return: corresponding statuscode and a short message
 * @errors: 404 (could not find the user, although a session for that user is correct), 400 (could not find the movie), 401 (unauthorized)
 */
router.put('/:userId/:movieId/:like', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session && req.session.user) {
        const userId = parseInt(req.params.userId);
        const movieId = parseInt(req.params.movieId);
        const like = req.params.like === '1' || req.params.like === 'like' ? true : false;
        if (req.session.user.id === userId) {
            const user = user_model_1.User.findById(userId);
            const movie = movie_model_1.Movie.findById(movieId);
            if (user === null) {
                res.statusCode = 404;
                res.send('what the hell happened??');
                return;
            }
            if (movie === null) {
                res.statusCode = 400;
                res.send('could not find movie');
                return;
            }
            const instance = new movieuser_model_1.MovieUser();
            instance.userId = userId;
            instance.movieId = movieId;
            res.statusCode = 200;
            res.send('done');
        }
    }
    res.statusCode = 401;
    res.send('unauthorized');
}));
/**
 *  find common movies between two users
 *  @param: userId1 (the id of the requesting user), userId2 (the id of the other user)
 *  @return: json list of all commonly liked movies
 *  @errors: 400 (same user1 as user2), 401 (unauthorized)
 */
router.get('/match/:userId1/:userId2', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId1 = parseInt(req.params.userId1);
    const userId2 = parseInt(req.params.userId2);
    if (req.session && req.session.user && req.session.user.id === userId1) {
        const user1 = yield user_model_1.User.findById(userId1);
        const user2 = yield user_model_1.User.findById(userId2);
        if (user1 !== null && user2 !== null) {
            if (user1.id == user2.id) {
                res.statusCode = 400;
                res.send('you cant match with yourself');
            }
            const user1Movies = user1.movieUsers;
            const user2Movies = user2.movieUsers;
            let movies = "";
            //TODO: find a better matching algo (maybe SQL)
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
        //no response if user2id is not found to deny enumeration of userIds
    }
    res.statusCode = 401;
    res.send('unauthorized');
}));
exports.MovieUserController = router;
//# sourceMappingURL=movieUser.controller.js.map