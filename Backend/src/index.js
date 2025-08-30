import dotenv from "dotenv";
import connect_db from "./DB/DB.js";
import { app } from "./app.js";   

dotenv.config({ path: "./.env" });  

connect_db()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongoose connection failure:", err);
  });
