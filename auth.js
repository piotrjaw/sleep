const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
require("dotenv").config();
const pool = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async (_, __, profile, done) => {
      const account = profile._json;
      let user = {};

      try {
        const currentUserQuery = await pool.query(
          "SELECT * FROM users WHERE google_id=$1",
          [account.sub]
        );
        if (currentUserQuery.rows.length === 0) {
          // create user
          await pool.query(
            "INSERT INTO users (username,google_id) VALUES ($1,$2)",
            [account.name, account.sub]
          );

          const id = await pool.query(
            "SELECT id FROM users WHERE google_id=$1",
            [account.sub]
          );

          user = {
            id: currentUserQuery?.rows[0]?.id,
            username: currentUserQuery?.rows[0]?.username,
          };
        } else {
          // have user
          user = {
            id: currentUserQuery?.rows[0]?.id,
            username: currentUserQuery?.rows[0]?.username,
          };
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // loads into req.session.passport.user
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
