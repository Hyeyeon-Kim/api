import { getApplication } from "./app";

async function bootstrap() {
  const app = await getApplication();

  await app.listen(process.env.PORT || 3000);
}
void bootstrap();
