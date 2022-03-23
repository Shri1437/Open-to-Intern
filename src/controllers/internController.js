const internModel = require("../models/internModel")
const CollegeModel = require("../models/collegeModel")
const mongoose = require ("mongoose")



const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

// const isValidId = function (objectId) {
//     return mongoose.Types.ObjectId.isValid(objectId)
// }


const createIntern = async function (req, res) {
    try {
        let body = req.body
        const { name, email, mobile, collegeName } = body

        if (Object.keys(body).length == 0) {
            res.status(400).send({ status: false, msg: "Please Provide required Info" })
            return
        }

        if (!isValid(name)) {
            res.status(400).send({ status: false, msg: "please enter Intern name" })
            return
        }

        if (!isValid(email)) {
            res.status(400).send({ status: false, msg: "please enter email address" })
            return
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, msg: "please enter valid email address" })
            return
        }

        let usedEmail = await internModel.findOne({ email:email })

        if (usedEmail) {
            res.status(400).send({ status: false, msg: `this ${email} is already used` })
            return
        }

        if (!isValid(mobile)) {
            res.status(400).send({ status: false, msg: "please enter mobile no." })
            return
        }

        if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(mobile))) {
            res.status(400).send({ status: false, msg: "plese enter valid mobile no" })
            return
        }

        let usedMobile = await internModel.findOne({ mobile })

        if (usedMobile) {
            res.status(404).send({ status: false, msg: `this ${mobile} is already used` })
            return
        }


        if (!isValid(collegeName)) {
            res.status(400).send({ status: false, msg: "please enter collage name" })
            return
        }


        let collegeDetails = await CollegeModel.findOne({name:collegeName})

        if(!collegeDetails) {
            res.status(404).send({status:false,msg:"No such collegeName exist"})
            return
        }
        
        let collegeId = collegeDetails._id
        let data = { name, email, mobile, collegeId}

        const internDetails = await internModel.create(data)
        
        res.status(201).send({status:true, msg:"interns created successfully", data: internDetails})
        
    }
    catch (error) {
        console.log(error)
        res.status(500).send({status:false,msg:error.message})

    }
}



module.exports.createIntern = createIntern




// const createIntern1 = async function (req, res) {
//     try {
//         let body = req.body
//         const { name, email, mobile, collegeId } = body

//         if (Object.keys(body).length == 0) {
//             res.status(400).send({ status: false, msg: "Please Provide required Info" })
//             return
//         }

//         if (!isValid(name)) {
//             res.status(400).send({ status: false, msg: "please enter Intern name" })
//             return
//         }

//         if (!isValid(email)) {
//             res.status(400).send({ status: false, msg: "please enter email address" })
//             return
//         }

//         if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
//             res.status(400).send({ status: false, msg: "please enter valid email address" })
//             return
//         }

//         let usedEmail = await internModel.findOne({ email:email })

//         if (usedEmail) {
//             res.status(400).send({ status: false, msg: `this ${email} is already used` })
//             return
//         }

//         if (!isValid(mobile)) {
//             res.status(400).send({ status: false, msg: "please enter mobile no." })
//             return
//         }

//         if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(mobile))) {
//             res.status(400).send({ status: false, msg: "plese enter valid mobile no" })
//             return
//         }

//         let usedMobile = await internModel.findOne({ mobile })

//         if (usedMobile) {
//             res.status(404).send({ status: false, msg: `this ${mobile} is already used` })
//             return
//         }

//         if (!isValid(collegeId)) {
//             res.status(400).send({ status: false, msg: "authorId is required" })
//             return
//         }
//         if (!isValidId(collegeId)) {
//             res.status(400).send({ status: false, msg: "authorId is not a vlaid authorId" })
//             return
//         }

//         const internDetails = await internModel.create(body)
        
//         res.status(201).send({status:true, msg:"interns created successfully", data: internDetails})
        
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({status:false,msg:error.message})

//     }
// }


// module.exports.createIntern1 = createIntern1
