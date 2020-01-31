const functions = require("firebase-functions");
const app = require("express")();

const { getpost, makepost } = require("./routes/posts");
const {signup } = require("./routes/users");


//***************************** posts ******************************/
app.get("/posts", getpost);
app.post("/post", makepost);

//***************************** users ******************************/
app.post('/signup' ,signup)


exports.api = functions.https.onRequest(app);
