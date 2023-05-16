import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

Given('User logged in', () =>{
    Cypress.config('pageLoadTimeout', 200000)
    Cypress.config('defaultCommandTimeout', 200000)

    let url = 'http://ec2-54-83-178-43.compute-1.amazonaws.com:8080/index.html'
    cy.visit(url)
    cy.get('.login_icon').click()
    cy.get('#userId').type('umesh.jain@infoorigin.com')
    cy.get('#Password').type('GondiaRice@441601')
    cy.get('.sc-dUjcNx').click()
    cy.wait(80000)

})
//When Actor 'Education' from 'Master' Menu
When("Actor {string} from {string} Menu", (subMenu:string, mainMenu:string) => {
    cy.log('Submenu and MainMenu', subMenu, mainMenu)
    console.log('Submenu and MainMenu', subMenu, mainMenu)
    cy.contains(mainMenu).click()
    cy.wait(3000)
    cy.get(`[name="${subMenu}"]`).click()
    cy.wait(6000)
})
//And Actor Add 'Comp Science' as Eduction
When("Actor Add {string} as Eduction", (educationName:string)=>{
    cy.get('button[name="Add"]').click()
    cy.wait(3000)
    cy.get('#79f1ee68-e8d5-48d2-87e1-79e8dc088de8').type(educationName)
    cy.get('#953c459c-d7c4-48f8-98bd-567886f175e3').click()

})
    
    
