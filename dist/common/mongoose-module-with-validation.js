"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoosModuleWithValidation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const MongoosModuleWithValidation = (models, connectionName) => {
    return mongoose_1.MongooseModule.forFeatureAsync(models.map((model) => ({
        name: model.name,
        useFactory: () => {
            const schema = model.schema;
            schema.pre(/update/i, function (next) {
                this.options.runValidators = true;
                next();
            });
            return schema;
        },
    })), connectionName);
};
exports.MongoosModuleWithValidation = MongoosModuleWithValidation;
//# sourceMappingURL=mongoose-module-with-validation.js.map