
import { app } from "./app";
import { connectDB } from "./config/db.config";
import { ENV } from "./config/env.config";

(async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`Server running on ${ENV.PORT}`);
  });
})();
