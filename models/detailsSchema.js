const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
    {
        name: String,
        contactDetails: Number,
        address: String,
        pincode: Number
    },
    {timestamps: true}
);

const formModel = mongoose.model("Patientdetail", formSchema);
module.exports = formModel;