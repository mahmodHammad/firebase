const {db} = require('../helpers/admin')
module.exports.makepost = (req, res) => {
    const user = {
      name: req.user.name,
      body: req.body.body,
      createdAt: new Date().toISOString()
    };
    db.collection("posts")
      .add(user)
      .then(d => {
        res.json(`post ${d.id} created !`);
      })
      .catch(err => console.error(err));
  };


  
module.exports.getpost = (req, res) => {
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