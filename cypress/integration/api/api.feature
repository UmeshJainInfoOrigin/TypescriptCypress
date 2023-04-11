Feature: API Post, Get call PoC
    This code is written to perform PoC of API calls using open API

    @Regression
    Scenario: Post call with open API
    Given Actor calls Library API for posting data
    When Agreed Payload is passed in JSON
    Then Actor receives book added successfully

    @Regression
    Scenario: Get call using fixture and httpResponseCode json
    Given Actor calls Library API with payload
    Then Actor validate response using httpResponseCode json

    @Regression
    Scenario: Get call using fixture and env
    Given Actor calls Library API with payload
    Then Actor validate response using env variable

    @Regression
    Scenario: Get call using Fixture AS keyword
    Given Actor calls Library API and read using AS keyword
    Then Actor validate response using env variable