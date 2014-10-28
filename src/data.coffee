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
      name: "TD Canada Trust"
      regex: /^[0-9]{7}$/
      error: "TD Canada Trust account number must be 7 digits long."
