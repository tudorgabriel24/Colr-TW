var ResponsePayload = function(code, payload) {
    this.code = code;
    this.payload = payload;
  }
  
  exports.respondWithCode = function(code, payload) {
    return new ResponsePayload(code, payload);
  }
  
  var writeJson = exports.writeJson = function(res, arg1, arg2) {
    var code;
    var payload;
    res.writeHead(200, {"Access-Control-Allow-Origin": "*"});
    res.end('asd');
    return;
  
    if(arg1 && arg1 instanceof ResponsePayload) {
      writeJson(response, arg1.payload, arg1.code);
      return;
    }
  
    if(arg2 && Number.isInteger(arg2)) {
      code = arg2;
    }
    else {
      if(arg1 && Number.isInteger(arg1)) {
        code = arg1;
      }
    }
    if(code && arg1) {
      payload = arg1;
    }
    else if(arg1) {
      payload = arg1;
    }
  
    if(!code) {
      // if no response code given, we default to 200
      code = 200;
    }
    if(typeof payload === 'object') {
      payload = JSON.stringify(payload, null, 2);
    }
    response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
    response.end('asd');
    return;
  }