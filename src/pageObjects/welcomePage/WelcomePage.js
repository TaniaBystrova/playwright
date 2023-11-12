const { expect } = require('@playwright/test')
import BasePage from '../BasePage'

export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('.guest-layout'))
        this.signUpButton = this._page.locator('button', {hasText: 'Sign Up'})
        this.registrationPopup = this._page.locator('.modal-dialog.modal-dialog-centered')
    }
    
    
    async getRegistrationPopup(){
        await this.signUpButton.click()
        await expect(this.registrationPopup).toBeVisible()
    }
    
    async loginAsGuest(){
        await this.header.guestLoginButton.click()
        await expect(this._page).toHaveURL('/panel/garage')
        return new GaragePage(this._page)
    }
}
