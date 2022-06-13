import express from "express";
import { signin, signup } from "../controllers/users.js";

const router = express.Router();
console.log("I am in the routes file");
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
