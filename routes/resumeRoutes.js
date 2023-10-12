const express = require("express");
const router = express.Router();
const { resume, addEducation, editEducation, deleteEducation, addJob, editjob, deleteJob, addInternship, editInternship, deleteInternship, addCourse, editCourse, deleteCourse, addProject, editProject, deleteProject, editResponsibility, deleteResponsibility, addSkill, editSkill, deleteSkill, addAccomplishment, editAccomplishment, deleteAccomplishment, addResponsibility } = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/",isAuthenticated, resume);

// Education Section
//POST add education
router.post("/add-edu", isAuthenticated, addEducation);
//post edit education
router.post("/edit-edu/:eduId", isAuthenticated, editEducation);
// delete education
router.post("/delete-edu/:eduId", isAuthenticated, deleteEducation);

// Jobs
router.post("/add-job", isAuthenticated, addJob);
router.post("/edit-job/:jobId",isAuthenticated, editjob);
router.post("/delete-job/:jobId",isAuthenticated, deleteJob);

// internship
router.post("/add-internship", isAuthenticated, addInternship);
router.post("/edit-internship/:internId", isAuthenticated, editInternship);
router.post("/delete-internship/:internId", isAuthenticated, deleteInternship);

// responsibility
router.post("/add-responsibility", isAuthenticated, addResponsibility);
router.post("/edit-responsibility/:resnId", isAuthenticated, editResponsibility);
router.post("/delete-responsibility/:resnId", isAuthenticated, deleteResponsibility);

// courses
router.post("/add-course", isAuthenticated, addCourse);
router.post("/edit-course/:internId", isAuthenticated, editCourse);
router.post("/delete-course/:internId", isAuthenticated, deleteCourse);

// projects
router.post("/add-project", isAuthenticated, addProject);
router.post("/edit-project/:projectId", isAuthenticated, editProject);
router.post("/delete-project/:projectId", isAuthenticated, deleteProject);

// Skills
router.post("/add-skill", isAuthenticated, addSkill);
router.post("/edit-skill/:skillId", isAuthenticated, editSkill);
router.post("/delete-skill/:skillId", isAuthenticated, deleteSkill);

// Accomplishment
router.post("/add-accomplishment", isAuthenticated, addAccomplishment);
router.post("/edit-accomplishment/:accId", isAuthenticated, editAccomplishment);
router.post("/delete-accomplishment/:accId", isAuthenticated, deleteAccomplishment);

module.exports = router;