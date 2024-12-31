
const express = require('express');
// const { route } = require('./routes/url');
const path = require("path")
const app = express();
const port = 8001;
const Route = require('./routes/url');
// const staticRoutes = require("./routes/staticRoutes")
const URL = require('./models/url');
const { connectToMongoDb } = require('./connect');

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

connectToMongoDb("mongodb://127.0.0.1:27017/url-shortener")
    .then(() => { console.log("Connected to MongoDB") })
    .catch((err) => { console.log(err) });

app.use('/', Route);
// app.use("/", staticRoutes);



app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log(`Server is running on port ${port}`);
    }

});