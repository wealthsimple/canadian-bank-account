(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Data;

Data = require('./data');

window.CanadianBank = (function() {
  function CanadianBank(_arg) {
    this.institution = _arg.institution, this.transit = _arg.transit, this.account = _arg.account;
  }

  CanadianBank.prototype.isKnownInstitution = function() {
    return this.data() != null;
  };

  CanadianBank.prototype.isAccountNumberValid = function() {
    var isValid;
    if (this.account == null) {
      return false;
    }
    if (_.isArray(this.data().account.regex)) {
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

  CanadianBank.prototype.errors = function() {
    var errors;
    errors = [];
    if (!this.isAccountNumberValid()) {
      errors.push(this.data().account.error);
    }
    return errors;
  };

  CanadianBank.prototype.data = function() {
    return Data[this.institution];
  };

  return CanadianBank;

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
      name: "TD Canada Trust",
      regex: /^[0-9]{7}$/,
      error: "TD Canada Trust account number must be 7 digits long."
    }
  }
};



},{}]},{},[1]);
