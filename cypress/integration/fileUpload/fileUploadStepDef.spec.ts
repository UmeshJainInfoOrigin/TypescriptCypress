import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import {onFileUpload} from '../../support/pageObjects/fileUpload'
//import neatCSV = require("./neat-csv")
//import neatCSV from 'neat-csv'
import neatCsv from 'neat-csv';

Given("Actor on file upload page",(()=>{
    cy.visit("https://www.webdriveruniversity.com/File-Upload/index.html");
})
)

When("Actor select file and click upload",(()=>{
// multiple files can be uploaded using ['file1.ext', 'files2.ext']
    onFileUpload.getChooseFile().selectFile(['cypress/fixtures/example.json']);
    cy.get("#submit-button").click();
})
)

When("Actor read CSV and compare", (()=>{
    let Order_No = "123"
    //Cypress.config("fileServerFolder") gives Path to folder where application 
    //files will attempt to be served from
    //Cypress.config("downloadsFolder") Path to folder where files downloaded 
    //during a test are saved.
    cy.log(Cypress.config("downloadsFolder"))
    //readFile convert the file into text format which is need for neatCSV
    cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/sample.csv")
.then(async(text)=>
    {
      const csv =  await neatCSV(text)
      console.log('csv', csv)
      const actualOrder_No = csv[0]["Order_No"]
      expect(Order_No).to.equal(actualOrder_No)
    })
})
  
)
