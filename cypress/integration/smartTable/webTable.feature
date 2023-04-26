Feature: Verify Table&Data Smart Table

    C1~S1~A1~F~

Scenario: WebTable Manipulations
Given Actor on Test App home page
When Actor click on Table&Data Smart Table   
Then Actor modify 'Larry' age
Then Actor add new row and verify it
|firstName |last Name |userName |e-Mail        | age   |
|Info         | Origin   |Gondia   |@infoOrigin   |30     |
Then Actor delete the row with confirm click
Then Actor delete the row with cancel click
Then Actor filter using row column and verify

Scenario Outline: Multiple row addition
Given Actor on Test App home page
When Actor click on Table&Data Smart Table   
Then Actor enter <firstName> <lastName> <userName> in row
Examples:
    | firstName | lastName | userName |
    | Keyword  | Mouse | Pune  |
    | Monitor  | Printer | Gondia  |

Scenario: Select item from dynamic dropdown
Then Actor able to select item from dynamic dropdown
