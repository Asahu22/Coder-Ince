const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const Docker = require('dockerode')
const tar = require('tar-stream');
const docker = Docker() 

const createContainer = (language) => {
    let containerOptions
    if(language == 'cpp') {
        containerOptions = {
            Image: 'frolvlad/alpine-gxx:latest', 
            Tty: true,
            Cmd:  ['sh', '-c', 'g++ -o ./app/output ./app/exeFile.cpp && ./app/output < ./app/inputFile.txt'],
            StopTimeout: 5,  
            HostConfig: {
                Memory: 200000000 // 200 mb
            }
        }
    }
    else if(language == 'python') {
        containerOptions = {
            Image: 'python:latest', 
            Tty: true,
            StopTimeout: 5,  
            Cmd:  ['sh', '-c', 'python ./app/exeFile.py < ./app/inputFile.txt'],
            HostConfig: {
                Memory: 100000000 // 100 mb
            }
        }
    }
    else if(language == 'java') {
        containerOptions = {
            Image: 'amazoncorretto:17', 
            Tty: true,
            Cmd:['sh', '-c', `java ./app/exeFile.java < ./app/inputFile.txt`],
            StopTimeout: 5,  
            HostConfig: {
                Memory: 100000000 // 100 mb
            }
        }
    }
    else return null;
    return new Promise((resolve, reject) => {
        docker.createContainer(containerOptions, (err, container) => {
            if(err) {
                console.log(err.message)
                reject(err.message)
            }
            else resolve(container)
        })
    })
}


exports.saveFile = (language, code, input) => {

    const path = '.\\codes\\'

    if(!fs.existsSync(path)) {
        fs.mkdir(path, { recursive: true }, (e) => {
        if (e) {
            console.error('Error creating directory:', e);
            return null
        }
        console.log('Directory created successfully.');
        });
    }
    let filePath = path + uuidv4()
    let inputPath = path + uuidv4() + '.txt'
    if(language == 'cpp') {
        filePath += '.cpp'
    }
    else if(language == 'python') {
        filePath += '.py'
    }
    else if(language == 'java') {
        filePath += '.java'
    }
    try {
        fs.writeFileSync(filePath, code);
        fs.writeFileSync(inputPath, input);
        return {filePath, inputPath};
    }
    catch(e) {
        console.log(e.message)
        return null;
    }
}

exports.executeFile = async(exePath, language, inputPath) => {
    let exeFileName
    let execTime
    try {
        console.log(`starting to create docker container at: ${Date.now().toString()}` )
        const container = await createContainer(language)
        console.log(`Container created at: ${Date.now().toString()}` )

        const folderName = 'app';
        
        if(language == 'cpp') {
            exeFileName = 'exeFile.cpp'
        }
        else if(language == 'python') {
            exeFileName = 'exeFile.py'
        }
        else if(language == 'java') {
            exeFileName = 'exeFile.java'
        }
        else {
            return null;
        }
        const exeContent = fs.readFileSync(exePath);
        const inputContent = fs.readFileSync(inputPath)

        const pack = tar.pack();
        pack.entry({ name: `${folderName}/${exeFileName}` }, exeContent);
        pack.entry({ name: `${folderName}/inputFile.txt` }, inputContent);
        pack.finalize();

        await container.putArchive(pack, { path: "/" })
        console.log(`starting docker container at: ${Date.now().toString()}` )
        await container.start()
        console.log(`started docker container at: ${Date.now().toString()}` )
        const { StatusCode } = await container.wait();
        console.log(`docker container processes ended at: ${Date.now().toString()}` )
        const containerInfo = await container.inspect()
        execTime = new Date(containerInfo.State.FinishedAt) - new Date(containerInfo.State.StartedAt)
        return new Promise((resolve, reject) => {
            container.logs({stdout: true, stderr: false,},  (err, stream) => {
                if(err) {
                    console.log(err.message)
                    container.remove();
                    reject({
                        message: err.message,
                        code: StatusCode,
                        timeTaken: execTime
                    });
                }
                console.log("execution finished!")
                console.log("EXIT CODE:", StatusCode)
                console.log(stream.toString())
                container.remove()
                resolve({
                    message: stream !== undefined ? stream.toString() : "Error",
                    code: StatusCode,
                    timeTaken: execTime
                })
            })
        })
    }
    catch(error) {
        console.log("Error occured!")
        console.log(error.message)
        return({
            message: error.message,
            code: -1,
            timeTaken: execTime ? execTime : 0
        });
    }
}


exports.deleteFiles = async(files) => {
    try {
        files.forEach(file => fs.unlinkSync(file))
    }
    catch(error) {
        console.log(error.message)
    }
}
