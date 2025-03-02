const express =require("express");
const mongoose =require("mongoose");

const password = encodeURIComponent("Hemanth@5221");
const Port =process.env.PORT || 5000;
const app=express();

mongoose.connect(`mongodb+srv://hemanthchandrasekharv:${password}@rent.e31d7.mongodb.net/?retryWrites=true&w=majority&appName=rent`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connection =mongoose.connection;
connection.once("open",() => {
    console.log("MongoDb Connected");
});

app.use("/uploads",express.static("uploads"));
app.use(express.json());
const userRoute = require("./routes/user");
app.use("/user", userRoute);
const profileRoute = require("./routes/profile");
app.use("/profile", profileRoute);

data = {
    msg: "Welcome to my world",
    info: "This is my project",
    Working: "Documentation of my project",
    request: 
    "Hey if you did not know my project u will understood",
};

  

app.route("/").get((req, res) => res.json(data));

app.listen(Port,"0.0.0.0", ()=>console.log(`your server is running on port ${Port}`));