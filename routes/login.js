const { Router } = require('express');
const { bcrypt } = require('bcrypt');
const secret = 'secret_master_keyword';
const jwt = require('jsonwebtoken');
const router = Router();

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email == '') {
    res.status(401).send(' Missing  email ');
    return;
  }

  if (!password || password == '') {
    res.status(400).send('Bad reqeust -Missing Password ');
    return;
  }

  try {
    const user = await userDAO.getUserByEmail(email);
    if (!user) {
      res.status(401).send('Unauthorized - User not found');
      return;
    } else {
      bcrypt.compare(password, user.password, async (error, result) => {
        if (error || !result) {
          res.status(401).send('Unautorized - wrong password');
        } else {
          const token = jwt.sign(
            { email: user.email, _id: user._id, roles: user.roles },
            secret
          );
          res.json({ token });
        }
      });
    }
  } catch (e) {
    next(e);
  }
});
