const mongoose = require("mongoose")

const ObjectId = mongoose.Types.ObjectId


const internSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    mobile: {
        type: Number,
        unique: true,
        required: true,
        match: /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
    },
    collegeId: {
        type: ObjectId,
        ref: "College",
        required: true
    },
    isDeleted: { type: Boolean, default: false }
},
    { timestamps: true })

module.exports = mongoose.model("Intern", internSchema)