'use strict';

const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

const _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

const _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

const _express = _interopRequireDefault(require('express'));

const _jsonwebtoken = _interopRequireDefault(require('jsonwebtoken'));

const _ToBaseConnect = _interopRequireDefault(require('../../helpers/ToBaseConnect'));

const _keys = _interopRequireDefault(require('../../config/keys'));

const router = _express['default'].Router();

const collection = (0, _ToBaseConnect['default'])('test', 'viround_customers');
router.post(
  '/',
  /*#__PURE__*/
  (function() {
    const _ref = (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee(req, res) {
        let body, phoneCode, phoneNumber, password, compareLogin, payload;
        return _regenerator['default'].wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                body = req.body;
                (phoneCode = body.phone_code), (phoneNumber = body.phone_number), (password = body.password);
                _context.next = 4;
                return collection.findOne({
                  phone_code: phoneCode,
                  phone_number: phoneNumber,
                });

              case 4:
                compareLogin = _context.sent;

                if (compareLogin) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt(
                  'return',
                  res.status(404).json({
                    error: 'phone not found',
                  })
                );

              case 7:
                if (!(compareLogin.password === password)) {
                  _context.next = 12;
                  break;
                }

                payload = {
                  role: compareLogin.phone_code + compareLogin.phone_number,
                };

                _jsonwebtoken['default'].sign(
                  payload,
                  _keys['default'].secretOrKey,
                  {
                    expiresIn: 3600,
                  },
                  function(err, token) {
                    collection.updateOne(
                      {
                        password: password,
                      },
                      {
                        $set: {
                          token: token,
                        },
                      }
                    );
                    res.json({
                      error: false,
                      token: 'Bearer  ' + token,
                    });
                  }
                );

                _context.next = 13;
                break;

              case 12:
                return _context.abrupt(
                  'return',
                  res.status(404).json({
                    errors: 'Error password is incorrect',
                  })
                );

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      })
    );

    return function(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })()
);
module.exports = router;
