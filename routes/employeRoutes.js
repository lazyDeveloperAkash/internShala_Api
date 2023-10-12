const express = require("express");
const router = express.Router();
const { homepage, employeSingup, employeSingin, employeSingout, currentemploye, sendMail, employeForgetLink, employeRestPassword, employeUpdate, employeOrganizationLogo, createInternship, readInternship, readSingleInternship, createJob, readJob, readSingleJob, employeDelete } = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");


router.get("/",  homepage);

//post/employe/singup
router.post("/singup", employeSingup);

//post/employe/singin
router.post("/singin", employeSingin);

//post/employe
router.post("/employe",isAuthenticated, currentemploye);

//post/employe/singout
router.get("/singout", isAuthenticated, employeSingout);

// post /employe/send-mail for forget password
router.post("/send-mail", isAuthenticated, sendMail );

// get /employe/forget-link/:employe_id for forget password
router.get("/forget-link/:id", employeForgetLink );

// get /employe/rest-link for rest password 
router.get("/forget-link", isAuthenticated, employeRestPassword );

// get /employe/update
router.post("/update", isAuthenticated, employeUpdate );

// get /employe/org-logo
router.post("/org-logo", isAuthenticated, employeOrganizationLogo );


// /employe/delete
router.get("/delete", isAuthenticated, employeDelete );

// ------------------Internships------------------------

//POST employe/Internship/create
router.post("/internship/create", isAuthenticated, createInternship);

//POST employe/Internship/read
router.post("/internship/read", isAuthenticated, readInternship);

//POST employe/Internship/create
router.post("/internship/read/:internId", isAuthenticated, readSingleInternship);

// -----------------------------------Jobs------------------------------------


//POST employe/Internship/create
router.post("/job/create", isAuthenticated, createJob);

//POST employe/job/read
router.get("/job/read", isAuthenticated, readJob);

//POST employe/job/create
router.post("/job/read/:jobId", isAuthenticated, readSingleJob);


module.exports = router;
