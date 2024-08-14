import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/jokeRoute.js";

const app = express();

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

//console.log(`PORT: ${process.env.PORT}`);
//console.log(`MONGO_URL: ${process.env.MONGO_URL}`);

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successful.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

  app.use("/api/joke", route);
