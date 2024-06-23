import Razorpay from 'razorpay';
import { Book } from '../model/book.model.js'
import User from '../model/user.model.js'
import Order from '../model/order.js';
export const orderBooks = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        if (!req.body) {
            return res.status(400).json({
                message: "Invalid request",
            });
        }

        const options = {
            amount: req.body.amount * 100 * 83.15,
            currency: "INR",
            receipt: req.body.receipt,
            payment_capture: 1,
        };

        if (!options.amount || !options.currency || !options.receipt) {
            return res.status(400).json({
                message: "All options required",
            });
        }

        const response = await instance.orders.create(options);

        if (!response || !response.id) {
            return res.status(400).json({
                message: "Invalid response",
            });
        }

        res.status(200).json({
            message: "Order created successfully",
            response: response,
        });

        console.log(response);
    } catch (error) {
        console.log("Error creating order:", error);
        res.status(500).json({ error: "Error creating order" });
    }
};

export const OrderInfo = async (req, res) => {
    try {
        const { bookId } = req.body
        const { userId } = req.body

        let books = []

        for (let i = 0; i < bookId.length; i++) {
            const book = await Book.findById(bookId[i])
            books.push(book)
            if (!book) {
                return res.status(400).json({
                    message: "Book does not exist"
                })
            }
        }
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            })
        }
        const order = new Order({
            bookId,
            userId
        })
        const savedOrder = await order.save()
        if (!savedOrder) {
            return res.status(400).json({
                message: "Order creation failed"
            })
        }
        return res.status(200).json({
            message: "Order created successfully",
            books,
            user: {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                address: user.address
            }
        })
    } catch (error) {
        console.log("Error creating order:", error);
    }
}
