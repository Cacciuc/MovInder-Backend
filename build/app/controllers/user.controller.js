"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const js_sha256_1 = require("js-sha256");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'development',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db.sqlite'
});
const router = express_1.Router();
/**
 * connection to db test
 */
router.get('/connTest', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.statusCode = 200;
    return res.json({ 'ok': 'connected' });
}));
/**
 * checks whether the session is valid
 * for security reasons, the email-address and the userId are checked and need to be correct before returning the user instance
 *
 * @params: Credentials (otherwise the session will fail
 * @return: instance of the user or nothing
 */
router.get('/session', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.session != null && req.session.user != null) {
        const instance = yield user_model_1.User.findById(req.session.user.id);
        if (instance !== null) {
            if (req.session.user.email === instance.email) {
                instance.password = '';
                instance.salt = '';
                req.session.user = instance;
                return res.status(200).send(instance);
            }
        }
        return res.status(401).send('Error, User does not exist');
    }
    else {
        return res.status(401).send('User not found');
    }
}));
/**
 * generates for the user with @param id a new salt
 *
 * use case: register a new user or change the password of a user
 *
 * security: user who makes the request needs to be admin or the user itself (credentials check)
 *
 * @param: id: user ID of the user, who needs a new salt (whose password is changed or who is registering)
 * @return: instance of the user with new salt and an empty password
 */
router.get('/salt/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (req.session && req.session.user && (req.session.user.id === id || req.session.user.role === 'admin')) {
        const instance = yield user_model_1.User.findById(id);
        if (instance === null) {
            res.statusCode = 404;
            res.json({
                'message': 'this user could not be found'
            });
            return;
        }
        instance.salt = getNewSalt();
        yield instance.save();
        instance.password = '';
        res.statusCode = 200;
        res.send(instance.toSimplification());
        return;
    }
}));
/**
 * returns all unapproved users
 * use case: moderator has to approve all users
 *
 * security: user who makes the request needs to be admin or moderator
 *
 * @return: all unapproved users
 */
router.get('/unapproved', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.session && req.session.user && (req.session.user.role === 'moderator' || req.session.user.role === 'admin')) {
        const instances = yield user_model_1.User.findAll({
            where: sequelize_typescript_1.Sequelize.or({ approved: 0 })
        });
        res.statusCode = 200;
        return res.send(instances.map(e => e.toSimplification()));
    }
}));
/**
* logout for the user
* destroys the active session
*/
router.get('/logout', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.session) {
        req.session.destroy(err => { console.error(err); });
        res.statusCode = 200;
        return res.send('logout successful');
    }
    else {
        return res.send('never logged in');
    }
}));
/**
 * returns all Users
 * use case:
 * get all users as a admin or moderator for administration
 *
 * security: user who makes the request needs to be admin or moderator
 *
 * @return: all users
 */
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.session && req.session.user && (req.session.user.role === 'moderator' || req.session.user.role === 'admin')) {
        const instances = yield user_model_1.User.findAll();
        if (instances == null) {
            res.statusCode = 404;
            res.json({
                'message': 'this user could not be found'
            });
            return;
        }
        res.statusCode = 200;
        // do not leak passwords and hashes
        for (let i = 0; i < instances.length; i++) {
            instances[i].password = '';
            instances[i].salt = '';
        }
        res.send(instances.map(e => e.toSimplification()));
    }
}));
// TODO comment is wrong as I guess
/**
 * returns infos about this user, except the password
 * use case:
 * get the salt for this user to be able to provide the correct passwordhash
 */
router.get('/company/:id/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const instance = yield user_model_1.User.find({
        where: {
            id: id
        }
    });
    if (instance === null) {
        res.statusCode = 404;
        res.json({
            'message': 'this user could not be found'
        });
        return;
    }
    res.statusCode = 200;
    res.send(instance.toSimplification());
}));
/**
 * returns instance about this user without password
 *
 * use case: login, get the salt for this user to be able to provide the correct passwordhash
 *
 * @param: email of the user (actually the one who logs in)
 * @return: instance of the user without password
 */
router.get('/:email_v/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const email_v = req.params.email_v;
    const instance = yield user_model_1.User.find({
        where: {
            email: email_v
        }
    });
    if (instance === null) {
        res.statusCode = 404;
        res.json({
            'message': 'this user could not be found'
        });
        return;
    }
    instance.password = ''; // prevent leaking of pw
    res.statusCode = 200;
    res.send(instance.toSimplification());
}));
/**
 * returns an instance of the user if the password is correct and initializes credentials
 *
 * use case: login of the user, password needs to be checked
 *
 * @params: id: User ID of the user, who logs in
 *          password: the hashed password of the user
 * @return: instance of the user and valid credentials
 */
router.get('/:id/:password', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const password = req.params.password;
    const instance = yield user_model_1.User.findById(id);
    if (instance == null || instance.password !== password) {
        res.statusCode = 404;
        res.json({
            'message': 'this user could not be found'
        });
        return;
    }
    instance.password = '';
    instance.salt = '';
    if (req.session) {
        req.session.user = instance;
        res.statusCode = 200;
        res.send(instance.toSimplification());
        return;
    }
    res.statusCode = 403;
    res.send('Error creating a session');
    return;
}));
/**
 * creates a new user and returns it
 *
 * use case: registering of a new user
 *
 * @param body has a instance which contains name and email of the user
 *
 * @return instance of the user without a password
 *
 * @return creates a session without the salt in it
 * */
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const instance = new user_model_1.User();
    instance.fromSimplification(req.body);
    instance.salt = getNewSalt();
    yield instance.save();
    instance.password = ''; // salt has to be returned, because otherwise password can not be hashed
    if (req.session) {
        req.session.user = instance;
        req.session.user.salt = ''; // salt does not need to be stored in the cookie
        res.statusCode = 200;
        return res.send(instance.toSimplification());
    }
    return res.send('Error creating a session');
}));
/** updates the password of a user
 *  use case: to change the password of the user
 *
 *  security: user who makes the request has to be admin or the user itself
 *
 *  @params user id and the new password
 * */
router.put('/:id/:newPassword', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const instance = yield user_model_1.User.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'user not found for pw change'
        });
        return;
    }
    if (req.session && req.session.user && (req.session.user.id === id || req.session.user.role === 'admin')) {
        instance.password = req.params.newPassword;
        yield instance.save();
        instance.password = '';
        instance.salt = '';
        res.status(200);
        res.send(instance.toSimplification());
    }
}));
/** updates a user according to the message body
 *
 * Note: password and salt can not be changed!
 *
 * use case: user administration, change of profile (such as address, email, name and description) and approval status of the user
 *
 * security: user who makes the request needs to be himself or admin or moderator
 *
 * @params user id, instance of the user in the body
 *
 * @return user body without password & salt, session will be updated if user makes the changes not on his account (such as moderator and admin)
 * */
router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const instance = yield user_model_1.User.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'user not found for updating'
        });
        return;
    }
    if (req.session && req.session.user && (req.session.user.id === id || req.session.user.role === 'admin' || req.session.user.role === 'moderator')) {
        const oldPw = instance.password;
        const salt = instance.salt;
        instance.fromSimplification(req.body);
        instance.password = oldPw;
        instance.salt = salt;
        yield instance.save();
        instance.password = '';
        instance.salt = '';
        if (req.session && req.session.user.id === instance.id) {
            req.session.user = instance;
        }
        res.status(200);
        res.send(instance.toSimplification());
        return;
    }
}));
/**
 * deletes a user by user ID
 *
 * security: user who makes the request needs to be the user himself or admin or moderator
 *
 * @param: id: userID of the user, who needs to be deleted
 */
router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (req.session && req.session.user && (req.session.user.id === id || req.session.user.role === 'admin' || req.session.user.role === 'moderator')) {
        const instance = yield user_model_1.User.findById(id);
        if (instance == null) {
            res.statusCode = 404;
            res.json({
                'message': 'user not found to delete'
            });
            return;
        }
        instance.fromSimplification(req.body);
        yield instance.destroy();
        res.status(204);
        res.send();
    }
}));
function getNewSalt() {
    return js_sha256_1.sha256.create().update(Math.floor(Math.random() * 100000 * Math.random() * 50 * Math.random() + 1).toString()).hex(); // trying to make Math.random a true random for a good salt
}
exports.UserController = router;
//# sourceMappingURL=user.controller.js.map