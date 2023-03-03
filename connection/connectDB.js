const mongoose = require("mongoose");
//code for connecting database with server(time taking)

const databaseCONNECTION =  ()=> {
    try {
       mongoose.connect(process.env.MONGODB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        console.log("MONGODB is sucessfully connected...");
    } catch (error) {
      console.log(error);
    }
};
//exporting databaseCONNECTION
module.exports = databaseCONNECTION;