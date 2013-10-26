var request = require('superagent');
var expect = require('expect.js');
  
describe('Suite one', function(){
 it (function(done){
   request.get('localhost:8888').end(function(res){
    expect(res).to.exist;
    expect(res.status).to.equal(200);
    expect(res.body).to.contain('world');
    done();
   });
  });
});