import Razorpay from 'razorpay';
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
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Error fetching books" });
    }
};
