const User = require('../models/userModel')

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-email -password -_id -__v');
        return res.status(200).json(users)
    }
    catch (e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail"
        })
    }

}

exports.getUserProfile = async (req, res, next) => {
    const username = req.params.uname
    try {
        const user = await User.findOne({ username: username })
            .select('-email -password -_id -__v')
            .populate({ path: 'problemsSolved', select: 'name', model: 'Problem' })

        if (!user || user.length == 0) {
            return res.status(404).json({
                result: "fail",
                message: "user does not exist"
            })
        }
        return res.status(200).json(user)
    }
    catch (e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail"
        })
    }
}

exports.updateUserProfile = async (req, res, next) => {
    const username = req.params.uname;
    const params = req.body;
    if (params.role != undefined) delete params.role
    if (params._id != undefined) delete params._id
    if (params.numberOfSolves != undefined) delete params.numberOfSolves
    if (params.numbeOfSubmissions != undefined) delete params.numbeOfSubmissions
    try {
        const user = await User.findOneAndUpdate({ username: username }, params, { new: true })
        if (!user) {
            return res.status(404).json({
                result: "fail",
                message: "user does not exist"
            })
        }
        return res.status(200).json({
            result: "success",
            message: "user data updated successfully"
        })
    }
    catch (e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail"
        })
    }
}

exports.deleteUser = async (req, res, next) => {
    const username = req.params.uname;
    try {
        const user = await User.findOneAndDelete({ username: username })
        if (!user) {
            return res.status(404).json({
                result: "fail",
                message: "User not found"
            })
        }
        req.user = null;
        return res.status(200).json({
            result: "success",
            message: "User successfully deleted"
        })

    }
    catch (e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail"
        })
    }
}
