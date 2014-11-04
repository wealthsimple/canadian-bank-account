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
    var _ref, _ref1, _ref2;
    return this.validate(this.transit, (_ref = (_ref1 = this.data()) != null ? (_ref2 = _ref1.transit) != null ? _ref2.regex : void 0 : void 0) != null ? _ref : this.defaultTransitRegex);
  };

  CanadianBankAccount.prototype.isAccountValid = function() {
    var _ref, _ref1;
    if (!this.isKnownInstitution()) {
      return true;
    }
    return this.validate(this.account, (_ref = this.data()) != null ? (_ref1 = _ref.account) != null ? _ref1.regex : void 0 : void 0);
  };

  CanadianBankAccount.prototype.errors = function() {
    return this.transitErrors().concat(this.accountErrors());
  };

  CanadianBankAccount.prototype.transitErrors = function() {
    var error, errors, _ref, _ref1;
    errors = [];
    if (!this.isTransitValid()) {
      error = ((_ref = this.data()) != null ? (_ref1 = _ref.transit) != null ? _ref1.error : void 0 : void 0) || this.defaultTransitError;
      errors.push(error);
    }
    return errors;
  };

  CanadianBankAccount.prototype.accountErrors = function() {
    var errors;
    errors = [];
    if (!this.isAccountValid()) {
      errors.push(this.data().account.error);
    }
    return errors;
  };

  CanadianBankAccount.prototype.data = function() {
    return Data[this.institution];
  };

  CanadianBankAccount.prototype.validate = function(value, regex) {
    if (value == null) {
      return false;
    } else if (_.isArray(regex)) {
      return _.any(regex, function(regex) {
        return value.match(regex) != null;
      });
    } else {
      return value.match(regex) != null;
    }
  };

  return CanadianBankAccount;

})();

window.CanadianBankAccount.Data = Data;



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
