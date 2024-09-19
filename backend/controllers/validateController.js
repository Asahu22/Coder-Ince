const jwt = require('jsonwebtoken')

exports.validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(200).json({ valid: false });
        }

        const token = authHeader.split(' ')[1];
        try {
            const decodedInfo = jwt.verify(token, process.env.JWT_SECRET)
            return res.status(200).json({ valid: true, role: decodedInfo.role });
        }
        catch (error) {
            console.log(error.message)
            return res.status(200).json({ valid: false })
        }
    }
    catch (error) {
        console.log(error.message)
        return res.status(404).json({ message: "Something went wrong" })

    }
}