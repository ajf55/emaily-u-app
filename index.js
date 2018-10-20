// import express using syntax that works with node.js
const express = require("express");
require('./services/passport');
const app = express();
// https://console.developers.google.com
require('./routes/authRoutes')(app);
// look at underlying environment and see if there is a port declared
// for "|| 5000" it means that if there isn't a dynamically assigned port form cloud application, default 5000 ; eg dev environment
const PORT = process.env.PORT || 5000;
// labeling the port - manual test with http://localhost:5000/
app.listen(PORT);
