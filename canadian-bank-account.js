(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Data;

Data = require('./data');

window.CanadianBankAccount = (function() {
  CanadianBankAccount.prototype.defaultTransitRegex = /^[0-9]{5}$/;

  CanadianBankAccount.prototype.defaultTransitError = "Transit number must be 5 digits long.";

  function CanadianBankAccount(_arg) {
    this.institution = _arg.institution, this.transit = _arg.transit, this.account = _arg.account;
  }

  CanadianBankAccount.prototype.isKnownInstitution = function() {
    return this.data() != null;
  };

  CanadianBankAccount.prototype.isTransitValid = function() {
    var isValid, _ref;
    if (this.transit == null) {
      isValid = false;
    } else if (((_ref = this.data().transit) != null ? _ref.regex : void 0) == null) {
      isValid = this.transit.match(this.defaultTransitRegex) != null;
    } else if (_.isArray(this.data().transit.regex)) {
      isValid = _.any(this.data().transit.regex, (function(_this) {
        return function(regex) {
          return _this.transit.match(regex) != null;
        };
      })(this));
    } else {
      isValid = this.transit.match(this.data().transit.regex) != null;
    }
    return isValid;
  };

  CanadianBankAccount.prototype.isAccountValid = function() {
    var isValid;
    if (this.account == null) {
      isValid = false;
    } else if (_.isArray(this.data().account.regex)) {
      isValid = _.any(this.data().account.regex, (function(_this) {
        return function(regex) {
          return _this.account.match(regex) != null;
        };
      })(this));
    } else {
      isValid = this.account.match(this.data().account.regex) != null;
    }
    return isValid;
  };

  CanadianBankAccount.prototype.errors = function() {
    var error, errors, _ref;
    errors = [];
    if (!this.isAccountValid()) {
      errors.push(this.data().account.error);
    }
    if (!this.isTransitValid()) {
      error = (((_ref = this.data().transit) != null ? _ref.error : void 0) != null) || this.defaultTransitError;
      errors.push(error);
    }
    return errors;
  };

  CanadianBankAccount.prototype.data = function() {
    return Data[this.institution];
  };

  return CanadianBankAccount;

})();



},{"./data":2}],2:[function(require,module,exports){
module.exports = {
  "001": {
    account: {
      regex: /^[0-9]{7}$/,
      error: "Bank of Montreal account number must be 7 digits long."
    }
  },
  "002": {
    account: {
      regex: [/^[0-9]{7}$/, /^[0-9]{12}$/],
      error: "Scotiabank account number must be either 7 or 12 digits long."
    }
  },
  "003": {
    account: {
      regex: /^[0-9]{7}$/,
      error: "Royal Bank of Canada account number must be 7 digits long."
    }
  },
  "004": {
    account: {
      regex: /^[0-9]{7}$/,
      error: "TD Canada Trust account number must be 7 digits long."
    }
  },
  "006": {
    account: {
      regex: /^[0-9]{7}$/,
      error: "National Bank of Canada account number must be 7 digits long."
    }
  },
  "010": {
    account: {
      regex: /^[0-9]{7}$/,
      error: "Canadian Imperial Bank of Commerce account number must be 7 digits long."
    }
  },
  "016": {
    account: {
      regex: /^[0-9]{9}$/,
      error: "HSBC Bank of Canada account number must be 9 digits long."
    }
  },
  "614": {
    account: {
      regex: /^[0-9]{10}$/,
      error: "Tangerine account number must be 10 digits long."
    }
  },
  "815": {
    account: {
      regex: /^[0-9]{7}$/,
      error: "Desjardins account number must be 7 digits long. The last digit on your cheque, the verification digit, is part of your 7 digit account number."
    }
  },
  "828": {
    transit: {
      regex: /^10[0-9]{3}$/,
      error: "Central 1 transit number must begin with 10XXX."
    },
    account: {
      regex: /^[0-9]{5,12}$/,
      error: "Central 1 account number must be 5 to 12 digits long. This account number appears on your cheque after the institution number (828)."
    }
  }
};



},{}]},{},[1]);
