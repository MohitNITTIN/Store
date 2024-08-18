const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  oAuthLoginSuccess,
  oAuthLogin,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { clientID, clientSecret, callbackURL } = require("../config/index");
// const passport = require('../config/passport/google')

const { Strategy } = require("passport-google-oauth20");
const passport = require("passport");

passport.use(
  new Strategy(
    {
      // clientID:  process.env.GOOGLE_CLIENT_ID,
      clientID,
      clientSecret,
      callbackURL,
    },
    function (accessToken, refreshToken, profile, cb) {
      const {
        given_name: firstName,
        family_name: lastName,
        email,
        picture: avatar,
      } = profile?._json;
      console.log("inside google auth");
      console.log(firstName, lastName, email);
      oAuthLogin(firstName, lastName, email, cb, avatar);
    }
  )
);

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
  }),
  oAuthLoginSuccess
);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
