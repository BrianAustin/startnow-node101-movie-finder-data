//importing express app
const server = require('./app');
//telling the app to listen for network requests on port 3000
server.listen(3000, function() {
  console.log('Server is listening on http://localhost:3000');
});
