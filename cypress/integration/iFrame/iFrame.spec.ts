/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('Actor on iframe page', ()=> {
cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

})

Then("Actor click {string} and validate", (desireLink:string) =>{
    cy.frameLoaded('#courses-iframe')
    cy.iframe().find(`a[href*=${desireLink}]`).eq(0).click()
    cy.wait(600)
    cy.iframe().find('h1[class*="pricing-title"]').should('have.length',2)
    
})

Then("Actor visited w3schools", () =>{
    cy.visit("https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_text_readonly2")
        //cy.frameLoaded("#iframeResult[allowfullscreen='true']")
        cy.frameLoaded("#iframeResult")
        cy.iframe("#iframeResult").find('#myText').type('hello')
        cy.iframe("#iframeResult").find("button").contains("Try it").click()
        cy.iframe("#iframeResult").find('#myText').should('have.attr', 'readonly')
})
     
