module.exports =
  "001":
    account:
      regex: /^[0-9]{7}$/
      error: "Bank of Montreal account number must be 7 digits long."
  "002":
    account:
      regex: [/^[0-9]{7}$/, /^[0-9]{12}$/]
      error: "Scotiabank account number must be either 7 or 12 digits long."
  "003":
    account:
      regex: /^[0-9]{7}$/
      error: "Royal Bank of Canada account number must be 7 digits long."
  "004":
    account:
      regex: /^[0-9]{7}$/
      error: "TD Canada Trust account number must be 7 digits long."
  "006":
    account:
      regex: /^[0-9]{7}$/
      error: "National Bank of Canada account number must be 7 digits long."
  "010":
    account:
      regex: /^[0-9]{7}$/
      error: "Canadian Imperial Bank of Commerce account number must be 7 digits long."
  "016":
    account:
      regex: /^[0-9]{9}$/
      error: "HSBC Bank of Canada account number must be 9 digits long."
  "614":
    account:
      regex: /^[0-9]{10}$/
      error: "Tangerine account number must be 10 digits long."
  "815":
    account:
      regex: /^[0-9]{7}$/
      error: "Desjardins account number must be 7 digits long. The last digit on your cheque, the verification digit, is part of your 7 digit account number."
  "828":
    transit:
      regex: /^10[0-9]{3}$/
      error: "Central 1 transit number must begin with 10XXX."
    account:
      regex: /^[0-9]{5,12}$/
      error: "Central 1 account number must be 5 to 12 digits long. This account number appears on your cheque after the institution number (828)."
