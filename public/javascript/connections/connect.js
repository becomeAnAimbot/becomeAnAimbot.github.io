var request = require('request');

function loginUser(username, password) {
  request.post({url : 'http://167.99.105.82:8080', form: {user:username, pass: password, func: 'loginUser'}}, function (error, response, body) {
    if(error) console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    return body;
  });
}

function loginUser(username, password) {
  request.post({url : 'http://167.99.105.82:8080', form: {user:username, pass: password, func: 'addUser'}}, function (error, response, body) {
    if(error) console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    return body;
  });
}
