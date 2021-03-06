const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const recipeRouter = require("./routes/recipe_routes.js")

const port = 5000;
const dbConn = 'mongodb://localhost/my_recipe';

const app = express();

mongoose.connect(dbConn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  (err) => {
    if (err) {
      console.log('Error connecting to database', err);
    }else {
      console.log('Connected to database!');
    }
  }
);

app.use(cors());
app.use(bodyParser.json());

// routing
app.use("/", recipeRouter)

app.listen(port, () => {
  console.log(`This fabulous Express Hackathon App is listening on port ${port}`);
  console.log(`Check it out at http://localhost/${port}`)
})
