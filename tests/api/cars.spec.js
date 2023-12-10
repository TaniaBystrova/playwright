import {test} from '../../src/fixtures/userGaragePage.fixture.js';
import {expect} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../src/data/dict/brands.js";
import {VALID_BRAND_MODELS} from "../../src/data/dict/models.js";

test.describe("API", ()=>{
   
    test('should create new car', async ({userAPIClient})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[1].id
        const modelId = VALID_BRAND_MODELS[brandId].data[2].id

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 150
        }


        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })
        const body = await response.json()
        await expect(response, "Positive response should be returned").toBeOK()
        expect(response.status(), "Status code should be 200").toEqual(201)
        expect(body.status).toBe("ok")
        expect(body.data, "Car should be created with data from request").toMatchObject(requestBody)
    })

    test('should not create new car with invalid brand ID', async ({ userAPIClient }) => {
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[1].id;
        const invalidModelId = 'invalidModelId'; 
    
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": invalidModelId,
            "mileage": 150
        }

        const response = await userAPIClient.post('/api/cars', {
            data: requestBody
        })
        await expect(response, "Negative response should be returned").not.toBeOK()
        expect(response.status(), "Status code should be 400 or 404").not.toEqual(201)
    })

    test('should not create new car with missing mileage field', async ({ userAPIClient }) => {
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[1].id;
        const modelId = VALID_BRAND_MODELS[brandId].data[2].id;
    
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId
            // Missing "mileage" field in the request body
        }
    
        const response = await userAPIClient.post('/api/cars', {
            data: requestBody
        })
    
        await expect(response, "Negative response should be returned").not.toBeOK()
        expect(response.status(), "Status code should be 400 or 422").not.toEqual(201)
       
    })
    })

