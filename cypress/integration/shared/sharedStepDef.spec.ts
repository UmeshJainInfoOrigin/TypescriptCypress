//Author: InfoOrigin
//Created On:- 31-Mar-2023
//Purpose:- This will execute before any scenario in all feature files and 
//          fetch the data of fixture JSON into global variable 'this'
before(() => {
    cy.fixture('example').then(function (data) {
        this.data = data
        console.log('common  before')
    })
});

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
Given('Actor open ECommerce Page', ()=> {
    console.log('Given-I open ECommerce Page')
    cy.visit(Cypress.env('url') + "/angularpractice/")
})

Given("Actor on {string} page", (subPage:string) => {
    cy.log(subPage)
    cy.visit(Cypress.env('url') + "/" + subPage + "/")

})

