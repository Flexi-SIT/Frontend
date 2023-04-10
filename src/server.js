const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const VoterModel = require('./models/voter')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect("mongodb+srv://vardh:vardh@cluster0.aggcl0r.mongodb.net/voters?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});
//const voter = new VoterModel({ email: "vardh@gmail", password: "2133414" })
//VoterModel.insertMany(voter, function (error, docs) { });



app.post('/voter', (req, res) => {

    const email = req.body.email
    const pass = req.body.pass;
    const voter = new VoterModel({ email: req.body.email, password: req.body.pass })
    // console.log(req.body)
    // console.log(req.body.email);


    //const voter = new VoterModel(req.body);
    voter.save().then(() => {
        console.log("Success");
        res.redirect("http://localhost:3000/voting")
    }).catch((err) => {
        console.log(err);
    })
});

app.listen(3001, () => {
    console.log("Server running on port 3001")
});