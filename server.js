const express = require("express");
const path = require("path");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.resolve(__dirname, "build")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(port, (err) => {
    if (err) throw err;
});
