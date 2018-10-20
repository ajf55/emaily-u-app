// import express using syntax that works with node.js
const express = require('express');
// creating the app function for the generic route handlers
const app = express();

// creating the route handlers
app.get('/', (req, res)=> {
  res.send({hi: 'there'})
});


// look at underlying environment and see if there is a port declared
// for "|| 5000" it means that if there isn't a dynamically assigned port form cloud application, default 5000
const PORT = process.env.PORT || 5000;
// labeling the port - manual test with http://localhost:5000/
app.listen(5000);
