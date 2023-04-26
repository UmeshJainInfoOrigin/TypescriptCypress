export class SmartTable{
    /**
     * This function return Table Body
     * @author InfoOrigin
     * @param {locator} whichSection 
     * @returns object
     */
    getTableBodyHeader(whichSection:string){
        return cy.get(whichSection)
    }
    getPlusbtn() {
        return this.getTableBodyHeader('thead').find('.nb-plus')
    }
    getHeaderAge() {
        return cy.get('thead [placeholder="Age"]')
    }
    
    
    getTableRowColumn(tableRow:any, tableColumn:any) {
        //below line has (`) Acute not (') Apostrophe or single quote
        return cy.wrap(tableRow).find(`[placeholder="${tableColumn}"]`)
    }

    getTableRowAction(tableRow:any, action:any) {
        return cy.wrap(tableRow).find(action)
 
    }

    getUsingtheGridEmail() {
        return cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')
        
    }

     getTableHeader  (headerFlag:boolean, tableLocator:string)  {
        const tableHeader:string[] = []
        if (headerFlag) {
            cy.get(tableLocator).find('thead').as('headerRow')
        }
        else{
        cy.get(tableLocator).find('tbody').as('headerRow')
        }
    
        cy.get('@headerRow')
        .find('tr')
        .eq(0)
        .find('th').each(($el,index, list) => {
            tableHeader.push($el.text())
          
         }).then( () => {
    console.log(tableHeader)
            return tableHeader
    })
    }

    getTable(){
        return cy.get('#autocomplete')
    }
    
}
export const onSmartTable = new SmartTable()