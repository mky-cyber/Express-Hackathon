const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 3000;
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

app.listen(port, () => {
  console.log(`Blog app listening on port ${port}`);
})
