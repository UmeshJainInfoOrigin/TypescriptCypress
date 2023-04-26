import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

Given("Actor pass excel file and validate data", (()=>{
    const filePath = Cypress.config("fileServerFolder")+"/cypress/downloads/sample.xlsx"
    cy.task('excelToJsonConverter',filePath).then((result:any)=>
    {
      cy.log(result.data[1].A);
      console.log(result.data[1].B);
      expect('Laptop').to.equal(result.data[1].B);
      
    })
}))
