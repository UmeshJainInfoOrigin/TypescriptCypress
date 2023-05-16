import { defineConfig } from 'cypress';
import sqlServer, { DbConfig } from 'cypress-sql-server';
//import { initPlugin } from 'cypress-plugin-snapshots/plugin';
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import browserify from "@badeball/cypress-cucumber-preprocessor/browserify";
import { initPlugin } from 'cypress-plugin-snapshots/plugin';
import excelToJson = require("convert-excel-to-json");
import fs = require('fs');
//import puppeteer from 'puppeteer'
import {scope} from './cypress/support/scope'

interface DbConfig {
  userName: string;
  password: string;
  server: string;
  options: {
    database: string;
    encrypt: boolean;
    rowCollectionOnRequestCompletion: boolean;
  };
}

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    browserify(config, {
      typescript: require.resolve("typescript"),
    })
  );

  

  initPlugin(on, config);

  const db:DbConfig = {
    userName: 'testdbuser',
    password: 'Scott@123',
    server: 'iotestdb.database.windows.net',
    options: {
      database: 'testdb',
      encrypt: true,
      rowCollectionOnRequestCompletion: true,
    },
  };
  const tasks = sqlServer.loadDBPlugin(db);
  on('task', tasks);

  //This code is for puppeteer 
  
//   const puppeteer = require('puppeteer');
//   scope.driver = puppeteer;
//   let launchProperties: any = {
//     headless: false,
//     // ignoreHTTPSErrors: true,
//     args: ['--no-sandbox',
//         '--allow-running-insecure-content',
//         '--start-maximized',
//         // // debug logging
//         // '--enable-logging', '--v=1'
//     ],
//     // set 'devtools: true' => if you want to be able to launch the dev tools console too
//     //  just need to add 'await scope.page.evaluate(() => {debugger})' to the step 
//     //  you want to stop at
//     devtools: false
// }
    
on ('task', {
  async doLogin() {
    // scope.browser = await scope.driver.launch(launchProperties)
    // scope.page = await scope.browser.newPage()
    // await scope.page.setViewport({ width: 0, height: 0 });

    // // add in accept language header - this is required when running in headless mode
    // await scope.page.setExtraHTTPHeaders({
    //     'Accept-Language': 'en-US,en;q=0.8,zh-TW;q=0.6'
    // })
    // await scope.page.goto('https://info-staffing-app.s3.amazonaws.com/index.html', { waitUntil: 'networkidle0' });
    //   await scope.page.waitForSelector('.login_icon');
    //   const newPagePromise = new Promise(x => scope.browser.once('targetcreated', (target: any) => x(target.page())));
    //   await scope.page.click('.login_icon');
    //   const popup: any = await newPagePromise;
    //   await popup.waitForSelector('input[name="loginfmt"]');
    //   await popup.mainFrame().type('input[name="loginfmt"]', 'test@infoorigin.com');
      // const browser = await puppeteer.launch({headless: false});
      // const page = await browser.newPage();
      // await page.goto('https://info-staffing-app.s3.amazonaws.com/index.html',{ waitUntil: 'networkidle0' });
      // //await browser.close();
      // page.click('i[class="login_icon"]')
      //return this.instance
      return await puppeteer.launch({ headless: false }).then(async (browser:any) => {
        const page = await browser.newPage();
        //await page.setViewport({ width: 0, height: 0 });
        await page.goto('https://info-staffing-app.s3.amazonaws.com/index.html',{ waitUntil: 'networkidle0' });
        await page.waitForSelector('.login_icon');
        await page.click('.login_icon');
      })
  } 
})
//Below is required to use NodeJS instead of brower to read the file
on('task',{

  excelToJsonConverter(filePath)
  {
    const result = excelToJson({
    source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
  });
  return result;
  }
})
  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  
  env: {
    url: "https://rahulshettyacademy.com",
    apiPost: "http://216.10.245.166/Library/Addbook.php",
    apiGet: "http://216.10.245.166/Library/GetBook.php?ID=Umesh14278674",
    
    allStatuscode: {
      statusCodeSuccessA: 200,
    },
    allcode: {
      statusCodeSuccessA: 200,
    },
    "cypress-plugin-snapshots": {
      imageConfig: {
        createDiffImage: true,
        threshold: 0.01,
        thresholdType: "percent"
      }
    }

  },
  
  viewportHeight: 1080,
  viewportWidth: 1920,
  projectId: "ac7j1u",
  chromeWebSecurity: false,
  
  e2e: {
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalStudio: true,
    hideXHR: false,
    specPattern: 'cypress/integration/**/*.feature',
    setupNodeEvents,
    excludeSpecPattern: [
      "**/__snapshots__/*",
      "**/__image_snapshots__/*"
    ],

  },
});
