import {test} from '../../src/fixtures/userGaragePage.fixture.js';
import {expect} from "@playwright/test";
import ProfilePage from "../../src/pageObjects/profilePage/ProfilePage.js";
import GaragePage from "../../src/pageObjects/garagePage/GaragePage.js"

test.describe('Garage page', ()=>{
     test('should contain Add Car button', async ({userGaragePage})=>{
        await expect(userGaragePage.addCarButton).toBeVisible()
     })
})