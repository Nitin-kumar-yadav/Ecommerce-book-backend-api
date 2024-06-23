import { createBooks, getBooks } from "../controller/createBook.js";
import express, { json } from "express";
import { userSignup, userLogin, getUsers } from "../controller/userSignup.js";
import { OrderInfo, orderBooks } from "../controller/payment.js";
import { orderList } from "../controller/orderInfo.js"
const router = express.Router();

router.get('/', getBooks);
router.post("/create", createBooks);
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/user/:id", getUsers);
router.post("/order", orderBooks);
router.post("/orderConfirm", OrderInfo);
router.get("/orderConfirm/admin/:id", orderList);


export default router;