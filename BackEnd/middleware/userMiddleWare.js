const JWT = require("jsonwebtoken");
const User = require("../Models/UserModels");

const isSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token not found",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


const IsAdmin=async(req,res,next)=>{
    try {
        const user=await User.findById(req.user._id);
        if(user.role!==2){
            return res.status(401).send({
                success:false,
                message:"Unauthorised Access , Permission Denied !"
            })
        }
        else{
            next();
        }
    } catch (error) {
        res.status(401).send({
            success:false,
            message:"Error in Admin middleware,unAuthorised Access",

        })
        
    }
}
module.exports = { isSignIn,IsAdmin };
