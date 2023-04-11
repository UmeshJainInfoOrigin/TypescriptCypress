import report from 'multiple-cucumber-html-reporter';

report.generate({
	jsonDir: './cypress/CucumberReports',
	reportPath: 'cypress/CucumberReports/cucumber-htmlreport.html',
	metadata:{
        browser: {
            name: 'chrome',
            version: '100'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: '16.04'
        }
    },
    customData: {
        title: 'Info Origin Cypress PoC',
        data: [
            {label: 'Project', value: 'Info Origin'},
            {label: 'Release', value: '1.2.3'},
            {label: 'Cycle', value: 'G1.1'},
            {label: 'Execution Start Time', value: 'Mar 6th 2023, 02:31 PM EST'},
            {label: 'Execution End Time', value: 'Apr 30th 2023, 02:56 PM EST'}
        ]
    }
});