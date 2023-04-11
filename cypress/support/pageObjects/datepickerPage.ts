
function selectDayFromCurrent(day:number){
    let date = new Date()
    date.setDate(date.getDate() + day)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleString('default', {month: 'short'})
    let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( (dateAttribute)  => {
        if(!dateAttribute?.includes(futureMonth)){
            // if actor select positive number then right arrow should be click else left arrow
            if (day > 0) { 
              cy.get('[data-name="chevron-right"]').click()
            }
            else {
              cy.get('nb-calendar-pageable-navigation [data-name="chevron-left"]').click()
            }
            selectDayFromCurrent(day)
        } else {
            //eq(0) is important as it uses contains which can find multiple option for number like 5,15,25
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).eq(0).click()
        }
    })
    return dateAssert
}

class DatepickerPage{

    selectCommonDatepickerDateFromToday(dayFromToday :number) : void {
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(dayFromToday)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })
    }

    selectDatepickerWithRangeFromToday(firstDay : number, secondDay: number): void {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssertFirst = selectDayFromCurrent(firstDay)
            let dateAssertSecond = selectDayFromCurrent(secondDay)
            const finalDate = dateAssertFirst+' - '+dateAssertSecond 
            //#1
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
            //#2
            cy.wrap(input).should('have.value', finalDate)
        })
    }


}

//export const onDatePickerPage = new DatepickerPage()
export default DatepickerPage
    
