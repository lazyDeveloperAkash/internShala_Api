const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid")

exports.resume = catchAsyncErrors(async (req, res, next) => {
    const { resume } = await Student.findById(req.id).exec();
    res.json({ message: "Secure Resume Page", resume });
});

// Education
exports.addEducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Education added!", student });
});

exports.editEducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.indexOf((i) => i.id === req.params.eduId);
    student.resume.education[eduIndex] = { ...student.resume.education[eduIndex], ...req.body };
    await student.save();
    res.json({ message: "Education Updated!" });
});

exports.deleteEducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterEdu = student.resume.education.filter((i) => i.id === req.params.eduId);
    student.resume.education = filterEdu;
    await student.save();
    res.json({ message: "Education Deleted!" });
});

// Job
exports.addJob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Job added!", student });
});

exports.editjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const jobIndex = student.resume.jobs.indexOf((i) => i.id === req.params.jobId);
    student.resume.jobs[eduIndex] = { ...student.resume.jobs[jobIndex], ...req.body };
    await student.save();
    res.json({ message: "Job Updated!" });
});

exports.deleteJob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterJobs = student.resume.jobs.filter((i) => i.id === req.params.jobId);
    student.resume.jobs = filterJobs;
    await student.save();
    res.json({ message: "Job Deleted!" });
});

//internship
exports.addInternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Internship added!", student });
});

exports.editInternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const InternshipIndex = student.resume.internships.indexOf((i) => i.id === req.params.internId);
    student.resume.internships[InternshipIndex] = { ...student.resume.internships[InternshipIndex], ...req.body };
    await student.save();
    res.json({ message: "Internship Updated!" });
});

exports.deleteInternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterInternships = student.resume.internships.filter((i) => i.id === req.params.internId);
    student.resume.internships = filterInternships;
    await student.save();
    res.json({ message: "Internship Deleted!" });
});

// responsibility
exports.addResponsibility = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.responsibility.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Responsibility added!", student });
});

exports.editResponsibility = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const ResponsibilityIndex = student.resume.responsibility.indexOf((i) => i.id === req.params.resId);
    student.resume.responsibility[ResponsibilityIndex] = { ...student.resume.responsibility[ResponsibilityIndex], ...req.body };
    await student.save();
    res.json({ message: "Responsibility Updated!" });
});

exports.deleteResponsibility = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterResponsibilitys = student.resume.responsibility.filter((i) => i.id === req.params.resnId);
    student.resume.responsibility = filterResponsibilitys;
    await student.save();
    res.json({ message: "Responsibility Deleted!" });
});

// courses
exports.addCourse = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Course added!", student });
});

exports.editCourse = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const courseIndex = student.resume.courses.indexOf((i) => i.id === req.params.courseId);
    student.resume.courses[courseIndex] = { ...student.resume.courses[courseIndex], ...req.body };
    await student.save();
    res.json({ message: "Courses Updated!" });
});

exports.deleteCourse = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterCourses = student.resume.courses.filter((i) => i.id === req.params.courseId);
    student.resume.courses = filterCourses;
    await student.save();
    res.json({ message: "Course Deleted!" });
});

// Projects
exports.addProject = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Project added!", student });
});

exports.editProject = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const projectIndex = student.resume.projects.indexOf((i) => i.id === req.params.projectId);
    student.resume.projects[projectIndex] = { ...student.resume.projects[projectIndex], ...req.body };
    await student.save();
    res.json({ message: "Project Updated!" });
});

exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterProjects = student.resume.projects.filter((i) => i.id === req.params.projectId);
    student.resume.projects = filterProjects;
    await student.save();
    res.json({ message: "Project Deleted!" });
});

//skills
exports.addSkill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Skill added!", student });
});

exports.editSkill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const skillIndex = student.resume.skills.indexOf((i) => i.id === req.params.skillId);
    student.resume.skills[skillIndex] = { ...student.resume.skills[skillIndex], ...req.body };
    await student.save();
    res.json({ message: "Skill Updated!" });
});

exports.deleteSkill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterSkills = student.resume.skills.filter((i) => i.id === req.params.skillId);
    student.resume.skills = filterSkills;
    await student.save();
    res.json({ message: "skill Deleted!" });
});

//accomplishments
exports.addAccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({ message: "Accomplishment added!", student });
});

exports.editAccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const accomplishmentIndex = student.resume.accomplishments.indexOf((i) => i.id === req.params.accId);
    student.resume.accomplishments[accomplishmentIndex] = { ...student.resume.accomplishments[accomplishmentIndex], ...req.body };
    await student.save();
    res.json({ message: "Accomplishment Updated!" });
});

exports.deleteAccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterAccomplishments = student.resume.accomplishments.filter((i) => i.id === req.params.accId);
    student.resume.accomplishments = filterAccomplishments;
    await student.save();
    res.json({ message: "Accomplishment Deleted!" });
});