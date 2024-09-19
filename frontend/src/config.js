module.exports  ={
    SERVER_BASE_URL: process.env.REACT_APP_SERVER_BASE_URL,
    USERNAME_REGEX: /^[A-Za-z0-9_-]{4,20}$/ ,
    PWD_REGEX : /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(){}|`~<>?,./;':"_+-=]).{8,24}$/ ,
    LANGUAGE_OPTIONS: [
        { value: 'cpp', label: 'C++' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
    ]
}