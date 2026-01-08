import app from "./app";
import { port } from "./config/env";

app.listen(port, () => {
  console.log(`Server on port http://localhost:${port}`);
});
