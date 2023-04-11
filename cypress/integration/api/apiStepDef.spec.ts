/// <reference types="Cypress" />
import apiGetData from '../../fixtures/library/apiGet.json'
import statusCodes from '../../fixtures/library/httpResponseCode.json'

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const fixtureCommonJson = function () {
   console.log('fixtureCommonJson')
        cy.fixture('Library/apiGet').then(function (apiGetData) {
            this.apiGetData = apiGetData
            console.log("response", this.apiGetData);
        })
        cy.request('GET', Cypress.env('apiGet')).then(function (response) {
            expect(response.body[0], 'response body').to.include(
                this.apiGetData)
                
            expect(response.status).to.eq(statusCodes.allStatusCode.statusCodeOK)
        })
      }
      
 Given('Actor calls Library API for posting data', function() {
     console.log('Actor calls Library API for posting data')
             let r = (Math.random() + 1).toString(36).substring(7);
        cy.fixture('Library/apiPost').then(function (apiPostData) {
            this.apiPostData = apiPostData
            this.apiPostData.isbn = r
            console.log("payload", this.apiPostData);
        })
 })

 When('Agreed Payload is passed in JSON', function(){
    console.log('Agreed')
      cy.request('POST', Cypress.env('apiPost'), this.apiPostData).then(function (response) {
      console.log('response.body', response.body)
      expect(response.body).to.have.property('Msg','successfully added')
      expect(response.status).to.eq(200)
        })
 })

 Then('Actor receives book added successfully', function() {
    console.log('Actor')
    //fixtureCommonJson()
 })

 Given ('Actor calls Library API with payload', function(){
    console.log('Actor calls Library API with payload')
    cy.fixture('Library/apiGet').then(function (apiGetData) {
    this.apiGetData = apiGetData
    console.log("response", this.apiGetData);
})
})

Given ('Actor calls Library API and read using AS keyword', function(){
    console.log('Actor calls Library API and read using AS keyword')
    cy.fixture('Library/apiGet').as('apiGetData')
})

 
 Then('Actor validate response using httpResponseCode json', function() {
        cy.request('GET', Cypress.env('apiGet')).then(function (response) {
         console.log('fetched response from api', response)
            expect(response.body[0], 'response body').to.include(
                this.apiGetData)
                
            expect(response.status).to.eq(statusCodes.allStatusCode.statusCodeOK)
            console.log('end..')
        })

 })

 Then('Actor validate response using env variable', function() {
    cy.request('GET', Cypress.env('apiGet')).then(function (response) {
     console.log('fetched response from api', response)
        expect(response.body[0], 'response body').to.include(
            this.apiGetData)
            
        expect(response.status).to.eq(Cypress.env('allcode').statusCodeSuccessA)
        console.log('end..')
    })

})
