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
    @validate(@transit, @data().transit?.regex ? @defaultTransitRegex)

  isAccountValid: ->
    @validate(@account, @data().account.regex)

  errors: ->
    @transitErrors().concat(@accountErrors())

  transitErrors: ->
    errors = []
    unless @isTransitValid()
      error = @data().transit?.error? || @defaultTransitError
      errors.push(error)
    errors

  accountErrors: ->
    errors = []
    errors.push(@data().account.error)  unless @isAccountValid()
    errors

  data: ->
    Data[@institution]

  validate: (value, regex) ->
    if !value? || !regex?
      false
    else if _.isArray(regex)
      _.any(regex, (regex) -> value.match(regex)?)
    else
      value.match(regex)?
