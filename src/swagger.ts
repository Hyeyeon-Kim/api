import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

function swagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("API 1.0")
    .setDescription("v1용 API")
    .setVersion("1.0")
    .addBearerAuth()
    .addServer("./")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    customSiteTitle: "API 1.0",
  });
}

export { swagger };
