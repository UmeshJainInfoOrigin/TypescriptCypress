// cypress/support/index.ts
export { }
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('greeting')
             */
            LoginWebToken(webPortalURL: string,
                userCredentials: JSON,
                tokenKeyName: string): Chainable<JQuery<HTMLElement>>

            selectItemDynamicDropdown(locatorDropdown: any,
                locatorOptionList: string,
                itemToSelect: string): Chainable<JQuery<HTMLElement>>

        }
        interface ResolvedConfigOptions {
            hideXHR?: boolean;
        }

    }
}

