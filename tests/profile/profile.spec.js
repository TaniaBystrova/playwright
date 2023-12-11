import {test} from '../../src/fixtures/userGaragePage.fixture.js';
import {expect} from "@playwright/test";
import ProfilePage from "../../src/pageObjects/profilePage/ProfilePage.js";
import {CUSTOM_USER_RESPONSE_BODY} from "./fixtures/user.js";

test.describe('Profile page', ()=>{
     test('frontend should send correct request to get logged in user', async ({userProfilePage})=>{
        const { page } = userProfilePage

        await page.route('/api/users/profile', route => route.abort())
    })

    test('frontend should use user full name returned in response', async ({userProfilePage})=>{
       
        const { page } = userProfilePage
        const profilePage = new ProfilePage(page)
        await page.route('/api/users/profile', route => {
            route.fulfill({body: JSON.stringify(CUSTOM_USER_RESPONSE_BODY)})
        
            expect(profilePage.userName).toHaveText('Sam Smith')
      
        })
       
})
})