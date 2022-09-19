const fs = require("fs");
const path = require("path");

const packageInfo = fs.readFileSync(path.join(__dirname, "../package.json"));
