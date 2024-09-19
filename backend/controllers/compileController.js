const fileHandlers = require('../filehandlers/fileHandlers')
const { CODE_COMPILATION_FAILED,
    CODE_TC_FAILED,
    CODE_TC_PASSED,
    CODE_SERVER_ERROR } = require('../config/config')

exports.executeCode = async (req, res, next) => {
    let files
    try {
        const { language, code, input } = req.body;

        if (language != 'cpp' && language != 'java' && language != 'python') {

            if (req.body.isSubmission == true) {
                return CODE_SERVER_ERROR;
            }

            return res.status(404).json({
                status: "fail",
                error: "invalid language"
            })
        }

        const result = fileHandlers.saveFile(language, code, input)
        if (result == undefined) {
            if (req.body.isSubmission == true) {
                return CODE_SERVER_ERROR;
            }

            return res.status(404).json({
                status: "fail",
                error: "failed while saving file"
            })
        }
        console.log("Compiling")
        const output = await fileHandlers.executeFile(result.filePath, language, result.inputPath);

        files = [result.inputPath, result.filePath]
        fileHandlers.deleteFiles(files);

        if (req.body.isSubmission) {

            if (output.code !== 0) {
                return ({
                    code: CODE_COMPILATION_FAILED,
                    timeTaken: output.timeTaken })
            }
            const userOutput = output.message.replace(/\s/g, '');
            const requiredOutput = req.body.output.replace(/\s/g, '');

            if (userOutput.localeCompare(requiredOutput) === 0) {
                return ({
                    code: CODE_TC_PASSED,
                    timeTaken: output.timeTaken });
            }
            else {
                return ({
                    code: CODE_TC_FAILED,
                    timeTaken: output.timeTaken });
            }
        }
        return res.status(200).json({
            status: "success",
            result: output
        });
    }
    catch (error) {
        console.log(error)
        fileHandlers.deleteFiles(files);
        if (req.body.isSubmission) {
            return CODE_COMPILATION_FAILED;
        }
        return res.status(200).json({
            status: "success",
            error: "compilation error",
            message: error.message
        });
    }
}

