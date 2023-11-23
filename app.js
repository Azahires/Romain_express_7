require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;
const userHandlers = require("./userHandlers");
const movieHandlers = require("./movieHandlers");
const { hashPassword, verifyPassword, verifyToken } = require("./auth");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);


app.post("/api/movies", verifyToken, movieHandlers.postMovie);
app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword)

app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.post("/api/users", hashPassword, userHandlers.postUser);
app.put("/api/users/:id", userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);

// const isItDwigth = (req, res) => {
//   if (req.body.email === "dwigth@theoffice.com" && req.body.password === "123456") {
//     res.send("credentials are valid")
//   } else {
//     res.sendStatus(401)
//   }
// }



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
