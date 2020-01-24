const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../../auth/restricted-middleware');

router.get('/', restricted, (req, res) => {
  console.log('decoded', req.decodedToken)

  const { sub, role } = req.decodedToken

  if (role === 'admin') {
    Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => res.status(500).send(err))
  } else {
    Users.findById(sub)
    .then(user => {
      res.json(user)
    })
    .catch(err => res.status(500).send(err))
  }
});

module.exports = router;
