const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fpe = require('node-fpe');
require('dotenv').config()
const ascii = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.split('');
const cipher = fpe({ secret: process.env.SECRET_CIP, domain: ascii });


exports.signup = (req, res, next) => {
  const encryptedEmail =  cipher.encrypt(req.body.email);
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: encryptedEmail,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
  const encryptedEmail =  cipher.encrypt(req.body.email);
  User.findOne({ email: encryptedEmail })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          userId: user._id,
          token: jwt.sign(
            { userId: user._id },
            process.env.SECRET_TOK,
            { expiresIn: '1h' }
          )
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

