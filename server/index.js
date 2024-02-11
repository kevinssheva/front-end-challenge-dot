const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.js");

const app = express();
dotenv.config();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

mongoose
  .connect(
    "mongodb+srv://jamesanderson:jamesanderson@cluster0.6shjqag.mongodb.net/?retryWrites=true&w=majority",
    { dbName: "quizdot" }
  )
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => console.log(err));
// app.listen(3001, () => {
//   console.log("Server is running");
// });
