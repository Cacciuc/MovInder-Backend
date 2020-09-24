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
const todoitem_model_1 = require("./todoitem.model");
let TodoList = class TodoList extends sequelize_typescript_1.Model {
    toSimplification() {
        return {
            'id': this.id,
            'name': this.name
        };
    }
    fromSimplification(simplification) {
        this.name = simplification['name'];
    }
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TodoList.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => todoitem_model_1.TodoItem),
    __metadata("design:type", Array)
], TodoList.prototype, "todoItems", void 0);
TodoList = __decorate([
    sequelize_typescript_1.Table
], TodoList);
exports.TodoList = TodoList;
//# sourceMappingURL=todolist.model.js.map