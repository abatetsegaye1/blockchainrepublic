const express =require ("express");
// const multer = require("multer");
const { checkEmail} = require( "../controllers/auth.js");
//const verifyToken = require("../middlewares/auth.js");


const router = express.Router();
/* FILE STORAGE */
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "public/assets");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   });
//  const upload = multer({ storage });
//router.post("/login", login);
router.post("/checkEmail", checkEmail);
// router.post("/verifyCode", verifyEmailCode);
// router.post("/resetPassword", resetPassword);
//router.post("/register", register);
// router.post("/register", upload.single("picturePath"), register);
// router.put("/editprofile", upload.single("picturePath"),verifyToken, updateProfile);


module.exports= router;
