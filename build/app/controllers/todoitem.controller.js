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
const todolist_model_1 = require("../models/todolist.model");
const todoitem_model_1 = require("../models/todoitem.model");
const router = express_1.Router();
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const todoListId = parseInt(req.query.todoListId);
    let options = {};
    if (todoListId != null) {
        options = {
            include: [{
                    model: todolist_model_1.TodoList,
                    where: {
                        id: todoListId
                    }
                }]
        };
    }
    const instances = yield todoitem_model_1.TodoItem.findAll(options);
    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
}));
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const instance = new todoitem_model_1.TodoItem();
    instance.fromSimplification(req.body);
    yield instance.save();
    res.statusCode = 201;
    res.send(instance.toSimplification());
}));
router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const instance = yield todoitem_model_1.TodoItem.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }
    res.statusCode = 200;
    res.send(instance.toSimplification());
}));
router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const instance = yield todoitem_model_1.TodoItem.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }
    instance.fromSimplification(req.body);
    yield instance.save();
    res.statusCode = 200;
    res.send(instance.toSimplification());
}));
router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const instance = yield todoitem_model_1.TodoItem.findById(id);
    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }
    instance.fromSimplification(req.body);
    yield instance.destroy();
    res.statusCode = 204;
    res.send();
}));
exports.TodoItemController = router;
//# sourceMappingURL=todoitem.controller.js.map