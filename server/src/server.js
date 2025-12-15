import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cors from "cors";
import sequelize from "./databases/conectDatabase.js";
import path from "path";

const app = express();

// Load environment variables from .env file
dotenv.config();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app); // Use the routes defined in src/routes/index.js

// cho fe hiển thị ảnh đã lưu
// Thư mục uploads serve static
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

await sequelize.sync(); // Connect to the database before starting the server

app.listen(port, () => {
  console.log(`>>>>>>>_http://localhost:${port}`);
});
