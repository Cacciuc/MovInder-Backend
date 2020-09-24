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
const text_model_1 = require("../models/text.model");
const router = express_1.Router();
/**
 *  returns all the texts from the db
 */
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const instances = yield text_model_1.Text.findAll();
    if (instances == null) {
        res.statusCode = 404;
        res.json({
            'message': 'this currentText could not be found'
        });
        return;
    }
    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
}));
/**
 * returns one single currentText with the correct id
 */
router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const instance = yield text_model_1.Text.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'this job could not be found'
        });
        return;
    }
    res.statusCode = 200;
    res.send(instance.toSimplification());
}));
/**
 * allows editing of a currentText
 */
router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const instance = yield text_model_1.Text.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'currentText not found for updating'
        });
        return;
    }
    instance.fromSimplification(req.body);
    yield instance.save();
    res.statusCode = 200;
    res.send(instance.toSimplification());
}));
exports.TextController = router;
//# sourceMappingURL=text.controller.js.map