import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("Actor click on Open Tab", () => {
//Cypress not allow to move to different domain from parent domain due to security reason
//cross domain is not support directly by Cypress, to support it they come up with cy.origin(   )

    cy.get('#opentab').then(function (el) {
        const url = el.prop('href')
        cy.visit(url)
        //cy.get("div.sub-menu-bar a[href*='about").dblclick() // this is not going to work as it is switching domain, use below way
        cy.origin(url, () =>{
            cy.get("div.sub-menu-bar a[href*='about").click()
        })
    })


})

When("Actor click on Open Window", () => {
    cy.visit(Cypress.env('url') + "/" + "AutomationPractice" + "/")
    
    const newURL = 'https://www.qaclickacademy.com/'
    cy.window().then( (win) =>{
        cy.stub(win, 'open', url => {
            win.location.href = newURL;
        })
        cy.get('#openwindow').click()
        
        cy.origin(newURL, () =>{
            cy.get("div.sub-menu-bar a[href*='about").click()
        })  
        
    })

})
