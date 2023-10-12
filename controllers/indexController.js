const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/errorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendToken } = require("../utils/sendToken");
const path = require("path");
const imagekit = require("../utils/imageKit").initImageKit();

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure Homepage" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    res.json(student);
})

exports.studentSingup = catchAsyncErrors(async (req, res, next) => {
    const student = await new Student(req.body).save();
    sendToken(student, 201, res);
});

exports.studentSingin = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).select("+password").exec();
    if (!student) return next(new ErrorHandler("User not found with this email address", 404));
    const isMatch = student.comparePassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong password", 500))
    sendToken(student, 200, res);
});


exports.studentSingout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "succesfully singout" })
});

exports.sendMail = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).exec();
    if (!student) {
        return next(new ErrorHandler("User not found with this email address", 404));
    }
    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;
    sendmail(req, res, next, url);
    student.resetPasswordToken = "1";
    await student.save();
    res.json({ student, url })
});

exports.studentForgetLink = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();
    if (!student) {
        return next(new ErrorHandler("User not found with this email address", 404));
    }

    if (student.resetPasswordToken == "1") {
        student.resetPasswordToken = "0";
        student.password = req.body.password;
    } else {
        return next(new ErrorHandler("Password reset link was expired ! please generate again", 404));
    }
    await student.save();
    res.status(200).json({
        message: "Password successfuly changed"
    })
})

    exports.studentRestPassword = catchAsyncErrors(async (req, res, next) => {
        const student = await Student.findById(req.id)
        student.password = req.body.password;
        await student.save();
        res.status(200).json({
            message: "Password successfuly reset"
        })
        sendToken(student, 201, res);
});

exports.studentUpdate = catchAsyncErrors(async (req, res, next) => {
    await Student.findByIdAndUpdate(req.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "Student Updated Successfully !"
    })
});

exports.studentAvatar = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const file = req.files.avatar;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;
    if(student.avatar.fileId !== ""){
        await imagekit.deleteFile(student.avatar.fileId);
    }
    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName
    })
    student.avatar = { fileId, url };
    await student.save();
    res.status(200).json({
        success: true,
        message: "Profile Image Updated !"
    })
});

exports.studentDelete = catchAsyncErrors(async (req, res, next) => {
    await Student.findByIdAndDelete(req.id).exec();
    // const jobs = await Job.find({ students: req.id })
    res.json({
        // jobs
        success: true,
        message: "Student Deleted Successfully !"
    })
});

//--------------------------------apply internship--------------------------

exports.applyIntrenship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internship = await Internship.findById(req.params.internId).exec();
    student.internships.push(internship._id);
    internship.students.push(student._id);
    await student.save();
    await internship.save();
    res.json({student, internship})
});

//--------------------------------apply Job--------------------------

exports.applyJob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const job = await Job.findById(req.params.jobId).exec();
    student.jobs.push(job._id);
    job.students.push(student._id);
    await student.save();
    await job.save();
    res.json({student, job})
});