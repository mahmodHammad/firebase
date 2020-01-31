const functions = require("firebase-functions");
const app = require("express")();

const { getpost, makepost } = require("./routes/posts");
const {signup ,login} = require("./routes/users");


//***************************** posts ******************************/
app.get("/posts", getpost);
app.post("/post", makepost);

//***************************** users ******************************/
app.post('/signup' ,signup)
app.post('/login' ,login)


exports.api = functions.https.onRequest(app);
