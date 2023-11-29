import express from "express";
import {
  getUsersRoute,
  getUserRoute,
  getUserReposRoute,
  getRepoDetailsRoute,
} from "./handlers.js";

const router = express.Router();

router.get("/api/users", getUsersRoute);
router.get("/api/users/:username", getUserRoute);
router.get("/api/users/:username/repos", getUserReposRoute);
router.get("/api/users/:username/repos/:repoName", getRepoDetailsRoute);

export default router;
