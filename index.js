const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));
const contactRoutes = require("./routes/contactRoute");
app.use("/api/contact", contactRoutes);
app.listen(5000, () => console.log("Server running at port 5000"));

