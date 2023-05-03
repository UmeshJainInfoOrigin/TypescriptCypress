/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
export {}

Given('Login to Zoho',()=>{
// cy.visit('https://api-console.zoho.in/')
 //cy.get('#login_id').type('utjain2000@gmail.com')
// cy.wait(2000)
// cy.get('#nextbtn').click()
// cy.get('#password').type('GondiaRice@441601')
// cy.get('#nextbtn').click()
const clientID = '1000.HAMVVV7TSOWHTAMJY9NCVKJJA30EJM' 
const clientSecret = 'e38e2d10095a4f1d228f7244a39e4584b96523d3a4'
const redirect_uri='https://www.icicibank.com/'
//const url = `https://accounts.zoho.in/oauth/v2/auth?scope=ZOHOPEOPLE.forms.ALL&client_id=${clientID}&response_type=code&access_type=offline&redirect_uri=${redirect_uri}`
const url = 'https://accounts.zoho.in/oauth/v2/auth?scope=ZOHOPEOPLE.forms.ALL&client_id=1000.HAMVVV7TSOWHTAMJY9NCVKJJA30EJM&response_type=code&access_type=offline&redirect_uri=https://www.icicibank.com/'


//console.log('url', url)
//  cy.visit(url)
//  cy.get('#login_id').type('utjain2000@gmail.com')
//  cy.get('#nextbtn').click()
//  cy.get('#password').type('GondiaRice@441601')
//  cy.get('#nextbtn').click()
 interface StringMap { [key: string]: string; }
 const paramObj: StringMap = {};
//  cy.url().then((newURL:string) => {
//     const arr = newURL.split('/?')[1].split('&');
//     arr.forEach(param => {
//         const [ key, value ] = param.split('=');
//         paramObj[key] = value;
//       });

//    })

//const newURL = "https://www.w3schools.com/?code=1000.94ca302e7525d3ff0993716ffe446c0a.ed916aeb6346ee9a62631f718b277b85&location=in&accounts-server=https%3A%2F%2Faccounts.zoho.in&"


let refreshToken:string
paramObj['code']= '1000.dc0d1201cd27f3be5a5cc0e0e8ba3da6.554e538844782943c9e2ceadff1d9df7'

console.log('code', paramObj['code'])
cy.request({
    url: 'https://accounts.zoho.in/oauth/v2/token',
    headers: { 
        'Content-Type': 'application/json'
       
    },
    qs:{
        grant_type : 'authorization_code',
        client_id : clientID,
        client_secret : clientSecret,
        redirect_uri : 'https://www.icicibank.com/',
        code: paramObj['code']

    },
    method: 'POST',
    
}).then( response => {
    //expect(response.status).to.equal(200)
    console.log('Generate Access Token and Refresh Token', response)
    refreshToken = response.refresh_token
        // {
    //     "access_token": "1000.18d18db6ff0a2aac02cfb8295b2e594f.fc61019df3e1e10965c30000c665b18d",
    //     "scope": "ZOHOPEOPLE.forms.ALL",
    //     "api_domain": "https://www.zohoapis.in",
    //     "token_type": "Bearer",
    //     "expires_in": 3600
    // }

})
// from refresh token get new access token
let newAccessToken
cy.request({
    url: 'https://accounts.zoho.in/oauth/v2/token',
    headers: { 
        'Content-Type': 'application/json'
    },
    qs:{
        refresh_token : refreshToken,
        client_id : clientID,
        client_secret : clientSecret,
        grant_type:'refresh_token'

    },
    method: 'POST',
    
}).then( response => {
    //expect(response.status).to.equal(200)
    console.log('from refresh token get new access token',response)
    newAccessToken = response.access_token
})
// fetch users

cy.request({
    url: 'https://https://accounts.zoho.in/crm/v2/users/',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Zoho-oauthtoken ${newAccessToken}`
    },
    method: 'GET',
    
}).then( response => {
    //expect(response.status).to.equal(200)
    console.log('fetch users', response)
})

})

