const express = require('express');
const app = express();

const root = require('path').join(__dirname, 'build');
app.use(express.static(root));
app.get("*", (req, res) => {
   res.sendFile('index.html', {
      root
   });
});

console.log(process.env.PORT)

const port = process.env.PORT || 5001;
app.listen(port);

console.log('App is listening on port ' + port);

