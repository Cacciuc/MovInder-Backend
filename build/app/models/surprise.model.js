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
let Surprise = class Surprise extends sequelize_typescript_1.Model {
    toSimplification() {
        return {
            'id': this.id,
            'userIds': this.userIds,
            'cookie': this.cookie,
            'cookiesEnabled': this.cookiesEnabled,
            'lang': this.lang,
            'platform': this.platform,
            'plugins': this.plugins,
            'ip': this.ip,
            'browser': this.browser,
            'version': this.version,
            'country': this.country,
            'region': this.region,
            'location': this.location,
            'deviceType': this.deviceType,
            'touchScreen': this.touchScreen
        };
    }
    fromSimplification(simplification) {
        this.userIds = simplification['userIds'];
        this.cookie = simplification['cookie'];
        this.cookiesEnabled = simplification['cookiesEnabled'];
        this.platform = simplification['platform'];
        this.plugins = simplification['plugins'];
        this.lang = simplification['lang'];
        this.ip = simplification['ip'];
        this.browser = simplification['browser'];
        this.version = simplification['version'];
        this.country = simplification['country'];
        this.region = simplification['region'];
        this.location = simplification['location'];
        this.deviceType = simplification['deviceType'];
        this.touchScreen = simplification['touchScreen'];
    }
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Surprise.prototype, "cookie", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Surprise.prototype, "userIds", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Surprise.prototype, "cookiesEnabled", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Surprise.prototype, "lang", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Surprise.prototype, "platform", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Surprise.prototype, "plugins", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Surprise.prototype, "ip", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Surprise.prototype, "browser", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Surprise.prototype, "version", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Surprise.prototype, "country", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Surprise.prototype, "region", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Surprise.prototype, "location", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Surprise.prototype, "deviceType", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Surprise.prototype, "touchScreen", void 0);
Surprise = __decorate([
    sequelize_typescript_1.Table
], Surprise);
exports.Surprise = Surprise;
//# sourceMappingURL=surprise.model.js.map