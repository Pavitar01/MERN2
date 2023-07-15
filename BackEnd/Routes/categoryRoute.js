const express = require('express');
const { isSignIn, IsAdmin } = require('../middleware/userMiddleWare');
const { categoryController,updateCategoryController,allCategoryController,singleCategoryController,deleteCategoryController } = require('../Controllers/CategoryController');
const categoryRouter=express.Router();


categoryRouter.post("/create-category",categoryController);//i have to add signin aIsAdmin
categoryRouter.put("/update-category/:id",isSignIn,IsAdmin,updateCategoryController);
categoryRouter.get("/all-categories",allCategoryController);
categoryRouter.get("/single-category/:slug",singleCategoryController);
categoryRouter.post("/delete-category",deleteCategoryController);//,IsAdmin,isSignIn,



module.exports={categoryRouter}