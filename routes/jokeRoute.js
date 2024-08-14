import express from "express"
import { fetch, create, fetchOneJoke, update, deleteJoke } from "../controller/jokeController.js"

const route = express.Router();

route.post("/create", create);
route.get("/getAllJokes", fetch);
route.get("/getOneJoke/:id", fetchOneJoke);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteJoke);

export default route;