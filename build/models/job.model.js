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
const user_model_1 = require("./user.model");
let Job = class Job extends sequelize_typescript_1.Model {
    toSimplification() {
        return {
            'id': this.id,
            'name': this.name,
            'description': this.description,
            'description_short': this.description_short,
            'company_id': this.companyId,
            'company_email': this.companyEmail,
            'job_website': this.jobWebsite,
            'wage': this.wage,
            'wagePerHour': this.wagePerHour,
            'job_start': this.job_start,
            'job_end': this.job_end,
            'percentage': this.percentage,
            'approved': this.approved,
            'oldJobId': this.oldJobId,
            'editing': this.editing,
        };
    }
    fromSimplification(simplification) {
        this.name = simplification['name'];
        this.description = simplification['description'];
        this.description_short = simplification['description_short'];
        this.companyId = simplification['company_id'];
        this.companyEmail = simplification['company_email'];
        this.jobWebsite = simplification['job_website'];
        this.wage = simplification['wage'];
        this.wagePerHour = simplification['wagePerHour'];
        this.job_start = simplification['job_start'];
        this.job_end = simplification['job_end'];
        this.percentage = simplification['percentage'];
        this.approved = simplification['approved'];
        this.oldJobId = simplification['oldJobId'];
        this.editing = simplification['editing'];
    }
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Job.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Job.prototype, "description_short", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => user_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Job.prototype, "companyId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Job.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Job.prototype, "companyEmail", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Job.prototype, "jobWebsite", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Job.prototype, "wage", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Job.prototype, "wagePerHour", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Job.prototype, "job_start", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Job.prototype, "job_end", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Job.prototype, "percentage", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Job.prototype, "approved", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Job.prototype, "oldJobId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Job.prototype, "editing", void 0);
Job = __decorate([
    sequelize_typescript_1.Table
], Job);
exports.Job = Job;
//# sourceMappingURL=job.model.js.map