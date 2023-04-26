import { defineConfig } from 'cypress';
import sqlServer, { DbConfig } from 'cypress-sql-server';
//import { initPlugin } from 'cypress-plugin-snapshots/plugin';
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import browserify from "@badeball/cypress-cucumber-preprocessor/browserify";
import { initPlugin } from 'cypress-plugin-snapshots/plugin';
import excelToJson = require("convert-excel-to-json");
import fs = require('fs');

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
  e2e: {
    hideXHR: true,
    specPattern: 'cypress/integration/**/*.feature',
    setupNodeEvents,
    excludeSpecPattern: [
      "**/__snapshots__/*",
      "**/__image_snapshots__/*"
    ],

  },
});
