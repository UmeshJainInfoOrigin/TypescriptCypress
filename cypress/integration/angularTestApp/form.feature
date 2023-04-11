Feature: Verify components at Form Submenu

    C1~S1~A1~F~

Scenario: Click form layout menu and verify 1st grid
Given Actor on Test App home page
When Actor click on Form menu
When Actor click on Form Layout Submenu
Then Actor verify Using the Grid displayed

Scenario: Click form layout menu and verify 2nd grid
Given Actor on Test App home page
When Actor click on Form menu
When Actor click on Form Layout Submenu
Then Actor verify Basic form displayed

Scenario: Click form layout menu and verify 5th grid
Given Actor on Test App home page
When Actor click on Form menu
When Actor click on Form Layout Submenu
Then Actor verify Horizontal form displayed

Scenario: Click form layout menu and various locators
Given Actor on Test App home page
When Actor click on Form menu
When Actor click on Form Layout Submenu   
Then Actor identify various locators

Scenario: Application appearence mode
Given Actor on Test App home page
When Actor select Dark mode
Then Actor verifies Dark mode is implemented

Scenario: WebTable Manipulations
Given Actor on Test App home page
When Actor click on Table&Data Smart Table   
Then Actor modify Larry age
Then Actor add new row and verify it
Then Actor delete the row with confirm click
Then Actor delete the row with cancel click
Then Actor filter using row column and verify


Scenario: Tool tip validation
Given Actor on Test App home page
When Actor click default button on colored tooltip
Then Actor verify tooltip text and bgcolor

Scenario: Tree Grid validation
Given Actor on Test App home page
When Actor click on Table&Data Tree Grid   
Then Actor verify details of each tree

Scenario: Date component
Given Actor on Test App home page
When Actor click on Forms and Date picker
When Actor select 5 days ahead from Common Datepicker
When Actor select -5 days ahead from Common Datepicker
When Actor select range from -5 to 10 days from current
When Actor select range from 105 to 400 days from current

Scenario: Visual Testing
Given Actor on Test App home page
When Actor click on Form menu
When Actor click on Form Layout Submenu
Then Actor capture the baseline image for comparion next time