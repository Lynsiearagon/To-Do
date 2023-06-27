import express from "express";
const app = express();
const port = 5000; 

// this is the backend entry point into the app

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.listen(port, () => {
    console.log("Server running on port: " + port);
});