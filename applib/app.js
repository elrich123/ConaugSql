var logger = require("./logger").LoggerModel;
var constant = require("./constant");
var uuid = require("node-uuid");
var request = require("request");
var mailer = require("./nodemail").MailModel;

function UUID() {}

UUID.prototype.GetTimeBasedID = () => {
  return uuid.v1({
    node: [
      0x01,
      0x08,
      0x12,
      0x18,
      0x23,
      0x30,
      0x38,
      0x45,
      0x50,
      0x55,
      0x62,
      0x67,
      0x89,
      0xab,
    ],
    clockseq: 0x1234,
  });
};

exports.SendHttpResponse = function (functionContext, response) {
  let httpResponseType = constant.ErrorCode.Success;
  functionContext.res.writeHead(httpResponseType, {
    "Content-Type": "application/json",
  });
  functionContext.responseText = JSON.stringify(response);
  functionContext.res.end(functionContext.responseText);
};

module.exports.Logger = logger;
module.exports.UUID = UUID;