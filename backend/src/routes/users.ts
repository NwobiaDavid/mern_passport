import express from "express";
import {
  getUser,
} from "../controllers/users.ts";

const router = express.Router();

/* READ */
router.get("/:id", getUser);

export default router;
