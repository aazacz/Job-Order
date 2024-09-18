const express = require('express');
const userRoute = express();
require("dotenv")
const bcrypt = require("bcrypt")
const {generatepdf} = require ("../Controller/pdfController")

userRoute.get("/generate-pdf",generatepdf)




module.exports = {userRoute}