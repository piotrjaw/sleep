const express = require("express");
const router = express.Router();
const passport = require("passport");

// router.get("/", (_, res) => {
//   res.send("hi auth");
// });

router.get(
  "/google",
  passport.authenticate("google", {
    scope: "profile",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: true }),
  (_, res) => {
    // res.send(req.user);
    res.redirect(`${process.env.CLIENT_URL}`);
  }
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(`${process.env.CLIENT_URL}`);
  });
});

module.exports = router;
