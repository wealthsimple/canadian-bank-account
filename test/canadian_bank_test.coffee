describe "CanadianBank", ->
  factory = (attributes = {}) ->
    new CanadianBank({
      institution: attributes.institution ? "001"
      transit: attributes.transit ? "12345"
      account: attributes.account ? "1234567"
    })

  describe "#isKnownInstitution", ->
    context "institution is known", ->
      it "returns true", ->
        expect(factory().isKnownInstitution()).toBe(true)

    context "institution is unknown", ->
      it "returns false", ->
        expect(factory(institution: "789").isKnownInstitution()).toBe(false)

  describe "#isAccountNumberValid", ->
    context "with a Scotiabank account", ->
      it "returns true for valid account numbers", ->
        expect(factory(institution: "002", account: "1234567").isAccountNumberValid()).toBe(true)
        expect(factory(institution: "002", account: "123456789123").isAccountNumberValid()).toBe(true)

      it "returns false for invalid account numbers", ->
        expect(factory(institution: "002", account: "").isAccountNumberValid()).toBe(false)
        expect(factory(institution: "002", account: "123").isAccountNumberValid()).toBe(false)
        expect(factory(institution: "002", account: "12345678").isAccountNumberValid()).toBe(false)

    context "with a BMO account", ->
      it "returns true for valid account number", ->
        expect(factory(institution: "001", account: "1234567").isAccountNumberValid()).toBe(true)

      it "returns false for invalid account number", ->
        expect(factory(institution: "001", account: "").isAccountNumberValid()).toBe(false)
        expect(factory(institution: "001", account: "123").isAccountNumberValid()).toBe(false)
        expect(factory(institution: "001", account: "12345678").isAccountNumberValid()).toBe(false)

  describe "#errors", ->
    context "all provided numbers are valid", ->
      it "returns an empty array", ->
        expect(factory().errors()).toEqual([])

    context "account number is invalid", ->
      it "returns the right error", ->
        expect(factory(account: "123").errors()).toEqual(["Bank of Montreal account number must be 7 digits long."])
