// Using Node.js `require()`
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URL,  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
    console.log("Kết nối thành công với database");
  } catch (error) {
    console.log(error);
    console.log("Không kết nối được với database");
  }
}

module.exports = { connect };
