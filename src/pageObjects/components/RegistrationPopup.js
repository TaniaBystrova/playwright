//const BaseComponent = require('./BaseComponent')
import BaseComponent from '../BaseComponent'
const { expect } = require('@playwright/test')

export default class Registration extends BaseComponent {
   

    constructor(page) {
        super(page, page.locator('.modal-dialog.modal-dialog-centered'))
        this.registrationPopup = this._page.locator('.modal-dialog.modal-dialog-centered')
        this.registrationTitle = this._container.locator('.modal-title')
        this.nameInput = this._container.locator('#signupName')
        this.lastNameInput = this._container.locator('#signupLastName')
        this.emailInput = this._container.locator('#signupEmail')
        this.passwordInput = this._container.locator('#signupPassword')
        this.repeatPasswordInput = this._container.locator('#signupRepeatPassword')
        this.registerButton = this._container.locator('button', {hasText: 'Register'})
        this.errorMessage = this._container.locator('.invalid-feedback').filter({ state: 'visible' })
    }

    async getRegistrationPopup(){
        await expect(this.registrationPopup).toBeVisible()
    }
    async verifyRegistrationPopupTitle(){
        await expect(this.registrationTitle).toHaveText('Registration')
    }
    async fill(signUpData){
      await this.nameInput.fill(signUpData.name)
      await this.lastNameInput.fill(signUpData.lastName)
      await this.emailInput.fill(signUpData.email)
      await this.passwordInput.fill(signUpData.password)
      await this.repeatPasswordInput.fill(signUpData.rePassword)
    }
    async registerNewUser(signUpData){
        await this.fill(signUpData)
        await this.registerButton.click()
        await expect(this._page).toHaveURL(/panel\/garage/)
    }
    
}
