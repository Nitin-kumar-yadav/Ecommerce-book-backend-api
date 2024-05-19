import { createBooks, getBooks } from "../controller/createBook.js";
import express, { json } from "express";
import { userSignup, userLogin, getUsers } from "../controller/userSignup.js";
const router = express.Router();

router.get('/', getBooks);
router.post("/create", createBooks);
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/user/:id", getUsers);


export default router;