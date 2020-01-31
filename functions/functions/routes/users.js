const { db } = require("../helpers/admin");
const { firebase } = require("../helpers/firebase");
module.exports.signup = (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    year: req.body.year,
    major: req.body.major
  };
  let usertoken, userid;

  //unique name
  db.doc(`/users/${user.name}`)
    .get()
    .then(doc => {
      console.log(doc.exists);
      if (doc.exists) {
        return res.status(400).json({ name: "this name is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password);
      }
    })
    .then(data => {
      userid = data.user.uid;
      return data.user.getIdToken();
    })
    .then(token => {
      usertoken = token;
      const userdata = {
        userid: userid,
        email: user.email,
        name: user.name,
        createdAt: new Date().toISOString(),
        year: user.year,
        major: user.major
      };
      return db.doc(`/users/${user.name}`).set(userdata);
    })
    .then(() => {
      res.status(201).json({ usertoken });
    })
    .catch(err => {
      console.error(err);
      res.status(400).json({ error: err.code });
    });
};

// module.exports.getpost = (req, res) => {
//     db.collection("posts")
//       .orderBy("createdAt", "desc")
//       .get()
//       .then(data => {
//         let posts = [];

//         data.forEach(d => {
//           posts.push({ postid: d.id, ...d.data() });
//         });
//         return res.json(posts);
//       });
//   };
