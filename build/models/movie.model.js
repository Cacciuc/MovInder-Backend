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
exports.Movie = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const moviecategory_model_1 = require("./moviecategory.model");
let Movie = class Movie extends sequelize_typescript_1.Model {
    toSimplification() {
        return {
            'id': this.id,
            'name': this.name,
            'description': this.description,
            'image': this.image,
        };
    }
    fromSimplification(simplification) {
        this.name = simplification['name'];
        this.description = simplification['description'];
        this.image = simplification['image'];
    }
};
__decorate([
    sequelize_typescript_1.HasMany(() => moviecategory_model_1.MovieCategory),
    __metadata("design:type", Array)
], Movie.prototype, "categories", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Movie.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Movie.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Movie.prototype, "image", void 0);
Movie = __decorate([
    sequelize_typescript_1.Table
], Movie);
exports.Movie = Movie;
//# sourceMappingURL=movie.model.js.map