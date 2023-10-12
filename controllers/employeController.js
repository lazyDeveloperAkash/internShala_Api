const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const Employe = require("../models/employeModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/errorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendToken } = require("../utils/sendToken");
const path = require("path");
const imagekit = require("../utils/imageKit").initImageKit();

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure Employe Homepage" });
});

exports.currentemploye = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    res.json(employe)
})

exports.employeSingup = catchAsyncErrors(async (req, res, next) => {
    const employe = await new Employe(req.body).save();
    sendToken(employe, 201, res);
});

exports.employeSingin = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({ email: req.body.email }).select("+password").exec();
    if (!employe) return next(new ErrorHandler("User not found with this email address", 404));
    const isMatch = employe.comparePassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong password", 500))
    sendToken(employe, 200, res);
});


exports.employeSingout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "succesfully singout" })
});

exports.sendMail = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({ email: req.body.email }).exec();
    if (!employe) {
        return next(new ErrorHandler("User not found with this email address", 404));
    }
    const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`;
    sendmail(req, res, next, url);
    employe.resetPasswordToken = "1";
    await employe.save();
    res.json({ employe, url })
});

exports.employeForgetLink = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();
    if (!employe) {
        return next(new ErrorHandler("User not found with this email address", 404));
    }

    if (employe.resetPasswordToken == "1") {
        employe.resetPasswordToken = "0";
        employe.password = req.body.password;
    } else {
        return next(new ErrorHandler("Password reset link was expired ! please generate again", 404));
    }
    await employe.save();
    res.status(200).json({
        message: "Password successfuly changed"
    })
})

exports.employeRestPassword = catchAsyncErrors(async (req, res, next) => {
    const employe = await employe.findById(req.id)
    employe.password = req.body.password;
    await employe.save();
    res.status(200).json({
        message: "Password successfuly reset"
    })
    sendToken(employe, 201, res);
});

exports.employeUpdate = catchAsyncErrors(async (req, res, next) => {
    await Employe.findByIdAndUpdate(req.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "employe Updated Successfully !"
    })
});

exports.employeDelete = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    const jobs = await Job.findOne({ employe: req.id }).exec();
    const internships = await Internship.findOne({ employe: req.id }).exec();
    while(jobs || internships){
        if(jobs) await Job.findOneAndDelete({ employe: req.id }).exec();
        if(internships) await Internship.findOne({ employe: req.id }).exec();
    }
    await Employe.findByIdAndDelete(req.id).exec();
    res.json({
        // jobs
        success: true,
        message: "Employe Deleted Successfully !"
    })
});

exports.employeOrganizationLogo = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    const file = req.files.avatar;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;
    if (employe.organizationLogo.fileId !== "") {
        await imagekit.deleteFile(employe.organizationLogo.fileId);
    }
    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName
    })
    employe.organizationLogo = { fileId, url };
    await employe.save();
    res.status(200).json({
        success: true,
        message: "Organization Logo Updated !"
    })
});

// ------------------------Internships--------------------------

exports.createInternship = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    const internship = await new Internship(req.body).save();
    internship.employe = employe._id;
    employe.internships.push(internship._id);
    await employe.save();
    await internship.save();
    res.json({status: 201, internship})
})

exports.readInternship = catchAsyncErrors(async (req, res, next) => {
    const { internships } = await Employe.findById(req.id).populate("internships").exec();
    res.json({status: 201, internships})
})

exports.readSingleInternship = catchAsyncErrors(async (req, res, next) => {
    const internship = await Internship.findById(req.params.internId);
    
    res.json({status: 201, internship})
})

// ------------------------------Jobs--------------------------------------

exports.createJob = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    const job = await new Job(req.body).save();
    job.employe = employe._id;
    employe.jobs.push(job._id);
    await employe.save();
    await job.save();
    res.json({status: 201, job})
})

exports.readJob = catchAsyncErrors(async (req, res, next) => {
    const { jobs } = await Employe.findById(req.id).populate("jobs").exec();
    res.json({status: 201, jobs})
})

exports.readSingleJob = catchAsyncErrors(async (req, res, next) => {
    const job = await Job.findById(req.params.jobId);
    res.json({status: 201, job})
})
