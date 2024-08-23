var liveServer = require("live-server");

var params = {
  port: 3333,
  host: "0.0.0.0",
  root: "./htmls",
  open: false,
  file: "index.html",
};

liveServer.start(params);
