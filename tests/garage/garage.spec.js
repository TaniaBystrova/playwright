import {test} from '../../src/fixtures/userGaragePage.fixture.js';
import {expect} from "@playwright/test";
import ProfilePage from "../../src/pageObjects/profilePage/ProfilePage.js";
import GaragePage from "../../src/pageObjects/panel/garagePage/GaragePage.js";

test.describe('User signs in', ()=>{
     test('should use storage state', async ({page, userInfo})=>{
        const garagePage = new GaragePage(page)
        const profilePage = new ProfilePage(page)
         await profilePage.navigate()
        await expect(profilePage.userName, "valid user name should be displayed").toHaveText(`${userInfo.name} ${userInfo.lastName}`)
     })
})