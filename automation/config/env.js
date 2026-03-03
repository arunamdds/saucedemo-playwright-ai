module.exports = {
    baseUrl: 'https://www.saucedemo.com/',
    credentials:{
        standardUser:{
            username: process.env.SAUCE_USER || 'standard_user',
            password: process.env.SAUCE_PASSWORD || 'secret_sauce',
        },
        invalidUser: {
            username: 'invalid_user',
            password: 'wrong_password'
        }
    }
};