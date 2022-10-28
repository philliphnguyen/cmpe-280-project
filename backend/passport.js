const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('mongoose').model('User');

const opts = {
    jwtFromRequest: ExtractJWT.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
};

const strategy = new JWTStrategy(opts, (payload, done) => {
    User.findById(payload._id)
    .then(user => {
        if (user)
            return done(null, user);
        else    
            return done(null, false);
    })
    .catch(err => done(err, null));
});

module.exports = passport => {
    passport.use(strategy);
};