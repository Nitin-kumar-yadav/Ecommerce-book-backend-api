import Order from "../model/order.js";
import User from "../model/user.model.js";
import { Book } from "../model/book.model.js";


export const orderList = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById({ _id: id })
        const userId = ((user._id).toString())


        if (userId !== process.env.ADMIN_SECRET_KEY) {
            return res.status(400).json({
                message: "Your are not administrator"
            })
        }


        const orders = await Order.find();
        if (!orders) {
            return res.status(400).json({
                message: "Order does not exist"
            })
        }


        let OrderBook = []

        const BookID = orders[0].bookId;
        for (let i = 0; i < BookID.length; i++) {
            let _id = BookID[i];
            let BookData = await Book.findById({ _id: _id })
            OrderBook.push(BookData)
        }

        const customerDataId = orders[0].userId
        const customerInfo = await User.findById({ _id: customerDataId })

        return res.status(200).json({
            orders,
            OrderBook,
            customerInfo: {
                _id: customerInfo._id,
                name: customerInfo.name,
                email: customerInfo.email,
                address: customerInfo.address,
                mobile: customerInfo.mobile
            },
            message: "Orders fetched successfully",
            message: "Your are admin"

        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Error fetching orders" });
    }
}