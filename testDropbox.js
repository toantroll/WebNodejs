var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: 'ZwntRX71GSAAAAAAAAAAN3rLNlJZHhqxYw9g-vLS5U93cZQ5O5fxwHlgb_OeZyj-' });
dbx.filesListFolder({path: ''})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  })
