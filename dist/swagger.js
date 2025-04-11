"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = swagger;
const swagger_1 = require("@nestjs/swagger");
function swagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API 1.0')
        .setDescription('v1용 API')
        .setVersion('1.0')
        .addBearerAuth()
        .addServer('./')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'API 1.0',
    });
}
//# sourceMappingURL=swagger.js.map