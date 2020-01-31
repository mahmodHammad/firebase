const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
admin.initializeApp();

const db = admin.firestore();

const getpost = (req, res) => {
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let posts = [];

      data.forEach(d => {
        posts.push({ postid: d.id, ...d.data() });
      });
      return res.json(posts);
    });
};
app.get("/posts", getpost);

const post = (req, res) => {
  const user = {
    name: req.body.name,
    body: req.body.body,
    createdAt: new Date().toISOString()
  };
  db.collection("posts")
    .add(user)
    .then(d => {
      res.json(d);
    })
    .catch(err => console.error(err));
};
app.post("/post", post);

exports.api = functions.https.onRequest(app);

