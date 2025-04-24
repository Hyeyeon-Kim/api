import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as admin from "firebase-admin";
import { swagger } from "./swagger";
import { INestApplication } from "@nestjs/common";

export async function getApplication(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/");

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });

  swagger(app);
  return app;
}
