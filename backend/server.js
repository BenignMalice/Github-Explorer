import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
app.use((req, res, next) => {
  // Log the request method and URL for every request to the server
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Routes Middleware
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
