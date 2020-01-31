const { db } = require("../helpers/admin");
const { firebase } = require("../helpers/firebase");
const { validate } = require("../helpers/validate");

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

  //   validation
  let errors = validate(user, true);
  if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

  db.doc(`/users/${user.name}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        errors.name = "this name is already taken";
        return res.status(400).json({ errors });
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

module.exports.login = (req, res) => {
  const input = {
    email: req.body.email,
    password: req.body.password
  };
  let errors = validate(input, false);
  if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

  firebase
    .auth()
    .signInWithEmailAndPassword(input.email, input.password)
    .then(data => {
        console.log("data*****" , data)

        return data.user.getIdToken()
    }).then(token=>{
        return res.json({token})
    }).catch(err=>{
        if(err.code="auth/user-not-found"){
            res.status(403).json({error:'wrong creadentials please try again '})
        }
        console.log(err)
        return res.status(500).json({error: err.code})
    })
};
