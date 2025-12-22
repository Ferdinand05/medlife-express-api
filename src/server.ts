import app from "./app";
import { connectDB } from "./config/db";

async function startServer() {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Application listening at ${process.env.PORT}`);
  });
}

startServer();
