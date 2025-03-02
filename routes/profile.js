const express = require("express");
const router = express.Router();
const Profile = require("../models/profile.model");
const middleware = require("../middleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, req.decoded.username + ".jpg");
    },
});

const fileFilter = (req, file, cb)=>{
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload= multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6,
    },
    fileFilter: fileFilter,
});

router
    .route("/add/image")
    .patch(middleware.checkToken, upload.single("img"), async (req, res) => {
        try {
            const updatedProfile = await Profile.findOneAndUpdate(
                { username: req.decoded.username },
                {
                    $set: {
                        img: req.file.path,
                    },
                },
                { new: true } // Return updated document
            );

            if (!updatedProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }

            return res.status(200).json({
                message: "Image added successfully",
                data: updatedProfile,
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    });



router.route("/add").post(middleware.checkToken,(req,res)=>{
    const profile= Profile({
        username:req.decoded.username,
        name:req.body.name,
        profession:req.body.profession,
        DOB:req.body.DOB,
        titleline:req.body.titleline,
        about:req.body.about,
    });
    profile.save()
    .then(()=>
    {
        return res.json({msg:"profile successfully stored"});
    })
    .catch((err)=>{
        return res.status(400).json({err:err});
    });
});

module.exports = router;