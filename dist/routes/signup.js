'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _uuidV = require('uuid-v4');

var _uuidV2 = _interopRequireDefault(_uuidV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var fileParse = function fileParse() {
  return JSON.parse(_fs2.default.readFileSync('data.json', { encoding: 'utf-8' }));
};

var updateFile = function updateFile(data) {
  _fs2.default.writeFileSync('data.json', JSON.stringify(data, null, 2), { encoding: 'utf-8' });
};

router.post('/', function (req, res, next) {
  try {
    var data = fileParse();
    var requestData = req.body;

    requestData.email = requestData.email.toLowerCase().trim();

    var checkUserEmailExist = Object.keys(data.users).filter(function (user) {
      return data.users[user].email === requestData.email;
    });

    if (checkUserEmailExist.length) {
      res.status(400);
      res.send({
        errors: {
          email: 'This email already exist'
        }
      });
    } else {
      requestData.id = (0, _uuidV2.default)();
      data.users[requestData.id] = requestData;
      updateFile(data);
      res.send(requestData);
    }
    res.end();
  } catch (err) {
    console.log(err);
  }
});

exports.default = router;