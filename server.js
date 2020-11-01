const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GEt, POST, PATCH, DELETE");
    next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.code || 500).json({
        message: error.message || "An unknown error occured!",
    });
});

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
