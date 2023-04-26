import DatepickerPage from '../../support/pageObjects/datepickerPage'
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const onDatePickerPage = new DatepickerPage()

Given('Actor on Test App home page', function () {
  console.log('Actor on Test App home page')
  cy.visit('http://localhost:4200/')
})

When('Actor click on Form menu', function () {
  cy.log('Actor click on Form menu')
  cy.contains('Forms').click()
})

When('Actor click on Form Layout Submenu', function () {
  cy.log('Actor click on Form Layout Submenu')
  cy.contains('Form Layouts').click()
})

Then('Actor identify various locators', function () {
  cy.log('Actor identify various locators')
  //by Tag Name
  cy.get('input')

  //by ID
  cy.get('#inputEmail1')

  //by Class name
  cy.get('.input-full-width')

  //by Attribute name
  cy.get('[placeholder]')

  //by Attribute name and value
  cy.get('[placeholder="Email"]')

  //by Class value
  cy.get('[class="input-full-width size-medium shape-rectangle"]')

  //by Tag name and Attribute with value
  cy.get('input[placeholder="Email"]')

  //by two different attributes
  cy.get('[placeholder="Email"][type="email"]')

  //by tag name, Attribute with value, ID and Class name
  cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

  //The most recommended way by Cypress
  cy.get('[data-cy="imputEmail1"]')
})

Then('Actor verify Using the Grid displayed', function () {
  cy.log('Actor verify Using the Grid displayed')

  cy.contains('nb-card', 'Using the Grid').then(function (firstForm) {
    const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
    const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
    const radioLabel = firstForm.find('label[class="col-sm-3 label"]').text()
    const signInButton = firstForm.find('button[type="submit"]').text()
    expect(emailLabelFirst).to.equal('Email')
    expect(passwordLabelFirst).to.equal('Password')
    expect(radioLabel).to.equal('Radios')
    expect(signInButton).to.equal('Sign in')
  })

  //alternative way of checking button
  cy.contains('Sign in').eq(0).should('contain', 'Sign in')

  cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(function (radioButtons) {
    cy.wrap(radioButtons)
      .first() // or .eq(0)
      .check({ force: true })
      .should('be.checked')

    cy.wrap(radioButtons)
      .eq(1)
      .check({ force: true })

    cy.wrap(radioButtons)
      .eq(0)
      .should('not.be.checked')

    cy.wrap(radioButtons)
      .eq(2)
      .should('be.disabled')
  })

})

Then('Actor verify Basic form displayed', function () {
  cy.log('Actor verify Basic form displayed')
  cy.contains('nb-card', 'Basic form').then(function (secondForm) {

    const passwordLabelSecond = secondForm.find(' [for="exampleInputPassword1"]').text()
    const checkboxLabel = secondForm.find('span[class="text"]').text()

    expect(passwordLabelSecond).to.equal('Password')
    //alternatively
    cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

    expect(checkboxLabel).to.equal('Check me out')

    //checkbox is checked and validated
    secondForm.find('[type="checkbox"]').click()
    cy.wrap(secondForm).find('[type="checkbox"]').should('be.checked')

    //0
    const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
    expect(emailLabelSecond).to.equal('Email address')
  })

  //1
  cy.get('[for="exampleInputEmail1"]')
    .should('contain', 'Email address')
    .should('have.class', 'label')
    .and('have.text', 'Email address')

  //2
  cy.get('[for="exampleInputEmail1"]').then(function (label) {
    expect(label.text()).to.equal('Email address')
    expect(label).to.have.class('label')
    expect(label).to.have.text('Email address')
  })

  //3
  cy.get('[for="exampleInputEmail1"]').invoke('text').then(function (text) {
    expect(text).to.equal('Email address')

  })

})

Then('Actor verify Horizontal form displayed', function () {
  cy.log('Actor verify Horizontal form displayed')
  //Being form has two Sign In button, by default it select first open, hence this code will not select right button
  cy.contains('Sign in')

  cy.contains('[status="warning"]', 'Sign in')

  //this will first select the email text box as it has ID
  // then choses its parent form
  // then search button which has label Sign in
  // then choses its parent form
  // then find the check box and 
  cy.get('#inputEmail3')
    .type('email')
    .parents('form')
    .find('button')
    .should('contain', 'Sign in')
    .parents('form')
    .find('#inputPassword3')
    .type('password')
    .parents('form')
    .find('nb-checkbox')
    .click()


  cy.contains('nb-card', 'Horizontal form').find('[type="email"]').type('another email')

})

When('Actor select Dark mode', function () {
  // common function 
  // input- Dropdown locator, option list locator, which item to click
  // action:- item will be selected from the dropdown and assert as well
  // return:- all item of dropdown
  cy.log('Actor select Dark mode')
  cy.get('nav nb-select').click()
  cy.get('.options-list').contains('Dark').click()
  cy.get('nav nb-select').should('contain', 'Dark')


})

Then('Actor verifies Dark mode is implemented', () => {
  cy.log('Actor verifies Dark mode is implemented')
  //#1
  cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
  cy.get('nb-sidebar').should('have.css', 'background-color', 'rgb(34, 43, 69)')
  //go to particular link and check it's background   
  cy.contains('Modal & Overlays').click()
  cy.contains('Tooltip').click()
  cy.get('nb-card').should('have.css', 'background-color', 'rgb(34, 43, 69)')

  //2
  cy.get('nav nb-select').then(function (dropdown) {
    cy.wrap(dropdown).click()

    cy.get('.options-list nb-option').each(function (listItem, index, list) {
      const itemText = listItem.text().trim()

      // const colors: = {
      //   "Light": "rgb(255, 255, 255)",
      //   "Dark": "rgb(34, 43, 69)",
      //   "Cosmic": "rgb(50, 50, 89)",
      //   "Corporate": "rgb(255, 255, 255)"
      // }
      const colors: { [key: string]: string } = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
      };


      cy.wrap(listItem).click()
      cy.wrap(dropdown).should('contain', itemText)
      cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
      cy.get('nb-sidebar').should('have.css', 'background-color', colors[itemText])
      if (index < 3) {
        cy.wrap(dropdown).click()
      }
    })
  })

})

When('Actor click on Table&Data Smart Table', function () {
  cy.contains('Tables & Data').click()
  cy.contains('Smart Table').click()
})

Then('Actor modify Larry age', function () {
  cy.get('tbody').contains('tr', 'Larry').then(function (tableRow) {
    cy.wrap(tableRow).find('.nb-edit').click()
    cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
    cy.wrap(tableRow).find('.nb-checkmark').click()
    //Age column number is 6, count start from 0
    cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
  })

})

When('Actor click default button on colored tooltip', function () {
  cy.contains('Modal & Overlays').click()
  cy.contains('Tooltip').click()
})

Then('Actor verify tooltip text and bgcolor', function () {
  //#1
  cy.contains('nb-card', 'Colored Tooltips')
    .contains('Primary').click()
  cy.get('nb-tooltip')
    .should('contain', 'This is a tooltip')
    .should('have.css', 'background-color', 'rgb(51, 102, 255)')
  //#2
  cy.contains('nb-card', 'Colored Tooltips')
    .contains('Default').click()
  cy.get('nb-tooltip')
    .should('contain', 'This is a tooltip')
    .should('have.css', 'background-color', 'rgb(21, 26, 48)')
  //#3
  cy.contains('nb-card', 'Tooltip Placements')
    .contains('Bottom').click()
  cy.get('nb-tooltip')
    .should('contain', 'This is a tooltip')
    .should('have.css', 'background-color', 'rgb(21, 26, 48)')
    .should('have.class', 'bottom')

  cy.contains('nb-card', 'Tooltip Placements')
    .contains('Top').click()
  cy.get('nb-tooltip')
    .should('contain', 'This is a tooltip')
    .should('have.css', 'background-color', 'rgb(21, 26, 48)')
    .should('have.class', 'top')
})

When('Actor click on Table&Data Tree Grid', function () {
  cy.contains('Tables & Data').click()
  cy.contains('Tree Grid').click()
})

Then('Actor verify details of each tree', function () {
  cy.get('tbody').contains('Projects').click()
  cy.get('tbody tr').each(function (tableRow, index) {
    cy.wrap(tableRow).get('td').not('ngx-fs-icon')

  })

})

When('Actor click on Forms and Date picker', function () {
  cy.log('Actor click on Form menu')
  cy.contains('Forms').click()
  cy.contains('Datepicker').click()
})


When("Actor select {int} days ahead from Common Datepicker", (day: number) => {
  onDatePickerPage.selectCommonDatepickerDateFromToday(day)
  onDatePickerPage.selectCommonDatepickerDateFromToday(day)

})

When("Actor select range from {int} to {int} days from current", (fromDays: number, toDays: number) => {
  //cy.get('input[placeholder="Range Picker"]').click()
  onDatePickerPage.selectDatepickerWithRangeFromToday(fromDays, toDays)
})

Then("Actor capture the baseline image for comparion next time", () => {
  cy.contains('nb-card', 'Using the Grid').then((firstForm) => {
    cy.wrap(firstForm).toMatchImageSnapshot()
    cy.document().toMatchImageSnapshot()
  })
})

  