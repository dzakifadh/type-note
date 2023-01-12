import express from "express";
import { createNote, getNote, getNotes } from "../controllers";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/", createNote);

export default router;
