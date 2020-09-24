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
let SurpriseLog = class SurpriseLog extends sequelize_typescript_1.Model {
    toSimplification() {
        return {
            'id': this.id,
            'cookie': this.cookie,
            'place': this.place,
            'placeInfo': this.placeInfo,
            'userId': this.userId,
            'date': this.date
        };
    }
    fromSimplification(simplification) {
        this.cookie = simplification['cookie'];
        this.place = simplification['place'];
        this.placeInfo = simplification['placeInfo'];
        this.userId = simplification['userId'];
        this.date = simplification['date'];
    }
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SurpriseLog.prototype, "cookie", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SurpriseLog.prototype, "place", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SurpriseLog.prototype, "placeInfo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SurpriseLog.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SurpriseLog.prototype, "date", void 0);
SurpriseLog = __decorate([
    sequelize_typescript_1.Table
], SurpriseLog);
exports.SurpriseLog = SurpriseLog;
//# sourceMappingURL=surpriseLog.model.js.map