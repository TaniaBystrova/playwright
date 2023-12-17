import {test} from '../../src/fixtures/userGaragePage.fixture.js';
import {expect} from "@playwright/test";
import axios from 'axios';
import {config} from "../../config/config.js";
import {USERS} from "../../src/data/dict/users.js";


test.describe("API", ()=>{
    let client
    test.beforeAll(async ()=>{
      client = axios.create({
           baseURL: config.apiURL,
       })

    const responseLogin = await client.post('/auth/signin', {
        email: USERS.TANIA_BYSTROVA.email,
        password: USERS.TANIA_BYSTROVA.password,
       // "remember": false
    })

       const cookie = responseLogin.headers["set-cookie"][0].split(';')[0]
       client = axios.create({
           baseURL: config.apiURL,
           headers: {
               cookie
           },
           validateStatus: status => {
               return status < 501
           }
       })
   })
  
    test('should create new car', async ()=>{
       
        const requestBody = {
            "carBrandId": 3,
            "carModelId": 11,
            "mileage": 37
        }
    
        const response = await client.post('/cars', requestBody);
        const responseData = response.data;
      
        expect(response.status, "Status code should be 201").toEqual(201)
        expect(responseData.data.carBrandId).toEqual(requestBody.carBrandId);
        expect(responseData.data.carModelId).toEqual(requestBody.carModelId);
        expect(responseData.data.mileage).toEqual(requestBody.mileage);
        expect(response.data.status).toEqual('ok');
    })
     test('should not create new car with invalid brand ID', async () => {
        const requestBody = {
            "carBrandId": 3,
            "carModelId": 'invalidModelId',
            "mileage": 37
        }
        const response = await client.post('/cars', requestBody);
    
        expect(response.data.status, "Negative response should be returned").not.toEqual('ok');
        expect(response.status, "Status code should be 400 or 404").not.toEqual(201)
    })

    test('should not create new car with missing mileage field', async ({ userAPIClient }) => {
   
         const requestBody = {
            "carBrandId": 3,
            "carModelId": 11
             // Missing "mileage" field in the request body
         }
    
         const response = await client.post('/cars', requestBody);
    
         expect(response.data.status, "Negative response should be returned").not.toEqual('ok');
         expect(response.status, "Status code should be 400 or 404").not.toEqual(201)
       
     })
})




