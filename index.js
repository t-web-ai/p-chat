const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}...`);
});