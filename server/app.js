const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes")
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express();
app.use(cors({credentials : true, origin : "http://localhost:3000"}));
app.use(cookieParser())
app.use(express.json())

app.use("/api", router)

mongoose
  .connect(
    "mongodb+srv://ojas:newojas@cluster0.1xfjx4m.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(5000);
    console.log("database connected");
  })
  .catch((err) => console.log(err));
