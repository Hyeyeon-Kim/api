"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
async function bootstrap() {
    const app = await (0, app_1.getApplication)();
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map