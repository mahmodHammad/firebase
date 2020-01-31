const { admin, db } = require("../helpers/admin");
module.exports.auth = (req, res, next) => {
  // console.log(req.headers)
  if (req.headers.authorization) {
    admin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then(decodedToken => {
        req.user = decodedToken;
        return db
          .collection("users")
          .where("userid", "==", decodedToken.uid)
          .get();
      })
      .then(doc => {
        req.user.name = doc.docs[0].data().name;
        return next();
      })
      .catch(err => {
          console.error(err);
          return res.status(403).json('not authorized user ' , err)
      });
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "unauthorized" });
  }
};