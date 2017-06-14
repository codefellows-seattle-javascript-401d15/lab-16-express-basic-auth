'use strict';

const server = require('../../server.js');
const serverCtrl = module.exports = {};

serverCtrl.start = function(done){
  if(!server.isRunning){
    server.listen(process.env.PORT, () => {
      server.isRunning = true;
      console.log('Server is running at: ', process.env.PORT);
      done();
    });
    return;
  }
  done();
};

serverCtrl.close = function(done){
  if(server.isRunning){
    server.close(() => {
      server.isRunning = false;
      console.log('Server went to sleep');
      done();
    });
    return;
  }
  done();
};
