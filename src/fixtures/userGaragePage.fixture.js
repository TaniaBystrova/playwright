import {test as base} from "@playwright/test"
import ProfilePage from "../pageObjects/profilePage/ProfilePage.js";
//import WelcomePage from "../pageObjects/welcomePage/WelcomePage.js";
import {USERS} from "../data/dict/users.js";
import {STORAGE_STATE_USER_PATH} from "../data/storageState.js";

export const test = base.extend({
    userInfo: USERS.TANIA_BYSTROVA,
    userProfilePage: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const profilePage = new ProfilePage(page)
        await profilePage.navigate()

        // before test

        await use(profilePage)

        //after test
    },
}
)