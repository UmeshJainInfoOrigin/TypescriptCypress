/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

/**
 * @description This function will provide JSONpath like xpath in xml from given key
 * @param key, jsonobject 
 * @date Apr 2023 
 * @author Info Origin
 * @returns complete JSONpath 
 */
const getPath = (key:string, jsonObject:any) : any | "" => {
    if (!jsonObject || typeof jsonObject !== "object") {
      return "";
    }
  
    const keys = Object.keys(jsonObject);
    for(let i = 0; i < keys.length; i++) {
      if (keys[i] === key ) {
        return key;
      }
      
      const path = getPath(key, jsonObject[keys[i]]);
      if (path) {
        return keys[i] + "." + path;
      }
    }
    return "";
  };

  /**
 * @description This function will provide value for key by recurrsively finding the key
 * @param key, jsonobject 
 * @date Apr 2023 
 * @author Info Origin
 * @returns all values of key in JSONobject
 */
  const getValueForKey = (key:string, jsonObject:any):object|undefined => {
    if (!jsonObject || typeof jsonObject !== "object") {
      return undefined;
    }
  
    const keys = Object.keys(jsonObject);
    for(let i = 0; i < keys.length; i++) {
      if (keys[i] === key ) {
        return jsonObject[key];
       //return jsonObject[key as keyof typeof obj]
      }
      
      const value = getValueForKey(key, jsonObject[keys[i]]);
      if (value) {
        return value;
      }
    }
    return undefined;
  }

/**
 * @description This function will login to API using credentials provided
 * @param user credential having userid and pwd
 * @author InfoOrigin
 * @CreatedOn Apr 2023
 * @returns Authorised Token
 */
Cypress.Commands.add("LoginWebToken",(webPortalURL, userCredentials, tokenKeyName)=> {
    cy.request({
        url: webPortalURL,
        headers: { 
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: userCredentials
    }).then( response => {
        expect(response.status).to.eq(200)
        const token = getValueForKey(tokenKeyName, response)
        Cypress.env('token',token);
        cy.wrap(token).as('authToken')
    })

})

/**
 * @description Select item from Static or Dynamic dropdown
 * @param locator of dropdown, opton list and item to be select
 * @author InfoOrigin
 * @returns Assertion on item provided and selected it
 * @CreatedOn Apr 2023
 */
Cypress.Commands.add('selectItemDynamicDropdown', (locatorDropdown, locatorOptionList, itemToSelect)=>{
    //cy.get(locatorDropdown).type(itemToSelect.substring(0,3));
    locatorDropdown.type(itemToSelect.substring(0,3));
    // wait for some time
    cy.wait(3000);
    cy.get(locatorOptionList).each(($e1, index, $list) => {

        if($e1.text()===itemToSelect)
        {
            $e1.click()
        }
        
})
locatorDropdown.should('have.value',itemToSelect)    
})