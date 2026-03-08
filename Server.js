const express = require("express");
const jsforce = require("jsforce");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const conn = new jsforce.Connection({
  loginUrl: "https://login.salesforce.com"
});

async function connectSalesforce() {
  try {

    await conn.login(
      "ahamed.thaiyuba123@hcltech.com",
      "6327593AAt#!pnIL22V2IrtAxl5gvMrzgaQr2"
    );

    console.log("Connected to Salesforce!");

  } catch (err) {
    console.error("Login Error:", err);
  }
}

connectSalesforce();


// GET Candidates
app.get("/candidates", async (req, res) => {

  try {

    const result = await conn.sobject("Candidate__c").find({});

    res.json(result);

  } catch (err) {
    res.send(err);
  }

});

//get positions
app.get("/positions", async (req, res) => {

  try {

    const result = await conn.sobject("Position__c").find({});

    res.json(result);

  } catch (err) {
    res.send(err);
  }

});



// CREATE Candidate
app.post("/candidate", async (req, res) => {

  const result = await conn.sobject("Candidate__c").create(req.body);

  res.json(result);

});


// DELETE Candidate
app.delete("/candidate/:id", async (req, res) => {

  const result = await conn.sobject("Candidate__c").destroy(req.params.id);

  res.json(result);

});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});