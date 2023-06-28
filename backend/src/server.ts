import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

// this is the backend entry point into the app

const port = env.PORT;

mongoose.connect(env.MONGO_URI)
.then(() => {
    console.log("Mongoose is connected");
    app.listen(port, () => {
        console.log("Server running on port: " + port);
    });
})
.catch(console.error); 


