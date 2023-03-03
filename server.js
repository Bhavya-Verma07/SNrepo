const express = require("express");
const app = express();
app.use(express.json());
const DETAIL_MODEL = require("./models/detailsSchema");
const databaseCONNECTION = require("./connection/connectDB");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

//posting details

app.post("/api/savedetails", async (req, res) => {
  try {
    const { name, contactDetails, address, pincode } = req.body;
    const newDetails = new DETAIL_MODEL({
      name,
      contactDetails,
      address,
      pincode,
    });
    await newDetails.save();
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false });
  }
});

//gettimg details
app.get("/api/gettingDetails", async (req, res) => {
  try {
    const getDetail = await DETAIL_MODEL.find({}).sort({ createdAt: -1 });
    return res.json({ data: getDetail, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

//deleting details
app.delete("/api/deleteDetails/:id", async (req, res) => {
  try {
    const deleteDetails = await DETAIL_MODEL.findOneAndDelete({
      _id: req.params.id,
    });
    return res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

//U-updating data
app.put("/api/updateDetails/:id", async (req, res) => {
  try {
    const Patientupdate = await DETAIL_MODEL.findOneAndUpdate({_id:req.params.id},{
      name: req.body.name,
      contactDetails: req.body.contactDetails,
      address: req.body.address,
      pincode: req.body.pincode,
    });
    res.json({ success: true, Patientupdate });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/client/build/index.html"),
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
  });
}


databaseCONNECTION();

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
