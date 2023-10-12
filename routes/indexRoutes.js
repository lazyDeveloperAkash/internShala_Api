const express = require("express");
const router = express.Router();
const { homepage, studentSingup, studentSingin, studentSingout, currentUser, sendMail, studentForgetLink, studentRestPassword, studentUpdate, studentAvatar, applyIntrenship, applyJob, studentDelete } = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");


router.get("/",  homepage);

//post/student/singup
router.post("/student/singup", studentSingup);

//post/student/singin
router.post("/student/singin", studentSingin);

//post/student
router.post("/student",isAuthenticated, currentUser);

//post/student/singout
router.get("/student/singout", isAuthenticated, studentSingout);

// post /student/send-mail for forget password
router.post("/student/send-mail", isAuthenticated, sendMail );

// get /student/forget-link/:student_id for forget password
router.get("/student/forget-link/:id", studentForgetLink );

// get /student/rest-link for rest password 
router.get("/student/forget-link", isAuthenticated, studentRestPassword );

// get /student/update
router.post("/student/update", isAuthenticated, studentUpdate );

// get /student/avtar
router.post("/student/avatar", isAuthenticated, studentAvatar );

// /student/delete
router.get("/student/delete", isAuthenticated, studentDelete );


// ---------------------------apply internship-----------------------------

// POST /student/apply/internship/:internshipId
router.post("/student/apply/internship/:internId", isAuthenticated, applyIntrenship );


// ---------------------------apply internship-----------------------------

// POST /student/apply/job/:jobId
router.post("/student/apply/job/:jobId", isAuthenticated, applyJob );


module.exports = router;
