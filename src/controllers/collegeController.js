const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")



const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidName = function (value) {
    if (!(value === value.toLowerCase())) {
        return false
    }
    return true
}

const isValidLink = function(value) {
    if (!(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(value.trim()))) {
        return false
    }
    return true
}


const createCollege = async function (req, res) {
    try {
        let body = req.body
        const { name, fullName, logoLink } = body

        if (Object.keys(body).length == 0) {
            res.status(400).send({ status: false, msg: "Please Provide required Info" })
            return
        }

        if (!isValid(name)) {
            res.status(400).send({ status: false, msg: "Please enter the name " })
            return
        }

        if (!isValidName(name)) {
            res.status(400).send({ status: false, msg: "name should be in lowercase" })
            return
        }

        const isnameAlreadyUsed = await collegeModel.findOne({ name })
        if (isnameAlreadyUsed) {
            res.status(400).send({ status: false, message: "name is already used, try different one" })
            return
        }

        if (!isValid(fullName)) {
            res.status(400).send({ status: false, msg: "please enter fullname" })
            return
        }

        if (!isValid(logoLink)) {
            res.status(400).send({ status: false, msg: "please provide the logoLink" })
            return
        }

        if(!isValidLink(logoLink)) {
            res.status(400).send({status:false,msg:"please enter valid logolink"})
        }

        else {
            let collage = await collegeModel.create(body)

            res.status(201).send({ status: true, msg: "college created successfully", data: collage })

        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}







const collegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName

        if (!collegeName) {
            res.status(400).send({ status: false, msg: "collegeName is required" })
            return
        }

        if(!isValidName(collegeName)) {
            return res.status(400).send({ status: false, msg: "collegeName should be in lower case"})
        }

        let collegeData = await collegeModel.findOne({ name: collegeName })
        

        if (!collegeData) {
            res.status(400).send({ status: false, msg: "no college found" })
            return
        }
        else {
            let internDetails = {
                name: collegeData.name,
                fullName: collegeData.fullName,
                logoLink: collegeData.logoLink,
                interns: []
            }

            let collegeId = collegeData._id

            let appliedIntern = await internModel.find({ collegeId: collegeId }).select({ name: 1, email: 1, mobile: 1, })

            internDetails.interns = appliedIntern
            res.status(200).send({ status: true, data: internDetails })
        }

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.createCollege = createCollege

module.exports.collegeDetails = collegeDetails