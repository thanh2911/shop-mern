require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {
    try {
        const URI = process.env.MONGOOSE_URI
        await mongoose.connect(URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect moggoose sucess =>>>>> -_-');
    } catch (error) {
        console.log('connect moggoose error =>>>>> -*-');
    }
}

module.exports = {connect}