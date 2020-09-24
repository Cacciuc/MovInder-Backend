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
exports.MovieCategory = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const movie_model_1 = require("./movie.model");
const category_model_1 = require("./category.model");
let MovieCategory = class MovieCategory extends sequelize_typescript_1.Model {
    toSimplification() {
        return {
            'id': this.id,
            'movieId': this.movieId,
            'categoryId': this.categoryId,
        };
    }
    fromSimplification(simplification) {
        this.movieId = simplification['movieId'];
        this.categoryId = simplification['categoryId'];
    }
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => movie_model_1.Movie),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], MovieCategory.prototype, "movieId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => movie_model_1.Movie),
    __metadata("design:type", movie_model_1.Movie)
], MovieCategory.prototype, "movie", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => category_model_1.Category),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], MovieCategory.prototype, "categoryId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => category_model_1.Category),
    __metadata("design:type", category_model_1.Category)
], MovieCategory.prototype, "category", void 0);
MovieCategory = __decorate([
    sequelize_typescript_1.Table
], MovieCategory);
exports.MovieCategory = MovieCategory;
//# sourceMappingURL=moviecategory.model.js.map