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

router.get('/:id', function (req, res, next) {
  var data = fileParse();
  if (data.users[req.params.id]) {
    res.send(data.users[req.params.id]);
  } else {
    res.send({ message: 'Not found' });
    res.status(404);
  }
  res.end();
});

exports.default = router;