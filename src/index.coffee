Data = require('./data')

class window.CanadianBank
  constructor: ({@institution, @transit, @account}) ->

  isKnownInstitution: ->
    @data()?

  isAccountValid: ->
    if !@account?
      isValid = false
    else if _.isArray(@data().account.regex)
      isValid = _.any @data().account.regex, (regex) =>
        @account.match(regex)?
    else
      isValid = @account.match(@data().account.regex)?
    isValid

  errors: ->
    errors = []
    errors.push(@data().account.error)  unless @isAccountValid()
    errors

  data: ->
    Data[@institution]
