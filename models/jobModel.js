const mongoose = require("mongoose");



const jobModel = new mongoose.Schema({
    students: [{ type:  mongoose.Schema.Types.ObjectId, ref: "student"}],
    employe: { type:  mongoose.Schema.Types.ObjectId, ref: "employe"},
    title: {
        type: String,
        required: [true, "Profile is requared"],
        minLength: [3, "Profile Should be atleast 3 charectosr long"]
    },
    skill: String,
    jobType: {
        type: String,
        enum: ["In office", "Remote"]
    },
    openings: Number,
    description: String,
    preferances: String,
    salary: Number,
    perks: String,
    assesment: String

}, { timestamps: true })



const Job = mongoose.model("job", jobModel);
module.exports = Job;