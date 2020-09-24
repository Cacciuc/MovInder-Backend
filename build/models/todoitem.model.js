"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const todolist_model_1 = require("./todolist.model");
let TodoItem = class TodoItem extends sequelize_typescript_1.Model {
    toSimplification() {
        return {
            'id': this.id,
            'name': this.name,
            'done': this.done
        };
    }
    fromSimplification(simplification) {
        this.name = simplification['name'];
        this.done = simplification['done'];
        this.todoListId = simplification['todoListId'];
    }
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TodoItem.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], TodoItem.prototype, "done", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => todolist_model_1.TodoList),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TodoItem.prototype, "todoListId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => todolist_model_1.TodoList),
    __metadata("design:type", todolist_model_1.TodoList)
], TodoItem.prototype, "todoList", void 0);
TodoItem = __decorate([
    sequelize_typescript_1.Table
], TodoItem);
exports.TodoItem = TodoItem;
//# sourceMappingURL=todoitem.model.js.map