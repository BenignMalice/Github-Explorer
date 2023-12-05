import express from "express";
import {
  getUsersRoute,
  getUserRoute,
  getUserReposRoute,
  getRepoDetailsRoute,
} from "./handlers.js";

// Create an instance of the Express router
const router = express.Router();

// Define routes and their corresponding route handler functions
router.get("/api/users", getUsersRoute);
router.get("/api/users/:username", getUserRoute);
router.get("/api/users/:username/repos", getUserReposRoute);
router.get("/api/users/:username/repos/:repoName", getRepoDetailsRoute);

// Export the router to be used in the main Express app
export default router;
