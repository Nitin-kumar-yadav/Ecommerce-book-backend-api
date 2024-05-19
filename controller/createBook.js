import { Book } from "../model/book.model.js";
import { v2 as cloudinary } from 'cloudinary'
import { configDotenv } from "dotenv";

configDotenv();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


const createBooks = async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.title ||
            !req.body.description ||
            !req.body.author ||
            !req.body.price ||
            !req.body.category

        ) {
            return res.status(400).json({ message: "Please fill all the fields" });
        } else {

            const file = req.files.image
            cloudinary.uploader.upload(file.tempFilePath, (error, data) => {
                if (error) {
                    console.log(error)
                    return res.status(500).json({ error: "Book creation failed" });
                }
                const newBook = new Book({
                    name: req.body.name,
                    title: req.body.title,
                    description: req.body.description,
                    author: req.body.author,
                    price: req.body.price,
                    category: req.body.category,
                    image: data.url
                });

                const savedBook = newBook.save();
                console.log(savedBook);
                res.status(200).json({ savedBook });
            })


        }
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ error: "Book creation failed" });
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Error fetching books" });
    }
};
export { getBooks, createBooks };
