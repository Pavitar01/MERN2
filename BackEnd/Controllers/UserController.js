const User = require("../Models/UserModels");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { name, email, pass, phone, address, role, ans, flag,photo } = req.body;
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!pass) {
      return res.send({ error: "Password is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }

    if (!email) {
      return res.send({ error: "Email is required" });
    }

    if (!ans) {
      return res.send({ error: "Security Answer is required" });
    }

    const foundUserByEmail = await User.findOne({ email });
    const foundUserByPhone = await User.findOne({ phone: phone });
    if (foundUserByEmail) {
      return res.send({ message: "Mail already exists", success: true });
    }
    if (foundUserByPhone) {
      return res.send({
        message: "Phone Number already exists",
        success: true,
      });
    }

    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(pass, saltRounds);

    const user = await new User({
      name,
      email,
      phone,
      address,
      role,
      ans,
      flag,
      photo,
      pass: hashedPass,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error,
    });
  }
};


const loginWithGoogle = async (req, res) => {
  try {
    const { email } = req.body;

    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      return res.send({ success: false, message: "Email not registered" });
    }
    
    // Checking if the user is valid
    if (foundUser.flag === 1) {
      const token = JWT.sign({ _id: foundUser.id }, process.env.JWT_SECRET, {
        expiresIn: "14d",
      });

      return res.status(200).send({
        message: "Successfully logged in!",
        success: true,
        user: {
          id: foundUser._id,
          email: foundUser.email,
          name: foundUser.name,
          phone: foundUser.phone,
          address: foundUser.address,
          role: foundUser.role,
        },
        token,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "Account is disabled by the admin!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in login",
    });
  }
};


const loginController = async (req, res) => {
  try {
    const { email, pass } = req.body;

    if (!email || !pass) {
      return res.send({ error: "Both fields are required" });
    }
    const foundUser = await User.findOne({
      $or: [{ email: email }, { phone: email }],
    });

    if (!foundUser) {
      return res.send({ success: false, message: "Invalid Email or Phone" });
    }
    //checking valid user
    if (foundUser.flag === 1) {
      const match = await bcrypt.compare(pass, foundUser.pass);

      if (!match) {
        return res.send({ success: false, message: "Password is Wrong" });
      }

      const token = JWT.sign({ _id: foundUser.id }, process.env.JWT_SECRET, {
        expiresIn: "14d",
      });

      res.status(200).send({
        message: "Successfully Login!",
        success: true,
        user: {
          id: foundUser._id,
          email: foundUser.email,
          name: foundUser.name,
          phone: foundUser.phone,
          address: foundUser.address,
          role: foundUser.role,
        },
        token,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Account is Disabled by Admin !",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login",
    });
  }
};
//forget password
const forgetPasswordController = async (req, res) => {
  try {
    const { email, ans, pass } = req.body;
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!ans) {
      return res.status(400).send({ error: "Security Answer is required" });
    }
    if (!pass) {
      return res.status(400).send({ error: "New password is required" });
    }
    const user = await User.findOne({
      $or: [{ email: email }, { phone: email }],
      ans: ans,
    });
    if (!user) {
      return res
        .status(404)
        .send({ error: "User not found or incorrect answer", success: false });
    }
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(pass, saltRounds);
    user.pass = hashedPass;
    await user.save();
    res
      .status(200)
      .send({ message: "Password reset successfully!", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong", success: false });
  }
};

//protected
const userDashBoardController = async (req, res) => {
  res.status(200).send({ islogin: true });
};
const adminDashBoardController = async (req, res) => {
  res.status(200).send({ islogin: true });
};

//update profile

const updateProfileController = async (req, res) => {
  // const { email, name, phone, address, password } = req.body;

  try {
   
    await User.findOne({ email: req.body.curreemail }).then((resp) => {
      resp.email = req.body.email;
      resp.name = req.body.name;
      resp.phone = req.body.phone;
      resp.address = req.body.address;
      return resp.save();
    });
    res.status(200).send({
      message: "Details updated Changed!",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Updating",
    });
  }
};
const registerWithGoogle=async(req,res)=>{

}
const allUserController = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }).then((resp) => {
      res.send(resp);
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  userDashBoardController,
  forgetPasswordController,
  adminDashBoardController,
  updateProfileController,
  allUserController,
  registerWithGoogle,
  loginWithGoogle,
};
