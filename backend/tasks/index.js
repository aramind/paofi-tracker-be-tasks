const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const testTaskRouter = require("./routes/testTaskRouter");

// env
dotenv.config();
const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_CONNECT;

const app = express();

// * middlewares before the routes
app.use(
  cors({
    // origin: ["https://paofi.com", "https://otherAllowedSite.com"],
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use("/test-task", testTaskRouter);

// if not found
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not Found" })
);

const startServer = async () => {
  try {
    await mongoose.connect(DB);
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
