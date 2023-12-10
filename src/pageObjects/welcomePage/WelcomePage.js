const { expect } = require('@playwright/test')
import BasePage from '../BasePage'
import SignInPopup from './components/signInPopup'

export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('.guest-layout'))
        this.signUpButton = this._page.locator('button', {hasText: 'Sign Up'})
        this.registrationPopup = this._page.locator('.modal-dialog.modal-dialog-centered')
        this.signInButton = this._page.locator('button', {hasText: 'Sign In'})
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
    async openSignInPopup(){
        await this.signInButton.click()
        return new SignInPopup(this._page)
    }

}
