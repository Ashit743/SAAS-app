import app from "./app";
import { connectDB } from "./config/db";

import { PORT } from "./config/env";

connectDB();
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
