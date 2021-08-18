const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validPassword = require('../models/ValidPassword');
let attemptToConnect = 0;

exports.signup = (req, res, next) => {
  if (!validPassword.validate(req.body.password)) {
    res.status(412).json({ message: 'Le mot de passe doit contenir entre 8 et 15 caractères, dont 1 majuscule, 1 minuscule, 2 chiffres et 1 caractère spécial'})
  } else {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }
};


exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          attemptToConnect ++;
          console.log(attemptToConnect); 
          if (attemptToConnect >= 3) {
            return res.status(423).json({ error: 'Compte utilisateur bloqué !' });
          } else {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
        }
        attemptToConnect = 0;
        res.status(200).json({
          userId: user._id,
          token: jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '1h' }
          )
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

