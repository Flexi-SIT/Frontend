//Running local server on Express
const express = require("express");

//MongoDB through Mongoose
const mongoose = require("mongoose");

//Protect against cross-site scripting attacks
const cors = require("cors");
const app = express();

const VoterModel = require("./models/voter");
const AdminModel = require("./models/admin");
const electionName = require("./models/electionName");
const multer = require("multer");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Connecting to MongoDB Cloud
mongoose.connect(
  "mongodb+srv://vardh:vardh@cluster0.aggcl0r.mongodb.net/voters?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

//For first entry, creation of voterdata:
//const voter = new VoterModel({ email: "vardh@gmail", password: "2133414" })
//VoterModel.insertMany(voter, function (error, docs) { });

const upload = multer({ dest: "uploads/" });

app.post(
  "/voter",
  upload.fields([{ name: "idFrontImage" }, { name: "idBackImage" }]),
  (req, res) => {
    const voter = new VoterModel({
      email: req.body.email,
      password: req.body.password,
      idFrontImage: req.files["idFrontImage"][0].path,
      idBackImage: req.files["idBackImage"][0].path,
    });

    voter
      .save()
      .then(() => {
        res.status(200).json({ message: "Login successful" });
        console.log("Success");
        res.redirect("http://localhost:3000/voting");
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

app.post("/admin", async (req, res) => {
  const user = await AdminModel.findOne({ email: req.body.email });
  console.log(req.body.email);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  if (user.password !== req.body.password) {
    return res.status(401).send({ message: "Incorrect password" });
  }
  res.status(200).json({ message: "Login successful" });
});

//Get election List to map
app.get("/api/electionName", function (req, res) {
  var electionNames = [];
  var electionOrganizers = [];
  var electionIds = [];
  var final = [];
  electionName.find({}).then((eachOne) => {
    for (i = 0; i < eachOne.length; i++) {
      electionNames[i] = eachOne[i].election_name;
      electionOrganizers[i] = eachOne[i].election_organizer;
      electionIds[i] = eachOne[i].election_id;
      final.push({
        election_id: eachOne[i].election_id,
        election_organizer: eachOne[i].election_organizer,
        election_name: eachOne[i].election_name,
      });
    }
    res.send(final);
  });
});

//Create new election
app.post("/api/electionName", async function (req, res) {
  electionName
    .create({
      election_id: Math.floor(Math.random() * 100),
      election_name: req.body.election_name,
      election_organizer: req.body.election_organizer,
      election_password: req.body.election_password,
    })
    .then((election) => {
      res.json(election);
    });
});

//Server running on port 3001
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
