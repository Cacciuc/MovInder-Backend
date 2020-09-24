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
const sequelize_typescript_1 = require("sequelize-typescript");
const surprise_model_1 = require("../models/surprise.model");
const surpriseLog_model_1 = require("../models/surpriseLog.model");
const job_model_1 = require("../models/job.model");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'development',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db.sqlite'
});
const router = express_1.Router();
/**
 * SURPRISE LOGS
 */
/**
 * returns all surprise logs
 */
router.get('/log', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const instances = yield surpriseLog_model_1.SurpriseLog.findAll();
    if (instances === null) {
        res.statusCode = 404;
        res.send('none found');
        return;
    }
    res.statusCode = 200;
    res.send(instances.map((instance) => instance.toSimplification()));
}));
/**
 * returns all surprislogs of a cookie
 */
router.get('/log/:cookie', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const cookie = req.params.cookie;
    const instances = yield surpriseLog_model_1.SurpriseLog.findAll({
        where: {
            cookie: cookie
        }
    });
    if (instances === null) {
        res.statusCode = 404;
        res.send('surprise not found');
        return;
    }
    res.statusCode = 200;
    res.send(instances.map((instance) => instance.toSimplification()));
}));
/**
 * creates a new surpriseLog and saves it
 */
router.post('/log', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const instance = new surpriseLog_model_1.SurpriseLog();
    instance.fromSimplification(req.body);
    yield instance.save();
    res.statusCode = 200;
    res.send(instance.toSimplification());
}));
router.get('/log/job/:cookie', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const cookie = req.params.cookie;
    const instances = yield surpriseLog_model_1.SurpriseLog.findAll({
        where: {
            cookie: cookie,
            place: 'contacted job'
        }
    });
    if (instances === null) {
        res.statusCode = 404;
        res.send('nothing found');
        return;
    }
    // app root asks twice for this and only the second time it remembers it and so we need to only show it once
    const notFoundJobIds = [];
    for (let i = 0; i < instances.length; i++) {
        if (instances[i].placeInfo.indexOf('d') !== 0) {
            const tempJob = yield job_model_1.Job.find({
                where: {
                    id: instances[i].placeInfo.split(',')[0]
                }
            });
            if (tempJob === null) {
                instances[i].placeInfo = 'd' + instances[i].placeInfo;
                yield instances[i].save();
                notFoundJobIds.push(instances[i]);
            }
        }
    }
    res.statusCode = 200;
    res.send(notFoundJobIds.map((instance) => instance.toSimplification()));
}));
/**
 * returns the amount of surprise logs by type
 */
router.get('/log/:type/all', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const type = req.params.type;
    if (!checkSafety(type)) {
        res.statusCode = 400;
        res.send('not safe');
        return;
    }
    const command = 'SELECT Count(' + type + ') as count, ' + type + ' FROM Surprise, SurpriseLog WHERE Surprise.cookie = SurpriseLog.cookie GROUP BY ' + type;
    yield sequelize.query(command).then(function (results) {
        res.statusCode = 200;
        res.send(results[0]);
    });
}));
/**
 * returns the amount of job shows
 */
router.get('/log/:job/job/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.job;
    if (!checkSafety(id)) {
        res.statusCode = 400;
        res.send('not safe');
        return;
    }
    const command = 'SELECT count(*) as count, placeInfo FROM SurpriseLog WHERE SurpriseLog.place = \'looked at job\' AND placeInfo =' + id + ' GROUP BY placeInfo';
    yield sequelize.query(command).then(function (results) {
        res.statusCode = 200;
        res.send(results[0]);
    });
}));
/**
 * SURPRISE
 */
/**
 * returns all surprises
 */
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const instances = yield surprise_model_1.Surprise.findAll();
    if (instances === null) {
        res.statusCode = 404;
        res.send('no surprises');
        return;
    }
    res.statusCode = 200;
    res.send(instances.map((instance) => instance.toSimplification()));
}));
/**
 *  returns the surprise belonging to the cookie
 */
router.get('/:cookie', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const cookie = req.params.cookie;
    let instance = yield surprise_model_1.Surprise.find({
        where: {
            cookie: cookie
        }
    });
    if (instance === null) {
        instance = new surprise_model_1.Surprise();
        instance.cookie = cookie;
        yield instance.save();
    }
    res.statusCode = 200;
    res.send(instance.toSimplification());
}));
/**
 * edits a cookie
 * handles the userIds so, that a new one will be added to the list.
 * do not send the list!
 */
router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const instance = yield surprise_model_1.Surprise.findById(id);
    if (instance === null) {
        res.statusCode = 404;
        res.send('could not find surprise');
        return;
    }
    const oldUserIds = instance.userIds;
    instance.fromSimplification(req.body);
    instance.userIds = '"' + instance.userIds + '"';
    if (oldUserIds !== null && oldUserIds.includes(instance.userIds)) {
        instance.userIds = oldUserIds;
    }
    else if (!checkUserId(instance.userIds)) {
        instance.userIds = oldUserIds;
    }
    else if (checkUserId(oldUserIds) && checkUserId(instance.userIds)) {
        instance.userIds = oldUserIds + ',' + instance.userIds;
    }
    yield instance.save();
    res.statusCode = 200;
    res.send(instance.toSimplification());
}));
/**
 * does some string testing, if the string is empty, null or -1
 * @param userId
 */
function checkUserId(userId) {
    return userId !== null && userId !== '-1' && userId !== '' && userId !== 'null' && userId !== '""' && userId !== '"-1"' && userId !== '"null"';
}
/**
 * checks for malicious content in the currentText
 * checks for: ", ' --, UNION
 * @param text the currentText to be checked
 */
function checkSafety(text) {
    text = text.toLowerCase();
    if (text.includes('"') || text.includes('\'') || text.includes('--') || text.includes('union')) {
        return false;
    }
    return true;
}
exports.SurpriseController = router;
//# sourceMappingURL=surprise.controller.js.map