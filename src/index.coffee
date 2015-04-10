Validations = require('./validations')

class window.CanadianBankAccount
  # Canadian transit/branch numbers are always 5 digits:
  # http://en.wikipedia.org/wiki/Routing_transit_number#Canadian_transit_number
  defaultTransitRegex: /^[0-9]{5}$/
  defaultTransitError: "Transit number must be 5 digits long."

  constructor: ({@institution, @transit, @account}) ->

  hasValidations: ->
    @validations()?

  isTransitValid: ->
    @validate(@transit, @validations()?.transit?.regex ? @defaultTransitRegex)

  isAccountValid: ->
    # If we don't recognize this institution, assume validity
    return true  unless @hasValidations()
    @validate(@account, @validations()?.account?.regex)

  errors: ->
    @transitErrors().concat(@accountErrors())

  transitErrors: ->
    errors = []
    unless @isTransitValid()
      error = @validations()?.transit?.error || @defaultTransitError
      errors.push(error)
    errors

  accountErrors: ->
    errors = []
    errors.push(@validations().account.error)  unless @isAccountValid()
    errors

  validations: ->
    Validations[@institution]

  validate: (value, regex) ->
    if !value?
      false
    else if Array.isArray(regex)
      regex.some((regex) -> value.match(regex)?)
    else
      value.match(regex)?

window.CanadianBankAccount.Validations = Validations
