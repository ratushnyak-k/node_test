'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var getFilePath = function getFilePath() {
  return _path2.default.join(__dirname, 'data') + '.json';
};

var fileParse = function fileParse() {
  return JSON.parse(_fs2.default.readFileSync('data.json', { encoding: 'utf-8' }));
};

var updateFile = function updateFile(data) {
  _fs2.default.writeFileSync('data.json', JSON.stringify(data, null, 2), { encoding: 'utf-8' });
};

router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', function (req, res, next) {
  try {
    var data = fileParse();
    var requestData = req.body;

    requestData.email = requestData.email.toLowerCase().trim();

    var checkUserEmailExist = data.users.filter(function (user) {
      return user.email === requestData.email;
    });

    if (checkUserEmailExist.length) {
      res.status(400);
      res.send('This email already exist');
    } else {
      data.users.push(requestData);
      updateFile(data);
    }
    res.end();
  } catch (err) {
    console.log(err);
  }
});

exports.default = router;