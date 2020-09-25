import {Request, Response, Router} from 'express';
import {Movie} from '../models/movie.model';
import {Sequelize} from 'sequelize-typescript';
import {User} from '../models/user.model';
import { MovieUser } from '../models/movieuser.model';
import { isExpressionStatement } from 'typescript';
import {Op} from 'sequelize';

const sequelize =  new Sequelize({
    database: 'development',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db.sqlite'
  });

  const router: Router = Router();

/**
 * add a new like/dislike
 * @param: movieId (the id of the movie), like (either 1 or 'like' for a like, everything else is a dislike)
 * @return: corresponding statuscode and a short message
 * @errors: 400 (could not find the movie), 401 (unauthorized)
 */
router.put('/:movieId/:like', async(req: Request, res: Response) =>{
    if(await checkUser(req) && req && req.session && req.session.user){
        const movieId = parseInt(req.params.movieId);
        const like = req.params.like === '1' || req.params.like === 'like' ? true : false;
        const movie = Movie.findById(movieId);
        if(movie === null){
            res.statusCode = 400;
            res.send('could not find movie');
            return;
        }
        const instance = new MovieUser();
        instance.userId = req.session.user.id;
        instance.movieId = movieId;
        await instance.save();
        res.statusCode = 200;
        res.send('done');
        return;
    }
    res.statusCode = 401;
    res.send('unauthorized');

});

/**
 *  find common movies between two users
 *  @param: userId2 (the id of the other user)
 *  @return: json list of all commonly liked movies
 *  @errors: 400 (same user1 as user2), 401 (unauthorized)
 */
router.get('/match/:userId2', async(req: Request, res: Response) =>{
    const userId2 = parseInt(req.params.userId2);
    if(await checkUser(req) && req && req.session && req.session.user){
        const user2 = await User.findById(userId2);
        if(user2 !== null){
            if(req.session.user.id === user2.id){
                res.statusCode = 400;
                res.send('you cant match with yourself');
            }
            const user1Movies = req.session.user.movieUsers;
            const user2Movies = user2.movieUsers;
            let movies = '';
            // TODO: use a better matching algo (maybe SQL)
            user1Movies.forEach(function (user1Movie: MovieUser){
                user2Movies.forEach(function (user2Movie: MovieUser){
                    if(user1Movie.movieId === user2Movie.movieId){
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
});

/**
 * get 50 movies, which are not liked yet
 * TODO: to randimize it better, we should add a random value to every movie (saved in db) and order by this value
 * @returns 50 movies in order of the id at a random offset
 */
router.get('/', async(req: Request, res: Response) =>{    
    const limit = 50; // amount of movies to be sent
    if(await checkUser(req) && req && req.session && req.session.user){
        const max = await Movie.count();
        const MovieOffset = max < limit ? 0 : Math.random() * (max - limit);
        //get all liked movieUsers
        const movieUsers = await MovieUser.findAll({
            where: {
                userId: req.session.user.id
            },
        });

        //get 50 not rated movies at a random offset
        const movies = await Movie.findAll({
            where: {
                id: {[Op.notIn]: movieUsers.map(e=>e.movieId)}
            },
            offset: MovieOffset,
            limit: limit
        });
        res.statusCode = 200;
        res.send(movies.map(e=> e.toSimplification()));
        return;
    }
    res.statusCode = 401;
    res.send('unauthorized');
});

/**
 * checks wether the user from the session exists in the db
 * @param req the request containing the session
 */
async function checkUser(req: Request): Promise<boolean> {
    if(req && req.session && req.session.user){
        const user = await User.findById(req.session.user.id);
        return user !== null;
    }
    return false;
}

export const MovieUserController: Router = router;
