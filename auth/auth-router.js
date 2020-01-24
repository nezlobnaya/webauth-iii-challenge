const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const Users = require('../routes/users/users-model');

// for endpoints beginning with /api/auth
router.post('/register', [
  check('username', "Please Enter a Valid Username")
  .not()
  .isEmpty(),
  check('password', 'Please enter a min 6 characters Password').isLength({ min: 6 })
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({
          errors: errors.array()
      });
  }
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      //jwt should be generated
      const token = generateToken(saved)
      res.status(201).json({
        user: saved,
      token});
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  //header payload and verify signature
  //payload -> username, id, roles, exp date
  const payload ={
    sub: user.id,
    username: user.username ,
    role: user.role
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
  //verif signature -> a secret hash

}

module.exports = router;
