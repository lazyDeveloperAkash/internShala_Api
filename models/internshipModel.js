const mongoose = require("mongoose");



const internshipModel = new mongoose.Schema({
    students: [{ type:  mongoose.Schema.Types.ObjectId, ref: "student"}],
    employe: { type:  mongoose.Schema.Types.ObjectId, ref: "employe"},
    profile: {
        type: String,
        required: [true, "Profile is requared"],
        minLength: [3, "Profile Should be atleast 3 charectosr long"]
    },
    skill: String,
    internshipType: {
        type: String,
        enum: ["In office", "Remote"]
    },
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipned: {
        status: {
            type: String,
            enum: ["Fixed", "Negotiable", "Performance Based", "Unpaid"]
        },
        ammount: Number,   
    },
    perks: String,
    assesment: String

}, { timestamps: true })



const Internship = mongoose.model("internship", internshipModel);
module.exports = Internship;