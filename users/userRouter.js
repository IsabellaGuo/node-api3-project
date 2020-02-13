const express = require('express');

const Users = require("./userDb.js");
const Posts = require("../posts/postDb")

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const userData = req.body;

  Users.insert(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});


router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const user_id = req.user.id;
  const postData = { ...req.body, user_id };

  Posts.insert(postData)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    res.status(500).json({ errorMessage: err.message });
  });
});


router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.user;

  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.user;

  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.user;

  Users.remove(id)
    .then(success => {
      res.status(200).json(req.user);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });

});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const { id } = req.user;
  const userData = req.body;

  Users.update(id, userData)
    .then(success => {
      Users.getById(id)
        .then(updatedUser => {
          res.status(200).json(updatedUser);
        })
        .catch(err => {
          res.status(500).json({ errorMessage: err.message });
        });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;

  Users
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid user Id!" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
}


function validateUser(req, res, next) {
  // do your magic!
  const userData = req.body;
  if (userData) {
    if (userData.name) {
      next();
    } else {
      res.status(400).json({ errorMessage: "missing required name field" });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const postData = req.body;
  if (postData) {
    if (postData.text) {
      next();
    } else {
      res.status(400).json({ message: "missing required text field" });
    }
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

module.exports = router;
