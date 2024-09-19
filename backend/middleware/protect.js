const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

exports.allProtect = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: "fail", error: 'Unauthorized to view' });
      }

    const token = authHeader.split(' ')[1];
    try  {
        const decodedInfo = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedInfo.username
        req.userid = decodedInfo.id.valueOf()
        next()
    }
    catch {
        return res.status(404).json({status: "fail", message: "Unauthorized to view"})
    }
}

exports.personalProtect = async (req, res, next) => {

    if(!req.userid) return res.status(401).json({status: "fail", error: 'Unauthorized to view' });
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: "fail", error: 'Unauthorized to view' });
    }
    const profile = await User.findOne({username: req.params.uname})
    const token = authHeader.split(' ')[1];
    try  {
        const decodedInfo = jwt.verify(token, process.env.JWT_SECRET)
        if(decodedInfo.id == profile._id.valueOf()) {
            next()
        }
        else return res.status(404).json({status: "fail", message: "Unauthorized to view"})
    }
    catch {
        return res.status(404).json({status: "fail", message: "Unauthorized to view"})
    }
}

exports.adminProtect = async (req, res, next) => {
    if(!req.user) return res.status(401).json({ status: "fail", error: 'Unauthorized to view' });
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: "fail", error: 'Unauthorized to view' });
      }

    const token = authHeader.split(' ')[1];
    try  {
        const decodedInfo = jwt.verify(token, process.env.JWT_SECRET)
        const profile = await User.findOne({username: decodedInfo.username})
        if(profile.role == "admin") {
            next()
        }
        else return res.status(404).json({status: "fail", message: "Unauthorized to view"});
    }
    catch {
        return res.status(404).json({status: "fail", message: "Unauthorized to view"})
    }
}