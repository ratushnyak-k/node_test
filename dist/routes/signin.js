'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var fileParse = function fileParse() {
  return JSON.parse(_fs2.default.readFileSync('data.json', { encoding: 'utf-8' }));
};

router.post('/', function (req, res, next) {
  var data = fileParse();
  console.log(req.query);
  var checkOnExistingEmail = Object.keys(data.users).filter(function (user) {
    return data.users[user].email === req.query.email.toLowerCase().trim();
  });
  if (checkOnExistingEmail.length) {
    if (data.users[checkOnExistingEmail[0]].password === req.query.password) {
      res.send(data.users[checkOnExistingEmail[0]]);
    } else {
      res.status(400);
      res.send({
        email: ['Incorrect email or password'],
        password: ['Incorrect email or password']
      });
    }
  } else {
    res.status(404);
    res.send({ email: ['There\'s no users registered with this email'] });
  }
  res.end();
});

exports.default = router;