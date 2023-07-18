const express = require("express");
const {
  registerController,
  loginController,
  forgetPasswordController,
  userDashBoardController,
  adminDashBoardController,
  updateProfileController,
  allUserController,
  loginWithGoogle,updateLogo,
  registerWithGoogle
} = require("../Controllers/UserController");
const { isSignIn, IsAdmin } = require("../middleware/userMiddleWare");
//Router Object
const router = express.Router();

//Register Router
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/google-regiter", registerWithGoogle);
router.post("/google-login", loginWithGoogle);
router.post("/forget-password",forgetPasswordController)

//protected url
//isSignIn is token verification middleware
// router.post("/text", isSignIn, IsAdmin, loginController);
router.get("/user-dashboard", isSignIn, userDashBoardController)
router.get("/admin-dashboard", isSignIn,IsAdmin, adminDashBoardController);

router.put("/update-profile",updateProfileController);
router.put("/update-logo",updateLogo);
router.post("/all-user",allUserController);


module.exports = { router };
