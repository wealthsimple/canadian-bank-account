Data = require('./data')

class window.CanadianBank
  constructor: ({@institution, @transit, @account}) ->

  isKnownInstitution: ->
    @data()?

  isAccountNumberValid: ->
    return false  unless @account?

    if _.isArray(@data().account.regex)
      isValid = _.any @data().account.regex, (regex) =>
        @account.match(regex)?
    else
      isValid = @account.match(@data().account.regex)?
    isValid

  errors: ->
    errors = []
    errors.push(@data().account.error)  unless @isAccountNumberValid()
    errors

  data: ->
    Data[@institution]
