import { onSmartTable } from '../../support/pageObjects/smartTable';
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Then('Actor modify {string} age', function (rowFirstName:string) {
    onSmartTable.getTableBodyHeader('tbody').contains('tr', rowFirstName).then(function (tableRow) {
        onSmartTable.getTableRowAction(tableRow, '.nb-edit').click()
        onSmartTable.getTableRowColumn(tableRow, 'Age').clear().type('25')
        onSmartTable.getTableRowAction(tableRow, '.nb-checkmark').click()
        //Age column number is 6, count start from 0
        cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
    })

})

Then('Actor add new row and verify it', function (dataTable) {
    //cy.get('thead').find('.nb-plus').click()
    console.log(dataTable)
    onSmartTable.getPlusbtn().click()
    onSmartTable.getTableBodyHeader('thead').find('tr').eq(2).then(function (tableRow) {
        onSmartTable.getTableRowColumn(tableRow, 'First Name').type(dataTable.rawTable[1][0])
        onSmartTable.getTableRowColumn(tableRow, 'Last Name').type(dataTable.rawTable[1][1])
        onSmartTable.getTableRowColumn(tableRow, 'Username').type(dataTable.rawTable[1][2])
        onSmartTable.getTableRowColumn(tableRow, 'E-mail').type(dataTable.rawTable[1][3])
        onSmartTable.getTableRowColumn(tableRow, 'Age').type(dataTable.rawTable[1][4])
        onSmartTable.getTableRowAction(tableRow, '.nb-checkmark').click()
    })
    cy.get('tbody tr').first().find('td').then(function (tableColumns) {
        cy.wrap(tableColumns).eq(2).should('contain', 'Info')
        cy.wrap(tableColumns).eq(3).should('contain', 'Origin')
    })
})

Then('Actor filter using row column and verify', function () {
    const ageList = [20, 30, 40, 200]

    cy.wrap(ageList).each(function (age:number) {
        onSmartTable.getHeaderAge().clear().type(age)
        cy.wait(500)
        cy.get('tbody tr').each(function (tableRow, index) {
            if (age == 200) {
                cy.wrap(tableRow).should('contain', 'No data found')
            } else {
                cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                cy.log('RowId', index)
                //This will click the next page link  
                if (index >= 9) {
                    cy.get('a[class="ng2-smart-page-link page-link page-link-next"]').click()
                }
            }
        })
    })
})

Then('Actor delete the row with confirm click', function () {

    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) => {
        expect(confirm).to.equal('Are you sure you want to delete?')
    })
})

Then('Actor delete the row with cancel click', function () {
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)
})

Then('Actor enter {word} {word} {word} in row', function (firstName:string, lastName:string, userName:string) {
    onSmartTable.getPlusbtn().click()
    onSmartTable.getTableBodyHeader('thead').   find('tr').eq(2).then(function (tableRow) {
        onSmartTable.getTableRowColumn(tableRow, 'First Name').type(firstName)
        onSmartTable.getTableRowColumn(tableRow, 'Last Name').type(lastName)
        onSmartTable.getTableRowColumn(tableRow, 'Username').type(userName)
        onSmartTable.getTableRowColumn(tableRow, 'E-mail').type('@infoOrigin')
        onSmartTable.getTableRowColumn(tableRow, 'Age').type('20')
        onSmartTable.getTableRowAction(tableRow, '.nb-checkmark').click()
    })
})

Then("Actor able to select item from dynamic dropdown", () =>{
    const tableHeader = [];
    let tableLocator
     //cy.visit('http://localhost:4200/pages/tables/smart-table')
    //tableLocator = 'table'

    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    tableLocator = 'table[class="table-display"]'
        // cy.getTableHeader(true, tableLocator).then(output =>{
        //     console.log('headerList', output)
        // })

        //  cy.tableDataIntoJSON(true, tableLocator).then(output =>{
        //      console.log('tableData', output)
        //  })

        //# using custom command for dynamic drop down

        cy.selectItemDynamicDropdown(onSmartTable.getTable(),'li[class="ui-menu-item"]', 'India')
    
    
    

        
})