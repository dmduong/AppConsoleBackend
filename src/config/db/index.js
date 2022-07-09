// Using Node.js `require()`
const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Kết nối thành công với database');
    } catch (error) {
        console.log('Không kết nối được với database');
    }
}

module.exports = { connect };