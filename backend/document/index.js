const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const documentRouter = require("./router/document.router");

dotenv.config();
const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then((data) => console.log(`Connected to MongoDB`))

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/documents", documentRouter);

app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not Found" })
);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));



