Data = require('./data')

class window.CanadianBankAccount
  # Canadian transit/branch numbers are always 5 digits:
  # http://en.wikipedia.org/wiki/Routing_transit_number#Canadian_transit_number
  defaultTransitRegex: /^[0-9]{5}$/
  defaultTransitError: "Transit number must be 5 digits long."

  constructor: ({@institution, @transit, @account}) ->

  isKnownInstitution: ->
    @data()?

  isTransitValid: ->
    if !@transit?
      isValid = false
    else if !@data().transit?.regex?
      isValid = @transit.match(@defaultTransitRegex)?
    else if _.isArray(@data().transit.regex)
      isValid = _.any @data().transit.regex, (regex) =>
        @transit.match(regex)?
    else
      isValid = @transit.match(@data().transit.regex)?
    isValid

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
    unless @isTransitValid()
      error = @data().transit?.error? || @defaultTransitError
      errors.push(error)
    errors

  data: ->
    Data[@institution]
